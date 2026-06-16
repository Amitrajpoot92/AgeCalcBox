import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Future Age Calculator – Check Your Age on Any Future Date',
  description: 'Calculate your exact age by date of birth in years, months, and days. Free online age calculator with accurate results and next birthday countdown.',
  alternates: {
    canonical: '/age-calculator',
  },
};

export default function AgeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}