import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Calculator – Calculate Your Exact Age in Years, Months, Days',
  description: 'Calculate your exact age instantly with our free Age Calculator. Get years, months, days, hours, minutes and live seconds with birthday countdown.',
  alternates: {
    canonical: '/age-calculator',
  },
};

export default function AgeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}