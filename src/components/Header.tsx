import Image from "next/image";

const Header = () => {
  return (
    <footer className="w-full flex justify-left p-2 flex-row justify-center items-center text-slate-600  font-bold text-xl">
      <Image src="/logo.png" alt="" width={90} height={90} className="mr-4" />
      Commentez vos meilleures lectures !
    </footer>
  );
};

export default Header;
