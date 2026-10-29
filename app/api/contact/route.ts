import { NextResponse } from 'next/server';
import { submitContactForm } from '@/actions/contact';

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin');
    if (origin && new URL(origin).host !== new URL(req.url).host) return NextResponse.json({success:false,message:'Invalid origin.'},{status:403});
    const body = await req.text();
    if (body.length > 12000) return NextResponse.json({success:false,message:'Message is too long.'},{status:413});
    const data=JSON.parse(body);
    const result=await submitContactForm(data);
    return NextResponse.json(result,{status:result.success?200:400});
  } catch {
    return NextResponse.json({success:false,message:'Please check your message.'},{status:400});
  }
}
