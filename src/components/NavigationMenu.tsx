import Link from "next/link";
import { BookOpen, Pencil, KeyRound } from "lucide-react";

const NavigationMenu = () => {
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
        <Link href="/login" className="flex">
          <KeyRound className="mr-2" /> Se connecter
        </Link>
      </li>
    </menu>
  );
};

export default NavigationMenu;
