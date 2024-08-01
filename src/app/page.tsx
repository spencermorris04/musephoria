// app/page.tsx
import { redirect } from 'next/navigation';
import { getServerAuthSession } from "~/server/auth";
import HomePage from './HomePage';

export default async function RootPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect('/dashboard');
  }

  return <HomePage />;
}