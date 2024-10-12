import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "../Store/Store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginComponent from "./Component/Login.jsx";
import SignupComponent from "./Component/signup.jsx";
import Homecomponent from "./Component/Home.jsx";
import AboutApp from "./Component/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element:<AboutApp/>
      },
      {
        path: "login",
        element: <LoginComponent />,
      },
      {
        path: "signup",
        element: <SignupComponent />,
      },
      {
        path: "/home",
        element: <Homecomponent />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
