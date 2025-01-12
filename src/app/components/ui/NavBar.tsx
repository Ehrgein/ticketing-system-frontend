import React from "react";

function NavBar() {
  return (
    <div className="w-full mx-auto flex justify-center">
      <nav className="flex justify-between text-black w-full bg-[#DFD9D9] rounded-md p-6 px-10">
        <h1 className="font-medium text-black text-xl">Nani Eventos</h1>
        <ul className="flex gap-10 items-center">
          <li>Home</li>
          <li>Eventos</li>
          <li>Contacto</li>
          <li>Mis Tickets</li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
