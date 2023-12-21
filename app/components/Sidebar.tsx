"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  HomeIcon, // Dashboard
  CollectionIcon, // Song Engine
  FolderIcon, // Projects
  ChatAlt2Icon, // Messages
  CogIcon, // Settings
  ChartBarIcon, // League
  AnnotationIcon, // Feedback
} from '@heroicons/react/outline';

const ACTIVE_ROUTE = "flex items-center gap-3 py-2 px-4 text-white bg-gray-700 rounded-md";
const INACTIVE_ROUTE = "flex items-center gap-3 py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-600 rounded-md";

function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="mt-auto w-full bg-slate-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
    >
      Sign Out
    </button>
  ) : (
    <button
      onClick={() => signIn()}
      className="mt-auto w-full bg-slate-600 text-white py-3 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
    >
      Sign In
    </button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-screen bg-gray-800 p-4 text-white">
      <div className="flex flex-col items-center mb-6">
        <Image
          src={session?.user?.image || '/default-profile.jpg'}
          alt={session?.user?.name || 'Profile'}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="mt-4 text-md font-light">{session?.user?.name}</div>
      </div>

      <ul className="flex-grow space-y-2">
        <SidebarLink href="/" Icon={HomeIcon} text="Dashboard" active={pathname === "/Dashboard"} />
        <SidebarLink href="/SongEngine" Icon={CollectionIcon} text="Song Engine" active={pathname === "/SongEngine"} />
        <SidebarLink href="/Projects" Icon={FolderIcon} text="Projects" active={pathname === "/Projects"} />
        <SidebarLink href="/Feedback" Icon={AnnotationIcon} text="Feedback" active={pathname === "/Feedback"} />
        <SidebarLink href="/League" Icon={ChartBarIcon} text="League" active={pathname === "/League"} />
        <SidebarLink href="/Messages" Icon={ChatAlt2Icon} text="Messages" active={pathname === "/Messages"} />
        <SidebarLink href="/Settings" Icon={CogIcon} text="Settings" active={pathname === "/Settings"} />
      </ul>

      <AuthButton />
    </div>
  );
}

function SidebarLink({ href, Icon, text, active }) {
  return (
    <Link href={href}>
      <li className={active ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
        <Icon className="h-6 w-6" />
        {text}
      </li>
    </Link>
  );
}
