import compLogo from "assets/logo.png";

export const Logo = () => {
  return (
    <div className="flex justify-center items-center">
      <img src={compLogo} alt="compLogo" style={{ height: "2.5rem" }} />
      <span className="inline-block text-gray-500 leading-none pl-2">
        IMDB Encylopedia
      </span>
    </div>
  );
};
