import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Header: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  console.log(isAuthenticated);
  return (
    <header className="bg-[#222222] py-[16px] shadow-3xl sticky z-10 top-0 left-0">
      <div className="2xl:container px-[16px] md:px-[40px] 2xl:px-[72px] mx-auto flex justify-between items-center">
        <a href="/dashboard">
          <img src="/images/brand-logo.svg" alt="" />
        </a>
        <div className="relative flex">
          <i className="w-[20px] h-[20px] inline-block md:hidden">
            <img src="/images/icon-menu.svg" alt="" />
          </i>
          <div
            id="mobile-menu"
            className="absolute md:relative right-[0px] z-10 mt-[20px] md:mt-[0px] min-w-200px origin-top-right rounded-md shadow-lg md:shadow-none flex flex-col md:flex-row md:items-center overflow-hidden p-[16px] md:p-[0px] hidden md:flex"
          >
            <div className="absolute top-[0px] left-[0px] w-full h-full bg-white z-0 inline-block md:hidden" />
            <ul className="flex flex-col md:flex-row text-naro-600 md:text-white font-medium z-10 gap-[16px] md:gap-[0px]">
              <li className="mr-4">
                <a href="/dashboard">Account</a>
              </li>
            </ul>
            {isAuthenticated ? (
              <button
                className="bg-orange-600 bg-gradient-to-r from-indigo-500 text-[#222222] py-[12px] px-[24px] font-medium rounded-xl md:rounded shadow-3xl flex items-center mt-[16px] md:mt-[0px] z-10"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            ) : (
              <button
                className="bg-orange-600 bg-gradient-to-r from-indigo-500 text-[#222222] py-[12px] px-[24px] font-medium rounded-xl md:rounded shadow-3xl flex items-center mt-[16px] md:mt-[0px] z-10"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
