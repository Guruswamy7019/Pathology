import { lazy } from "react";

export type ExtraRoute = {
  key: string;
  path: string;
  page: ReturnType<typeof lazy>;
};

export const EXTRA_ROUTES: ExtraRoute[] = [
  {
    key: "orders",
    path: "/pathology/orders",
    page: lazy(() => import("../pages/OrdersPage")),
  },
  {
    key: "shipment",
    path: "/pathology/shipment",
    page: lazy(() => import("../pages/ShipmentPage")),
  },
  {
    key: "receive",
    path: "/pathology/receive",
    page: lazy(() => import("../pages/ReceivePage")),
  },
  {
    key: "result-entry",
    path: "/pathology/result-entry",
    page: lazy(() => import("../pages/ResultEntryPage")),
  },
  {
    key: "authorization",
    path: "/pathology/authorization",
    page: lazy(() => import("../pages/AuthorizationPage")),
  },
  {
    key: "configuration",
    path: "/pathology/configuration",
    page: lazy(() => import("../pages/ConfigurationPage")),
  },
];
