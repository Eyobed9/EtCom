"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // hamburger & close icons
import Cart from "@/public/icons/cart.svg";
import Logo from "@/public/icons/blueCart.png";
import Profile from "@/public/icons/profile.svg";
import Search from "@/public/icons/search.svg";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full px-6">
      <div className="flex items-center justify-around gap-1 lg:px-5 py-4">
        <div className="flex items-center gap-4">
          <button
            className="block lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo */} 
          <Image src={Logo} className="max-sm:hidden" width={45} height={45} alt=""/>
          <div className="text-2xl font-bold text-midnightblue">EtCom</div>         
        </div>

        {/* Desktop Nav (lg and up) */}
        <nav className="hidden lg:flex items-center gap-6 text-base text-midnightblue">
          <div className="cursor-pointer hover:text-blue-500">Featured Products</div>
          <div className="cursor-pointer hover:text-blue-500">Categories</div>
          <div className="cursor-pointer hover:text-blue-500">Sell</div>
          <div className="cursor-pointer hover:text-blue-500">About Us</div>
          <div className="cursor-pointer hover:text-blue-500">Contact Us</div>
        </nav>

        {/* Search Bar (desktop only) */}
        <div className="hidden lg:flex flex-1 items-center gap-3 rounded-full bg-whitesmoke px-4 py-2 text-gray max-w-100">
          <Image src={Search} width={20} height={20} alt="Search" />
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none placeholder-gray-500 mx-0"
          />
        </div>

        {/* Icons + Language */}
        <div className="flex items-center gap-4 font-power-geez-unicode1">
          <Image src={Cart} width={24} height={24} alt="Cart" className="cursor-pointer" />
          <Image src={Profile} width={24} height={24} alt="Profile" className="cursor-pointer" />
          <div className="cursor-pointer hover:text-blue-500">አማርኛ</div>
        </div>
      </div>

      {/* Mobile Nav (Dropdown, visible < lg) */}
      {isOpen && (
        <div className="flex flex-col space-y-4 px-6 pb-4 lg:hidden text-midnightblue">
          <div className="cursor-pointer hover:text-blue-500">Featured Products</div>
          <div className="cursor-pointer hover:text-blue-500">Categories</div>
          <div className="cursor-pointer hover:text-blue-500">Sell</div>
          <div className="cursor-pointer hover:text-blue-500">About Us</div>
          <div className="cursor-pointer hover:text-blue-500">Contact Us</div>

          {/* Mobile Search */}
          <div className="flex items-center gap-3 rounded-full bg-whitesmoke px-4 py-2 text-gray">
            <Image src={Search} width={20} height={20} alt="Search" />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full bg-transparent outline-none placeholder-gray-500"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
