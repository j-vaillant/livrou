import Link from "next/link";

const NavigationMenu = () => {
  return (
    <menu className="p-4 flex bg-slate-600 justify-between">
      <li>
        <Link href="/">Les livres</Link>
      </li>
      <li>
        <Link href="/addReview">Déposer une critique</Link>
      </li>
      <li>
        <Link href="/login">Se connecter</Link>
      </li>
    </menu>
  );
};

export default NavigationMenu;
