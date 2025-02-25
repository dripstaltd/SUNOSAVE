import { Outlet, RouteObject, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header } from "../layout/Header";

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;
const IndexScreen = lazy(() => import("../pages/Index"));
const Page404Screen = lazy(() => import("../pages/404"));
const LyricsScreen = lazy(() => import("../pages/Lyrics"));
const PromptsScreen = lazy(() => import("../pages/Prompts"));
const SongsScreen = lazy(() => import("../pages/Songs"));
const ArtworkScreen = lazy(() => import("../pages/Artwork"));
function Layout() {
  return (
    <div className="flex min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <IndexScreen /> },
        { path: "*", element: <Page404Screen /> },
        { path: "lyrics", element: <LyricsScreen /> },
        { path: "prompts", element: <PromptsScreen /> },
        { path: "songs", element: <SongsScreen /> },
        { path: "artwork", element: <ArtworkScreen /> },
      ],
    },
  ];
  return useRoutes(routes);
};

export const Router = () => {
  return <InnerRouter />;
};
