"use client";
import { NavLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import AuthProviders from "./AuthProviders";
import { RxHamburgerMenu } from "react-icons/rx";
import { useContext, useEffect, useRef, useState } from "react";
import useIsMobileContext from "@/app/context/NavBarContext";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const NavBar = () => {
  const [nabarVisibility, setNabarVisibility] = useState(false);
  const { data: session, status } = useSession();

  const [providers, setProviders] = useState<any>(null);

  const { isMobile, setIsMobile } = useIsMobileContext();
  const [profileView, setProfileView] = useState<boolean>(false);

  const hamburgermenuRef = useRef();

  const handleNavBar = () => {
    setNabarVisibility((prev) => !prev);
    setIsMobile(!isMobile);
  };

  const handleProfile = () => {
    setProfileView((prev: boolean) => !prev);
  };

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <nav className="flex p-5 items-center justify-between relative  z-[21] h-24">
      <div className="flex gap-7 items-center">
        <button
          className="flex-col gap-2 cursor-pointer w-6 h-6 relative justify-between md:hidden flex"
          onClick={handleNavBar}
        >
          <div
            className={`w-8 h-[2px] origin-top-left rounded-md bg-black ${
              isMobile
                ? "rotate-45  transition-all duration-300"
                : "transition-all duration-300"
            }`}
          ></div>
          <div
            className={`h-[2px] bg-black rounded-md ${
              isMobile
                ? "w-0 transition-all duration-50"
                : "w-6 transition-all duration-50"
            } `}
          ></div>
          <div
            className={` h-[2px] origin-bottom-left bg-black rounded-md ${
              isMobile
                ? "w-8 rotate-[-45deg]  transition-all duration-300"
                : "w-5 transition-all duration-300"
            }`}
          ></div>
        </button>
        <Link className="mt-2" href="/">
          <Image src="/logo.svg" width={115} height={43} alt="Designer" />
        </Link>
        <ul
          className={`text-small gap-7 
            ${
              isMobile
                ? "flex transition-all duration-1000 ease-in bg-white absolute w-full left-0 border-t-[1px] flex-col top-full p-7 z-[1111] "
                : "hidden md:flex transition-all duration-1000 ease-out"
            }
        `}
        >
          {NavLinks.map((link) => (
            <Link
              className="hover:text-gray-800"
              href={link.href}
              key={link.key}
            >
              {link.text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex gap-7 items-center">
        {status === "loading" ? (
          <> </>
        ) : session?.user ? (
          <>
            <Link
              className="hidden lg:flex text-white p-3 rounded-lg  bg-black hover:bg-gray-800 z-[1]"
              href="/post/new"
            >
              Share Work
            </Link>
            <div
              className="relative flex items-center "
              onMouseEnter={() => setProfileView(true)}
              onMouseLeave={() => setProfileView(false)}
            >
              <button onClick={handleProfile} className="">
                <img
                  className="object-cover rounded-[50%] w-10 h-10"
                  src={`${session?.user.image}`}
                  width={60}
                  height={60}
                  alt="profile"
                />
              </button>
              {profileView && (
                <div className="max-w-[300px] w-64 md:w-72 p-4 absolute top-full bg-white text-black shadow-slate-950    right-2 justify-center flex flex-col gap-4 rounded-md pt-4  shadow-2xl transition-all duration-500">
                  <div className="flex justify-center w-full">
                    <img
                      className="object-cover rounded-[50%] w-24 h-24"
                      src={`${session?.user.image}`}
                      alt="profile"
                    />
                  </div>
                  <div className="flex flex-col gap-4 border-b-2 pb-4 border-b-zinc-400 ">
                    <a
                      className="cursor-pointer text-black hover:text-[#111111cf]"
                      href="/"
                    >
                      {session?.user.name}
                    </a>
                    <a
                      className="cursor-pointer text-black hover:text-[#111111cf]"
                      href={`/${session.user.name}?user_id=${session.user.email}`}
                    >
                      Profile
                    </a>
                  </div>
                  <div className="div">
                    <button
                      className="hover:text-[#111111cf]"
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="flex text-white p-3 rounded-lg  bg-black hover:bg-gray-800"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
