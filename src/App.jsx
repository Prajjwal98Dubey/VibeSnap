import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader";

const Auth = lazy(() => import("./pages/Auth"));
const AddPost = lazy(() => import("./components/AddPost"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfile = lazy(() => import("./pages/EditProfile"));
const Feeds = lazy(() => import("./pages/Feeds"));
const Error = lazy(() => import("./pages/Error"));

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster />
    </>
  );
}

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Auth />
      </Suspense>
    ),
  },
  {
    path: "/feeds",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Feeds />
      </Suspense>
    ),
  },
  {
    path: "/add",
    element: (
      <Suspense fallback={<PageLoader />}>
        <AddPost />
      </Suspense>
    ),
  },
  {
    path: "/profile",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Profile />,
      </Suspense>
    ),
  },
  {
    path: "/edit-profile",
    element: (
      <Suspense fallback={<PageLoader />}>
        <EditProfile />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Error />
      </Suspense>
    ),
  },
]);
