"use client";

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-white">
          Home
        </Link>
        <Link href="/profile" className="text-white">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
