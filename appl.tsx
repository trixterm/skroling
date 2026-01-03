"use client";

import Calculator from "./calculator";

export default function Appl() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Calculator
        </h1>
        <Calculator />
      </div>
    </div>
  );
}

