import QualityIcon from "../assets/icons/Quality_control.svg";
import Subtract1 from "../assets/icons/Subtract_1.svg";
import {
  LEADS_MENU,
  DOCUMENTS_MENU,
  RISK_MENU,
  COMPLIANCE_MENU,
} from "./sidebar.menu";

export type SidebarTabKey = "leads" | "documents" | "risk" | "compliance";

export type SidebarTabConfig = {
  key: SidebarTabKey;
  label: string;
  bg: string;
  icon: {
    src: string;
    baseScale: number;
  };
  defaultPath: string;
  menu: typeof LEADS_MENU;
};

export const SIDEBAR_TABS: SidebarTabConfig[] = [
  {
    key: "leads",
    label: "Pathology",
    bg: Subtract1,
    icon: { src: QualityIcon, baseScale: 1.2 },
    defaultPath: "/pathology/orders",
    menu: LEADS_MENU,
  },
  {
    key: "documents",
    label: "Documents",
    bg: Subtract1,
    icon: { src: QualityIcon, baseScale: 1 },
    defaultPath: "/pathology/orders",
    menu: DOCUMENTS_MENU,
  },
  {
    key: "risk",
    label: "Risk",
    bg: Subtract1,
    icon: { src: QualityIcon, baseScale: 1 },
    defaultPath: "/pathology/orders",
    menu: RISK_MENU,
  },
  {
    key: "compliance",
    label: "Compliance",
    bg: Subtract1,
    icon: { src: QualityIcon, baseScale: 1 },
    defaultPath: "/pathology/orders",
    menu: COMPLIANCE_MENU,
  },
];

export const SHOW_ICONS = false;
