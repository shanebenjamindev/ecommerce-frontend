import { Route } from "react-router-dom";
import { lazy } from "react";

const routes = [
  {
    path: "",
    element: lazy(() => import("../Templates/Template")),
    nested: [
      {
        path: "/",
        element: lazy(() => import("../pages/Home/Home")),
      },
      {
        path: "/order",
        element: lazy(() => import("../pages/Order/Order")),
      },
      {
        path: "/profile",
        element: lazy(() => import("../pages/Profile/Profile")),
      },
    ],
  },
  {
    path: "/admin",
    element: lazy(() => import("../pages/Admin/Admin")),
    nested: [
      {
        path: "/admin/dashboard",
        element: lazy(() => import("../pages/Admin/Dashboard/Dashboard")),
      },
      {
        path: "/admin/user-manager",
        element: lazy(() =>
          import("../pages/Admin/UserManagement/UserManagement")
        ),
      },
    ],
  },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                element={<item.element />}
              />
            );
          })}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
export default renderRoutes;
