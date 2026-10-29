const ts=require('typescript');
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=ts.transpileModule(fs.readFileSync('actions/contact.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const input={nameSurname:'Studio partner',company:'Design Studio',email:'partner@example.com',projectDetails:'A website development enquiry.',services:['Development']};
async function check(env,response,data=input,throws=false){
 let calls=0; const exp={};
 vm.runInNewContext(source,{exports:exp,process:{env},require:(name)=>{if(name!=='resend')throw Error(name);return {Resend:class{emails={send:async()=>{calls++;if(throws)throw Error('private detail');return response;}}}};}});
 return {result:await exp.submitContactForm(data),calls};
}
(async()=>{
 const env={RESEND_API_KEY:'test-only',EMAIL_FROM:'hello@skroling.dev',EMAIL_TO:'hello@skroling.dev'};
 let x=await check({},{});assert.equal(x.result.success,false);assert.equal(x.calls,0);
 x=await check(env,{}, {...input,email:'bad'});assert.equal(x.result.success,false);assert.equal(x.calls,0);
 x=await check(env,{}, {...input,services:'Development'});assert.equal(x.result.success,false);assert.equal(x.calls,0);
 x=await check(env,{error:{message:'provider failure'},data:null});assert.equal(x.result.success,false);
 x=await check(env,{data:{id:'example-id'},error:null});assert.equal(x.result.success,true);
 x=await check(env,{},input,true);assert.equal(x.result.success,false);assert.ok(!JSON.stringify(x.result).includes('private detail'));
 console.log('PASS: missing configuration, invalid email, malformed payload, provider rejection, success, private error handling.');
})().catch(e=>{console.error(e);process.exitCode=1});
