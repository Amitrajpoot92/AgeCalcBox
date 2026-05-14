import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Difference Calculator – Find Exact Age Gap Between Two People',
  description: 'Use Age Difference Calculator to compare two ages instantly. Find exact age gap in years, months and days and know who is older.',
  alternates: {
    canonical: '/age-difference',
  },
};

export default function AgeDifferenceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}