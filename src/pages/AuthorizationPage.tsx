// import AuthorizationView from "../components/Authorization/AuthorizationView";

import React, { useState } from "react";
import TopSection from "../components/Authorization/TopSection";
import TableSection from "../components/Authorization/TableSection";
import { AuthorizationItem } from "../types/index";
import "../styles/Authorization/AuthorizationPage.css";

/* ✅ ADD DATA HERE */
const mockData: AuthorizationItem[] = [
  {
    id: "1",
    date: "04/02/2024",
    time: "10:30 AM",
    patient: {
      id: "p1",
      name: "Emilia Williamson",
      age: 27,
      gender: "Female",
      code: "PCC-1719",
    },
    patientType: "Walk-In",
    doctorName: "Dr. Emilia Clarke",
    billId: "PCC/25/OP/000134",
    orders: 6,
  },
  {
    id: "2",
    date: "04/02/2024",
    time: "10:30 AM",
    patient: {
      id: "p2",
      name: "Olivia Anderson",
      age: 29,
      gender: "Female",
      code: "PCC-1719",
    },
    patientType: "Registered",
    doctorName: "Dr. Olivia Bennett",
    billId: "PCC/25/OP/000134",
    orders: 6,
  },
];

const AuthorizationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "approved">("pending");
  const [search, setSearch] = useState("");

  const filteredData: AuthorizationItem[] = mockData.filter((item) =>
    item.patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <TopSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        search={search}
        setSearch={setSearch}
      />

      <TableSection data={filteredData} />
    </div>
  );
};

export default AuthorizationPage;