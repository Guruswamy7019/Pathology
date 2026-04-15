import React, { useEffect, useState } from "react";
import "./Agency.css";
import { FiSearch, FiPlus } from "react-icons/fi";
import AddNewAgency from "./Add_agency";
import editicon from "../../../assets/icons/edit.svg";


interface Agency {
  id: number;
  code: string;
  name: string;
  country: string;
  location: string;
  services: number;
  active: boolean;
}

interface Linking {
  id: number;
  clinic: string;
  agencyCount: number;
}

const AgencyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"agency" | "linking">("agency");
  const [page, setPage] = useState<"list" | "add">("list");
  

  const [agencyData, setAgencyData] = useState<Agency[]>([]);
  const [linkingData, setLinkingData] = useState<Linking[]>([]);

  const [agencySearch, setAgencySearch] = useState("");
  const [linkingSearch, setLinkingSearch] = useState("");

  const [agencyPage, setAgencyPage] = useState(1);
  const [linkingPage, setLinkingPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    setAgencyData([
      { id: 1, code: "AG-1001", name: "Acuity Labs", country: "India", location: "Pune", services: 4, active: true },
      { id: 2, code: "AG-1002", name: "Pathway Diagnostics", country: "India", location: "Chennai", services: 3, active: false },
      { id: 3, code: "AG-1003", name: "Prime Labs", country: "India", location: "Delhi", services: 5, active: true },
      { id: 4, code: "AG-1004", name: "Care Labs", country: "India", location: "Hyderabad", services: 2, active: false },
      { id: 5, code: "AG-1005", name: "Wellness Labs", country: "India", location: "Mumbai", services: 6, active: true },
      { id: 6, code: "AG-1006", name: "Health Labs", country: "India", location: "Bangalore", services: 2, active: true },
      { id: 7, code: "AG-1007", name: "Metro Labs", country: "India", location: "Delhi", services: 3, active: false },
      { id: 8, code: "AG-1008", name: "City Labs", country: "India", location: "Pune", services: 4, active: true },
      { id: 9, code: "AG-1009", name: "Nova Labs", country: "India", location: "Chennai", services: 2, active: true },
      { id: 10, code: "AG-1010", name: "Global Labs", country: "India", location: "Hyderabad", services: 1, active: false },
      { id: 11, code: "AG-1011", name: "Elite Labs", country: "India", location: "Mumbai", services: 5, active: true },
    ]);

    setLinkingData([
      { id: 1, clinic: "Apollo Clinic", agencyCount: 4 },
      { id: 2, clinic: "Fortis", agencyCount: 2 },
      { id: 3, clinic: "Manipal Hospital", agencyCount: 5 },
      { id: 4, clinic: "Aster Clinic", agencyCount: 3 },
      { id: 5, clinic: "Narayana Health", agencyCount: 6 },
      { id: 6, clinic: "Cloudnine", agencyCount: 2 },
      { id: 7, clinic: "Columbia Asia", agencyCount: 4 },
      { id: 8, clinic: "Sakra World", agencyCount: 3 },
      { id: 9, clinic: "Rainbow Hospital", agencyCount: 5 },
      { id: 10, clinic: "Motherhood", agencyCount: 2 },
      { id: 11, clinic: "Medanta", agencyCount: 6 },
    ]);
  }, []);

  const filteredAgency = agencyData.filter((a) => {
  const search = agencySearch.toLowerCase();

  return (
    a.name.toLowerCase().includes(search) ||
    a.code.toLowerCase().includes(search) ||
    a.country.toLowerCase().includes(search) ||
    a.location.toLowerCase().includes(search)
  );
});

  const filteredLinking = linkingData.filter((l) =>
    l.clinic.toLowerCase().includes(linkingSearch.toLowerCase())
  );

  const agencyTotalPages = Math.max(1, Math.ceil(filteredAgency.length / itemsPerPage));
  const linkingTotalPages = Math.max(1, Math.ceil(filteredLinking.length / itemsPerPage));

  const agencyDataPaginated = filteredAgency.slice(
    (agencyPage - 1) * itemsPerPage,
    agencyPage * itemsPerPage
  );

  const linkingDataPaginated = filteredLinking.slice(
    (linkingPage - 1) * itemsPerPage,
    linkingPage * itemsPerPage
  );

  useEffect(() => setAgencyPage(1), [agencySearch]);
  useEffect(() => setLinkingPage(1), [linkingSearch]);

  const toggleStatus = (id: number) => {
    setAgencyData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <div className="agency-container">
      {page === "list" ? (
        <>
          
          <div className="tabs">
            <div className={`tab ${activeTab === "agency" ? "active" : ""}`} onClick={() => setActiveTab("agency")}>
              Agency
            </div>
            <div className={`tab ${activeTab === "linking" ? "active" : ""}`} onClick={() => setActiveTab("linking")}>
              Agency-Clinic Linking
            </div>
          </div>

          
          <div className="header-row">
            <h3>
              {activeTab === "agency"
                ? `List of Agency (${filteredAgency.length})`
                : `Agency-Clinic Linking (${filteredLinking.length})`}
            </h3>

            <div className="actions">
              <div className="search-box">
                <FiSearch />
                <input
                  placeholder={
  activeTab === "agency"
    ? "Search by Code, Name, Country, City"
    : "Search by Clinic"
}
                  value={activeTab === "agency" ? agencySearch : linkingSearch}
                  onChange={(e) =>
                    activeTab === "agency"
                      ? setAgencySearch(e.target.value)
                      : setLinkingSearch(e.target.value)
                  }
                />
              </div>

              {activeTab === "agency" && (
                <button className="add-btn" onClick={() => setPage("add")}>
                  <FiPlus /> Add New Agency
                </button>
              )}
            </div>
          </div>

          
          
          <div className="table">
            <div className="table-head">
              {activeTab === "agency" ? (
                <>
                  <span>Code</span>
                  <span>Name</span>
                  <span>Country</span>
                  <span>City</span>
                  <span>Services</span>
                  <span>Status</span>
                </>
              ) : (
                <>
                  <span>Clinic Name</span>
                  <span>No. of Agencies Linked</span>
                  <span>Action</span>
                </>
              )}
            </div>

            {(activeTab === "agency" ? agencyDataPaginated : linkingDataPaginated).map((item: any) => (
              <div className="table-row" key={item.id}>
                {activeTab === "agency" ? (
                  <>
                    <span>{item.code}</span>
                    <span>{item.name}</span>
                    <span>{item.country}</span>
                    <span>{item.location}</span>
                    <span>{item.services}</span>

                    <div className="status-cell">
                      
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={item.active}
                          onChange={() => toggleStatus(item.id)}
                        />
                        <span className="slider"></span>
                      </label>

                      <button
                     className="edit-btn"
                    onClick={() => setPage("add")}
>
                    <img src={editicon} alt="edit" />
                    </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span>{item.clinic}</span>
                    <span>{item.agencyCount}</span>

                    <div className="status-cell">
                     <button className="edit-btn">
  <img src={editicon} alt="edit" />
</button>

                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

         <div className="footer">
  
  <div className="page-info">
    {(() => {
      const currentPage =
        activeTab === "agency" ? agencyPage : linkingPage;

      const totalItems =
        activeTab === "agency"
          ? agencyData.length
          : linkingData.length;

      const itemsPerPage = 10;

      const start = (currentPage - 1) * itemsPerPage + 1;
      const end = Math.min(currentPage * itemsPerPage, totalItems);

      return `Showing ${start} to ${end} of ${totalItems} entries`;
    })()}
  </div>

  
  <div className="pagination">
    
    <button
      className="nav-btn"
      disabled={
        activeTab === "agency"
          ? agencyPage === 1
          : linkingPage === 1
      }
      onClick={() =>
        activeTab === "agency"
          ? setAgencyPage(agencyPage - 1)
          : setLinkingPage(linkingPage - 1)
      }
    >
      ‹
    </button>

   
    {Array.from({
      length:
        activeTab === "agency"
          ? agencyTotalPages
          : linkingTotalPages,
    }).map((_, index) => {
      const pageNumber = index + 1;
      const currentPage =
        activeTab === "agency" ? agencyPage : linkingPage;

      return (
        <button
          key={pageNumber}
          className={`page-btn ${
            currentPage === pageNumber ? "active" : ""
          }`}
          onClick={() =>
            activeTab === "agency"
              ? setAgencyPage(pageNumber)
              : setLinkingPage(pageNumber)
          }
        >
          {pageNumber}
        </button>
      );
    })}

    
    <button
      className="nav-btn"
      disabled={
        activeTab === "agency"
          ? agencyPage === agencyTotalPages
          : linkingPage === linkingTotalPages
      }
      onClick={() =>
        activeTab === "agency"
          ? setAgencyPage(agencyPage + 1)
          : setLinkingPage(linkingPage + 1)
      }
    >
      ›
    </button>
  </div>
</div>
        </>
      ) : (
        <AddNewAgency onBack={() => setPage("list")} />
      )}
    </div>
  );
};

export default AgencyPage;
