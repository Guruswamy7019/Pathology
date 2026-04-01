import { Fragment, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./src/components/Layout/MainLayout";
import { PATHOLOGY_MENU } from "./src/config/sidebar.menu";
import { EXTRA_ROUTES } from "./src/config/extra.routes"; // adjust path if needed

const pageFallback = (
  <div style={{ padding: "24px", color: "#666" }}>Loading...</div>
);

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pathology/orders" replace />} />
      <Route element={<MainLayout />}>
        {PATHOLOGY_MENU.map((item) => (
          <Fragment key={item.key}>
            <Route
              path={item.path}
              element={
                item.subMenu && item.subMenu.length > 0 ? (
                  <Navigate to={item.subMenu[0].path} replace />
                ) : (
                  <Suspense fallback={pageFallback}>
                    <item.page />
                  </Suspense>
                )
              }
            />
            {item.subMenu?.map((subItem) => (
              <Route
                key={subItem.key}
                path={subItem.path}
                element={
                  <Suspense fallback={pageFallback}>
                    <subItem.page />
                  </Suspense>
                }
              />
            ))}
          </Fragment>
        ))}

        {EXTRA_ROUTES.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={
              <Suspense fallback={pageFallback}>
                <route.page />
              </Suspense>
            }
          />
        ))}

        <Route path="*" element={<Navigate to="/pathology/orders" replace />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
