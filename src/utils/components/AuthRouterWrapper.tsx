import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../apis/firebase";

interface AuthRouterWrapperProps {
  children: ReactNode;
}

export const AuthRoute = ({ children }: AuthRouterWrapperProps) => {
  if (!auth.currentUser) {
    return <Navigate to="/" />;
  } else {
    return <>{children}</>;
  }
};
