import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Topbar from "./components/topbar.tsx";
import { Toaster } from "react-hot-toast";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      {/* Added store provider in react redux  */}
      <Provider store={store}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Topbar />
        <RouterProvider router={router} />
      </Provider>
    </>
  </StrictMode>
);
