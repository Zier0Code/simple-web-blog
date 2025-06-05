import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <h2 className="font-bold p-4 text-center">
        Welcome to Web Blog - ReactJS, TailwindCSS, Supabase +{" "}
      </h2>
      <RouterProvider router={router} />
    </>
  </StrictMode>
);
