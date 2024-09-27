"use client";

import Link from "next/link";
import { BookOpen, Pencil, KeyRound } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const NavigationMenu = () => {
  const { data: session, status } = useSession();

  return (
    <menu className="p-4 flex bg-slate-600 text-slate-300 justify-between">
      <li>
        <Link href="/" className="flex">
          <BookOpen className="mr-2" /> Les livres
        </Link>
      </li>
      <li>
        <Link href="/addBook" className="flex">
          Déposer un livre
        </Link>
      </li>
      <li>
        {status === "unauthenticated" && (
          <Link href="/login" className="flex">
            <KeyRound className="mr-2" />
            Se connecter
          </Link>
        )}
        {status === "authenticated" && (
          <div className="flex">
            <div className="font-bold mr-2">{session.user?.name}</div>
            <button
              onClick={async () => {
                await signOut();
              }}
            >
              Se déconnecter
            </button>
          </div>
        )}
      </li>
    </menu>
  );
};

export default NavigationMenu;
