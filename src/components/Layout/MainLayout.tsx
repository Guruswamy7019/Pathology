import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { lazy, Suspense } from "react";
import ClinicLogoLMS from "../../assets/icons/Clinic-Logo-LMS.svg";

import styles from "../../styles/sidebar.module.css";

const Header = lazy(() => import("./Header"));
const Sidebar = lazy(() => import("./Sidebar"));
const TOP_ROW_HEIGHT = 88;
const SIDEBAR_WIDTH = 300;

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#f3f3f3",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: `${TOP_ROW_HEIGHT}px`,
          bgcolor: "#f3f3f3",
        }}
      >
        <Box sx={{ width: SIDEBAR_WIDTH, pl: "24px", py: "14px" }}>
          <img
            src={ClinicLogoLMS}
            width={134}
            height={40}
            alt="Clinic Logo LMS"
          />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Suspense fallback={<Box sx={{ height: 88, bgcolor: "#f3f3f3" }} />}>
            <Header />
          </Suspense>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          minHeight: 0,
          bgcolor: "#f3f3f3",
        }}
      >
        <Suspense
          fallback={<Box sx={{ width: SIDEBAR_WIDTH, bgcolor: "#f3f3f3" }} />}
        >
          <Sidebar topOffset={TOP_ROW_HEIGHT} sidebarWidth={SIDEBAR_WIDTH} />
        </Suspense>
        <Box
          sx={{
            flexGrow: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box className={styles.cardWrapper} sx={{ m: 0, pb: 2 }}>
            <Box
              className={styles.card}
              sx={{
                flexGrow: 1,
                overflowY: "auto",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
