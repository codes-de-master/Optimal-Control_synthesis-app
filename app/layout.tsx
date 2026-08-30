import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Optimal Control — Synthesis',
  description: 'Interactive synthesis for the Optimal Control course',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
