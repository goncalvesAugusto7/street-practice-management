import { useState } from "react";

export default function Header({
  title,
  menuItems = [],
  onMenuItemClick,
  isMenuOpen,
  toggleMenu,
}) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* barra superior */}
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold text-gray-800 ">{title}</div>

          {/* botao hamburger (mobile) */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                xmlns="https://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="https://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* menu desktop (escondido no mobile) */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => {
              <button
                key={item.key || item.label}
                onClick={() => onMenuItemClick(item)}
                clasName="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition"
              >
                {item.label}
              </button>;
            })}
          </nav>
        </div>

        {/* menu mobile */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 flex flex-col">
            <div className="md:hidden py-4 border-t border-gray-200">
              {menuItems.map((item) => {
                <button
                  key={item.key || item.label}
                  onClick={() => onMenuItemClick(item)}
                  className="text-left text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-100 w-full"
                >
                  {item.label}
                </button>;
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
