import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./src/components/Layout/MainLayout";
import { PATHOLOGY_MENU } from "./src/config/sidebar.menu";

const pageFallback = (
  <div style={{ padding: "24px", color: "#666" }}>Loading...</div>
);

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pathology/orders" replace />} />
      <Route element={<MainLayout />}>
        {PATHOLOGY_MENU.map((item) => (
          <Route
            key={item.key}
            path={item.path}
            element={
              <Suspense fallback={pageFallback}>
                <item.page />
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
