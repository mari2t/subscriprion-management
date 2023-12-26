import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <header className=" flex items-center  justify-center bg-indigo-900 p-4">
      <Link href="/">
        <div className="flex items-center">
          <h1 className="ml-2 text-6xl font-extrabold text-gray-100">
            Subscription Management App
          </h1>
        </div>
      </Link>
    </header>
  );
};

export default Header;
