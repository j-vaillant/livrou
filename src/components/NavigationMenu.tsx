"use client";

import Link from "next/link";
import { BookOpen, Pencil, KeyRound } from "lucide-react";
import { useSession } from "next-auth/react";
import { signOutUser } from "../actions/signOutUser";

const NavigationMenu = () => {
  const session = useSession();

  return (
    <menu className="p-4 flex bg-slate-600 text-slate-300 justify-between">
      <li>
        <Link href="/" className="flex">
          <BookOpen className="mr-2" /> Les livres
        </Link>
      </li>
      <li>
        <Link href="/addReview" className="flex">
          <Pencil className="mr-2" /> Déposer une critique
        </Link>
      </li>
      <li>
        <Link href="/addBook" className="flex">
          Déposer un livre
        </Link>
      </li>
      <li>
        {session.status === "unauthenticated" && (
          <Link href="/login" className="flex">
            <KeyRound className="mr-2" />
            Se connecter
          </Link>
        )}
        {session.status === "authenticated" && (
          <div className="flex">
            <div className="font-bold mr-2">{session.data.user?.name}</div>
            <button
              onClick={async () => {
                await signOutUser();
                window.location.href = "/";
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
