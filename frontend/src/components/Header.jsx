import { useState } from "react";

export default function Header({
  title,
  menuItems = [],
  onMenuItemClick,
  isMenuOpen,
  toggleMenu,
}) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
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
                  xmlns="http://www.w3.org/2000/svg"
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
                  xmlns="http://www.w3.org/2000/svg"
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
                return (
                  <button
                    key={item.key || item.label}
                    onClick={() => onMenuItemClick(item)}
                    className="text-gray-700 text-xs hover:text-blue-600 font-medium px-1 py-2 rounded-md hover:bg-blue-50 transition"
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* menu mobile sobreposto */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* menu deslizante por cima */}
      <nav
        className={`fixed top-16 left-0 right-0 bg-white shadow-lg z-50
          transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "opacity-100 visible translate-y-0 pointer-events-auto"
              : "opacity-0 invisible -translate-y-full pointer-events-none"
          }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key || item.label}
              onClick={() => {
                onMenuItemClick(item);
                toggleMenu();
              }}
              className="text-left text-gray-800 hover:text-blue-600 font-medium py-3 px-2 rounded-md hover:bg-gray-100 w-full"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
