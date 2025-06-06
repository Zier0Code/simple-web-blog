import React, { useEffect, useState } from "react";
import { supabase } from "../database/supabase"; // path to your Supabase client
import { useNavigate } from "react-router-dom"; // or useNextRouter if using Next.js
import { login } from "../redux/authSlice";
import { useDispatch } from "react-redux";

export function WithAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthComponent(props: P) {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      const checkSession = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          setIsAuthenticated(true);
          dispatch(login(session)); // Dispatch login action with user data
        } else {
          navigate("/login"); // or redirect for your framework
        }

        setLoading(false);
      };

      checkSession();
    }, []);

    if (!isAuthenticated) return null; // or fallback UI

    return <WrappedComponent {...props} />;
  };
}
