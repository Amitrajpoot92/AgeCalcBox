import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Future Age Calculator – Check Your Age on Any Future Date',
  description: 'Calculate your exact future age in years, months, and days. Instantly find how old you'll be on any future date with our free future age calculator..',
  alternates: {
    canonical: '/age-calculator',
  },
};

export default function AgeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}