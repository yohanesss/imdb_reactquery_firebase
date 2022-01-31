import React, { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const params = { q: "" };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    params.q = input;

    navigate({
      pathname: "/search",
      search: `?${createSearchParams(params)}`,
    });
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
