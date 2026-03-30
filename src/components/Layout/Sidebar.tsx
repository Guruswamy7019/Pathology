import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { SIDEBAR_TABS } from "../../config/sidebar.tabs";
import styles from "../../styles/sidebar.module.css";
import dashboardCardBg from "../../assets/icons/dashboard_card_bg.svg";
import vidaiLogo from "../../assets/icons/Vidai-logo.svg";

type SidebarProps = {
  topOffset?: number;
  sidebarWidth?: number | Record<string, number>;
};

export default function Sidebar({
  topOffset = 88,
  sidebarWidth = 250,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        fontFamily: "Montserrat, sans-serif",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarWidth,
          boxSizing: "border-box",
          top: topOffset,
          height: `calc(100% - ${topOffset}px)`,
          border: "none",
          bgcolor: "transparent",
          overflow: "hidden",
        },
      }}
    >
      <Box
        className={`${styles.cardWrapper} ${styles.sidebarCardWrapper}`}
        sx={{ height: "100%" }}
      >
        <Box className={styles.card} sx={{ height: "100%", p: 0 }}>
          <img
            src={dashboardCardBg}
            alt=""
            className={styles.cardBg}
            aria-hidden="true"
          />

          <Box className={styles.menuSection}>
            {SIDEBAR_TABS.filter((tab) => tab.menu.length > 0).map((tab) => (
              <Box key={tab.key}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#E17E61",
                    fontWeight: 700,
                    px: 2,
                    pt: 2,
                    pb: 0.5,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tab.label}
                </Typography>

                <List sx={{ mt: 0.75, pl: 0.75 }}>
                  {tab.menu.map((item) => {
                    const isActive =
                      location.pathname === item.path ||
                      location.pathname.startsWith(`${item.path}/`);
                    return (
                      <Box key={item.key}>
                        <ListItemButton
                          onClick={() => navigate(item.path)}
                          sx={{
                            pl: 2.5,
                            pr: 1,
                            py: 0.75,
                            borderRadius: "8px",
                            mb: 0.25,
                            bgcolor: "transparent",
                            "&:hover": {
                              bgcolor: isActive
                                ? "transparent"
                                : "rgba(0,0,0,0.04)",
                            },
                          }}
                        >
                          <ListItemText
                            primary={item.label}
                            primaryTypographyProps={{
                              fontSize: "0.875rem",
                              fontWeight: isActive ? 600 : 400,
                              color: isActive ? "#232323" : "#9e9e9e",
                            }}
                          />
                        </ListItemButton>

                        {isActive &&
                          item.subMenu &&
                          item.subMenu.length > 0 && (
                            <List className={styles.configSubmenuList}>
                              {item.subMenu.map((subItem) => {
                                const isSubActive =
                                  location.pathname === subItem.path;
                                return (
                                  <ListItemButton
                                    key={subItem.key}
                                    onClick={() => navigate(subItem.path)}
                                    className={styles.configSubmenuItem}
                                  >
                                    <Box
                                      className={`${styles.radioDot} ${
                                        isSubActive ? styles.radioDotActive : ""
                                      }`}
                                    />
                                    <ListItemText
                                      primary={subItem.label}
                                      primaryTypographyProps={{
                                        fontSize: "0.9rem",
                                        fontWeight: isSubActive ? 500 : 400,
                                        color: isSubActive
                                          ? "#E17E61"
                                          : "#232323",
                                      }}
                                    />
                                  </ListItemButton>
                                );
                              })}
                            </List>
                          )}
                      </Box>
                    );
                  })}
                </List>
              </Box>
            ))}
          </Box>

          <Box className={styles.footer}>
            <img
              src={vidaiLogo}
              alt="Vidai logo"
              className={styles.footerLogo}
            />
            <Typography
              variant="caption"
              sx={{ mt: -1, mb: 2, color: "#9e9e9e" }}
            >
              Updated Version 2.0
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
