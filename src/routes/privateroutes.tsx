import React from "react";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface PrivateRoutesProps {
  children: ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const user = useSelector((state: any) => state.auth.user);

  if (!user) {
    document.title = "Access Denied - Web Blog";
  }
  return (
    <>
      {user ? (
        children
      ) : (
        <div>
          <p>You must be logged in to view this page.</p>
          <Link className="text-blue-700 hover:underline" to="/login">
            Login Here.
          </Link>
        </div>
      )}
    </>
  );
};

export default PrivateRoutes;
