import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UserDetailsContextProvider from "./contexts/UserDetailsContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <UserDetailsContextProvider>
    <App />
  </UserDetailsContextProvider>
);
