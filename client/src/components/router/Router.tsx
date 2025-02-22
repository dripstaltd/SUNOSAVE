import { Outlet, RouteObject, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Header } from "../layout/Header";

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;
const IndexScreen = lazy(() => import("../pages/Index"));
const Page404Screen = lazy(() => import("../pages/404"));

function Layout() {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
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
      ],
    },
  ];
  return useRoutes(routes);
};

export const Router = () => {
  return <InnerRouter />;
};
