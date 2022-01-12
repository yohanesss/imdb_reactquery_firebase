import React from "react";

type MovieListDetailProps = {
  label: string;
  value: string | number;
};

export const MovieListDetail = ({ label, value }: MovieListDetailProps) => {
  return (
    <li className="flex">
      <span className="text-red-500 font-bold" style={{ minWidth: "100px" }}>
        {label}
      </span>
      <span className="before:content-[':'] before:px-2">{value}</span>
    </li>
  );
};
