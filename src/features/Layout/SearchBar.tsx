import React, { useState } from "react";

export const SearchBar = () => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    console.log(input);
  };

  return (
    <form className="w-10/12 relative" onSubmit={handleSubmit}>
      <input
        className="w-full leading-5 p-2 rounded-md border border-slate-200 outline-none focus:bg-neutral-100"
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="absolute z-10 top-2 right-3">🔎</button>
    </form>
  );
};
