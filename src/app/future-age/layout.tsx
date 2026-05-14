import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Future Age Calculator – Check Your Age on Any Future Date',
  description: 'Find out your age on any future date with our Future Age Calculator. Plan milestones and know exactly how old you will be.',
  alternates: {
    canonical: '/future-age',
  },
};

export default function FutureAgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}