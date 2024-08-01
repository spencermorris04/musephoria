// app/screenplay/ClientWrapper.tsx
'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from 'react';
import { Session } from "next-auth";

interface ClientWrapperProps {
  children: ReactNode;
  session: Session | null;
}

export default function ClientWrapper({ children, session }: ClientWrapperProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}