import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import Feeds from "./pages/Feeds";
import AddPost from "./components/AddPost";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/feeds",
    element: <Feeds />,
  },
  {
    path: "/add",
    element: <AddPost />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/edit-profile",
    element: <EditProfile />,
  },
]);
