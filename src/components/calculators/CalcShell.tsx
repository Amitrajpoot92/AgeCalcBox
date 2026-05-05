import React from 'react';

interface CalcShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const CalcShell = ({ title, description, children }: CalcShellProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[2rem] shadow-xl shadow-green-900/5 p-8 md:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{title}</h1>
            <p className="text-gray-500 max-w-md mx-auto">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CalcShell;