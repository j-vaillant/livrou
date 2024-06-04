import Image from "next/image";

const Header = () => {
  return (
    <footer className="w-full flex justify-left p-2 flex-row justify-center items-center text-slate-600  font-bold text-xl">
      <Image src="/logo.png" alt="" width={130} height={100} />
      Commentez vos meilleures lectures !
    </footer>
  );
};

export default Header;
