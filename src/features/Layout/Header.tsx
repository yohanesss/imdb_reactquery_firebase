import { Link } from "react-router-dom";
import { AuthProvider } from "firebase/auth";
import { Logo } from "features/Layout";
import { SearchBar } from "./SearchBar";
import { FirebaseError } from "@firebase/util";
import {
  auth,
  Providers,
  SignInWithSocialMedia,
  logOut,
} from "../../apis/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";

export const Header = () => {
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, favorite } = useAuth();

  const signInWithSocialMedia = async (provider: AuthProvider) => {
    try {
      const signIn = await SignInWithSocialMedia(provider);
      if (signIn) navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setError(error.message);
        console.error(error.message);
      }
    }
  };

  return (
    <header className="h-16 w-full bg-white sticky top-0 border-b border-gray-100 shadow-md z-10">
      <nav className="w-full md:w-11/12 m-auto h-full p-5 flex items-center">
        <div className="w-3/12 py-4 pl-0 pr-8">
          <Link to="/" className="inline-block">
            <Logo />
          </Link>
        </div>
        <div className="w-6/12 flex justify-center items-center">
          <div
            className="flex justify-between items-center"
            style={{ width: "100%" }}
          >
            <div className="w-2/12 flex justify-center items-center">
              <Link to="/all-shows">
                <button className="p-2 bg-gray-800 text-white rounded-md">
                  View All
                </button>
              </Link>
            </div>
            <SearchBar />
          </div>
        </div>
        <div className="w-3/12 flex justify-end items-center">
          <Link to="/wishlist">
            <button className="hover:underline relative mr-4">
              <div>❤️ Favorite</div>
              {favorite && favorite?.data && (
                <span
                  className="absolute top-0 right-0 bg-red-700 text-white px-1 rounded-full text-sm -mr-2"
                  style={{
                    right: -6,
                    top: -5,
                    fontSize: "10px",
                    padding: "0px 8px",
                    /* display: block; */
                  }}
                >
                  {favorite?.data?.movies.length}
                </span>
              )}
            </button>
          </Link>
          {user ? (
            <button
              className="hover:underline"
              onClick={() => {
                logOut();
                navigate("/");
              }}
            >
              Logout
            </button>
          ) : (
            <button
              disabled={authenticating}
              onClick={() => signInWithSocialMedia(Providers.google)}
              className="hover:underline"
            >
              Login With Google
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
