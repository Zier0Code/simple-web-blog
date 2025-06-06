import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      {/* Added store provider in react redux  */}
      <Provider store={store}>
        <h2 className="font-bold p-4 text-center">
          Welcome to Web Blog - ReactJS, TailwindCSS, Supabase, and Redux
          Toolkit
        </h2>
        <RouterProvider router={router} />
      </Provider>
    </>
  </StrictMode>
);
