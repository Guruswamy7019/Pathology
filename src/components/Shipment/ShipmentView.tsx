import React, { useState, useMemo } from "react";
import "./Shipment.css";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Modular Tab Components
import PendingTab from "./PendingTab";
import ShippedTab from "./ShippedTab";
import ReceivedTab from "./ReceivedTab";
import ActivityLogsTab from "./ActivityLogsTab";

const ShipmentView: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState("");

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    shipTo: "",
    specimenType: "",
    testName: "",
    service: "",
    shipFrom: "",
    shipBy: "",
    shipmentNo: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  const pendingDataOriginal = [
    { id: 1, date: "04/02/2024", time: "10:30 AM", sampleNo: "2786/B34", type: "Urine", testCode: "2786/B34", testName: "Urine Culture", serviceName: "Women Pathology 2026", patientName: "Cameron Williamson", age: 30, patientCode: "PCC-1719", gender: "Female" },
    { id: 2, date: "04/02/2024", time: "10:30 AM", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Biopsy", serviceName: "Women Pathology 2026", patientName: "Olivia Anderson", age: 29, patientCode: "PCC-1719", gender: "Female" },
    { id: 3, date: "04/02/2024", time: "10:30 AM", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Drug Testing", serviceName: "Women Pathology 2026", patientName: "Mia Thompson", age: 32, patientCode: "PCC-1719", gender: "Female" },
    { id: 4, date: "04/02/2024", time: "10:30 AM", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Dipstick Test", serviceName: "Women Pathology 2026", patientName: "Isabella Martinez", age: 33, patientCode: "PCC-1719", gender: "Female" },
    { id: 5, date: "04/02/2024", time: "10:30 AM", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Genetic Testing", serviceName: "Women Pathology 2026", patientName: "Sophia Wilson", age: 34, patientCode: "PCC-1719", gender: "Female" },
    { id: 6, date: "04/02/2024", time: "10:30 AM", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "CBC", serviceName: "Women Pathology 2026", patientName: "Charlotte Anderson", age: 28, patientCode: "PCC-1719", gender: "Female" },
    { id: 7, date: "04/02/2024", time: "10:30 AM", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Drug Testing", serviceName: "Women Pathology 2026", patientName: "Olivia Anderson", age: 29, patientCode: "PCC-1719", gender: "Female" },
    { id: 8, date: "04/02/2024", time: "10:30 AM", sampleNo: "2786/B34", type: "Urine", testCode: "2786/B34", testName: "Urine Culture", serviceName: "Women Pathology 2026", patientName: "Sophia Wilson", age: 34, patientCode: "PCC-1719", gender: "Female" },
    { id: 9, date: "04/02/2024", time: "11:00 AM", sampleNo: "2787/B35", type: "Blood", testCode: "2787/B35", testName: "Glucose Test", serviceName: "General Diagnostics 2026", patientName: "James Wilson", age: 45, patientCode: "PCC-1820", gender: "Male" },
    { id: 10, date: "04/02/2024", time: "11:15 AM", sampleNo: "2788/B36", type: "Saliva", testCode: "2788/B36", testName: "DNA Panel", serviceName: "Genetics Lab 2026", patientName: "Emily Davis", age: 27, patientCode: "PCC-1921", gender: "Female" },
  ];

  const shippedDataOriginal = [
    { id: 1, shipDate: "04/02/2024", time: "10:30 AM", shipmentNo: "AH-7651", sampleNo: "2786/B34", type: "Urine", testCode: "2786/B34", testName: "Urine Culture", serviceName: "Women Pathology 2026", patientName: "Cameron Williamson", age: 30, patientCode: "PCC-1719", gender: "Female", shipTo: "Rosewood" },
    { id: 2, shipDate: "04/02/2024", time: "10:30 AM", shipmentNo: "AH-7651", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Biopsy", serviceName: "Women Pathology 2026", patientName: "Olivia Anderson", age: 29, patientCode: "PCC-1719", gender: "Female", shipTo: "Redwood" },
    { id: 3, shipDate: "04/02/2024", time: "10:30 AM", shipmentNo: "AH-7651", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Drug Testing", serviceName: "Women Pathology 2026", patientName: "Mia Thompson", age: 32, patientCode: "PCC-1719", gender: "Female", shipTo: "Silverlake" },
    { id: 4, shipDate: "04/02/2024", time: "10:30 AM", shipmentNo: "AH-7651", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Dipstick Test", serviceName: "Women Pathology 2026", patientName: "Isabella Martinez", age: 33, patientCode: "PCC-1719", gender: "Female", shipTo: "Willowbrook" },
    { id: 5, shipDate: "04/02/2024", time: "10:30 AM", shipmentNo: "AH-7651", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Genetic Testing", serviceName: "Women Pathology 2026", patientName: "Sophia Wilson", age: 34, patientCode: "PCC-1719", gender: "Female", shipTo: "Redwood" },
    { id: 6, shipDate: "04/02/2024", time: "10:30 AM", shipmentNo: "AH-7651", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "CBC", serviceName: "Women Pathology 2026", patientName: "Charlotte Anderson", age: 28, patientCode: "PCC-1719", gender: "Female", shipTo: "Redwood" },
    { id: 7, shipDate: "04/02/2024", time: "10:30 AM", shipmentNo: "AH-7651", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Drug Testing", serviceName: "Women Pathology 2026", patientName: "Olivia Anderson", age: 29, patientCode: "PCC-1719", gender: "Female", shipTo: "Rosewood" },
    { id: 8, shipDate: "04/02/2024", time: "10:30 AM", shipmentNo: "AH-7651", sampleNo: "2786/B34", type: "Urine", testCode: "2786/B34", testName: "Urine Culture", serviceName: "Women Pathology 2026", patientName: "Sophia Wilson", age: 34, patientCode: "PCC-1719", gender: "Female", shipTo: "Willowbrook" },
  ];

  const receivedDataOriginal = [
    { id: 1, date: "04/02/2024", time: "10:30 AM", receivedNo: "AH-7651", sampleNo: "2786/B34", type: "Urine", testCode: "2786/B34", testName: "Urine Culture", serviceName: "Women Pathology 2026", patientName: "Cameron Williamson", age: 30, patientCode: "PCC-1719", gender: "Female", shipTo: "Rosewood", status: "Accepted" },
    { id: 2, date: "04/02/2024", time: "10:30 AM", receivedNo: "AH-7651", sampleNo: "2786/B34", type: "Urine", testCode: "2786/B34", testName: "Biopsy", serviceName: "Women Pathology 2026", patientName: "Olivia Anderson", age: 29, patientCode: "PCC-1719", gender: "Female", shipTo: "Redwood", status: "Accepted" },
    { id: 3, date: "04/02/2024", time: "10:30 AM", receivedNo: null, sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Drug Testing", serviceName: "Women Pathology 2026", patientName: "Mia Thompson", age: 32, patientCode: "PCC-1719", gender: "Female", shipTo: "Silverlake", status: "Rejected" },
    { id: 4, date: "04/02/2024", time: "10:30 AM", receivedNo: "AH-7651", sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Dipstick Test", serviceName: "Women Pathology 2026", patientName: "Isabella Martinez", age: 33, patientCode: "PCC-1719", gender: "Female", shipTo: "Willowbrook", status: "Accepted" },
    { id: 5, date: "04/02/2024", time: "10:30 AM", receivedNo: null, sampleNo: "2786/B34", type: "Blood", testCode: "2786/B34", testName: "Genetic Testing", serviceName: "Women Pathology 2026", patientName: "Sophia Wilson", age: 34, patientCode: "PCC-1719", gender: "Female", shipTo: "Redwood", status: "Rejected" },
  ];

  const activityLogsDataOriginal = [
    { id: 1, date: "04/02/2024", time: "10:30 AM", shipNo: "AH-7651", shipFrom: "Vidai, Pune", shipTo: "Fertivue, Pune", shipBy: "Jordan Blake" },
    { id: 2, date: "04/02/2024", time: "10:30 AM", shipNo: "AH-7651", shipFrom: "Vidai, Pune", shipTo: "Fertivue, Pune", shipBy: "Taylor Quinn" },
    { id: 3, date: "04/02/2024", time: "10:30 AM", shipNo: "AH-7651", shipFrom: "Vidai, Pune", shipTo: "Fertivue, Pune", shipBy: "Morgan Reed" },
    { id: 4, date: "04/02/2024", time: "10:30 AM", shipNo: "AH-7651", shipFrom: "Vidai, Pune", shipTo: "Fertivue, Pune", shipBy: "Casey Lane" },
    { id: 5, date: "04/02/2024", time: "10:30 AM", shipNo: "AH-7651", shipFrom: "Vidai, Pune", shipTo: "Fertivue, Pune", shipBy: "Riley Brooks" },
  ];

  const currentDataArray = useMemo(() => {
    switch (activeTab) {
      case "pending": return pendingDataOriginal;
      case "shipped": return shippedDataOriginal;
      case "received": return receivedDataOriginal;
      case "activity": return activityLogsDataOriginal;
      default: return [];
    }
  }, [activeTab]);

  const filteredData = useMemo(() => {
    return currentDataArray.filter((item: any) => {
      const pName = (item.patientName || item.shipBy || "").toLowerCase();
      const sNo = (item.sampleNo || item.shipNo || "").toLowerCase();
      const tName = (item.testName || "").toLowerCase();
      const query = searchQuery.toLowerCase();

      const matchesSearch = pName.includes(query) || sNo.includes(query) || tName.includes(query);

      // const matchesFromDate = appliedFilters.fromDate ? true : true; // Simplified for demo
      // const matchesToDate = appliedFilters.toDate ? true : true; // Simplified for demo

      if (activeTab === "activity") {
        const matchesShipFrom = appliedFilters.shipFrom ? item.shipFrom.toLowerCase().includes(appliedFilters.shipFrom.toLowerCase()) : true;
        const matchesShipTo = appliedFilters.shipTo ? item.shipTo.toLowerCase().includes(appliedFilters.shipTo.toLowerCase()) : true;
        const matchesShipBy = appliedFilters.shipBy ? item.shipBy.toLowerCase().includes(appliedFilters.shipBy.toLowerCase()) : true;
        const matchesShipNo = appliedFilters.shipmentNo ? item.shipNo.toLowerCase().includes(appliedFilters.shipmentNo.toLowerCase()) : true;
        return matchesSearch && matchesShipFrom && matchesShipTo && matchesShipBy && matchesShipNo;
      }

      const matchesSpecimen = appliedFilters.specimenType
        ? item.type?.toLowerCase() === appliedFilters.specimenType.toLowerCase()
        : true;
      const matchesService = appliedFilters.service
        ? item.serviceName?.toLowerCase().includes(appliedFilters.service.toLowerCase())
        : true;
      const matchesTest = appliedFilters.testName
        ? item.testName?.toLowerCase().includes(appliedFilters.testName.toLowerCase())
        : true;
      const matchesShipToCommon = appliedFilters.shipTo
        ? item.shipTo?.toLowerCase().includes(appliedFilters.shipTo.toLowerCase())
        : true;

      return matchesSearch && matchesSpecimen && matchesService && matchesTest && matchesShipToCommon;
    });
  }, [currentDataArray, searchQuery, appliedFilters, activeTab]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const toggleRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const isAllSelected = activeTab === "pending" && currentItems.length > 0 && currentItems.every((item) => selectedRows.includes(item.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      const currentPageIds = currentItems.map((item) => item.id);
      setSelectedRows(selectedRows.filter((id) => !currentPageIds.includes(id)));
    } else {
      const newSelected = [...selectedRows];
      currentItems.forEach((item) => {
        if (!newSelected.includes(item.id)) newSelected.push(item.id);
      });
      setSelectedRows(newSelected);
    }
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters });
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const handleClearFilters = () => {
    const emptyFilters = { fromDate: "", toDate: "", shipTo: "", specimenType: "", testName: "", service: "", shipFrom: "", shipBy: "", shipmentNo: "" };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "pending":
        return (
          <PendingTab
            data={currentItems}
            selectedRows={selectedRows}
            onToggleRow={toggleRow}
            onToggleSelectAll={toggleSelectAll}
            isAllSelected={isAllSelected}
          />
        );
      case "shipped":
        return <ShippedTab data={currentItems} />;
      case "received":
        return <ReceivedTab data={currentItems} />;
      case "activity":
        return <ActivityLogsTab data={currentItems} />;
      default:
        return null;
    }
  };

  return (
    <div className="shipment-container">
      <div className="shipment-header">
        <h2 className="page-title">Sample List ({filteredData.length})</h2>
        <div className="header-right">
          <div className="search-wrapper">
            <SearchIcon className="search-icon" />
            <input
              type="text"
              placeholder={activeTab === "activity" ? "Search by Ship No., ..." : "Search by Patient name, MRN No., Specimen No., Test..."}
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="filter-button" onClick={() => setShowFilterModal(true)}>
            <FilterAltIcon fontSize="small" />
          </button>
        </div>
      </div>

      <div className="tabs-container">
        <button
          className={`tab-item ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => { setActiveTab("pending"); setCurrentPage(1); }}
        >
          Pending (12)
        </button>
        <button
          className={`tab-item ${activeTab === "shipped" ? "active" : ""}`}
          onClick={() => { setActiveTab("shipped"); setCurrentPage(1); }}
        >
          Shipped (9)
        </button>
        <button
          className={`tab-item ${activeTab === "received" ? "active" : ""}`}
          onClick={() => { setActiveTab("received"); setCurrentPage(1); }}
        >
          Received (10)
        </button>
        <button
          className={`tab-item ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => { setActiveTab("activity"); setCurrentPage(1); }}
        >
          Activity Logs
        </button>
      </div>

      <div className="table-container">
        {renderTabContent()}

        <div className="table-footer">
          <div className="showing-entries">
            Showing {filteredData.length > 0 ? startIndex + 1 : 0} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="pagination-controls">
            <ChevronLeftIcon
              className={`pagination-arrow ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            />
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                className={`page-num ${currentPage === num ? "active" : ""}`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
            <ChevronRightIcon
              className={`pagination-arrow ${currentPage === totalPages || totalPages === 0 ? "disabled" : ""}`}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            />
          </div>
        </div>
      </div>

      {activeTab === "pending" && (
        <div className="shipping-button-container">
          <button
            className="schedule-shipping-btn"
            onClick={() => {
              if (selectedRows.length > 0) {
                setShowShippingModal(true);
              } else {
                alert("Please select at least one sample to schedule shipping.");
              }
            }}
          >
            Schedule Shipping
          </button>
        </div>
      )}

      {/* Modals Implementation */}
      {showFilterModal && (
        <div className="modal-overlay">
          <div className="modal-content filter-modal">
            <div className="modal-header">
              <h3>Filters</h3>
              <CloseIcon className="close-icon-btn" onClick={() => setShowFilterModal(false)} />
            </div>

            <div className="filter-grid">
              <div className="filter-item">
                <label>From Date</label>
                <div className="input-with-icon">
                  <input type="text" placeholder="13/03/2026" value={filters.fromDate} onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })} />
                  <CalendarMonthIcon className="inner-icon" />
                </div>
              </div>
              <div className="filter-item">
                <label>To Date</label>
                <div className="input-with-icon">
                  <input type="text" placeholder="14/03/2026" value={filters.toDate} onChange={(e) => setFilters({ ...filters, toDate: e.target.value })} />
                  <CalendarMonthIcon className="inner-icon" />
                </div>
              </div>

              {activeTab === "activity" ? (
                <>
                  <div className="filter-item">
                    <label>Ship From</label>
                    <div className="input-with-icon">
                      <select value={filters.shipFrom} onChange={(e) => setFilters({ ...filters, shipFrom: e.target.value })}>
                        <option value="">Vidai, Pune</option>
                        <option value="Vidai, Pune">Vidai, Pune</option>
                        <option value="Fertivue, Pune">Fertivue, Pune</option>
                      </select>
                      <KeyboardArrowDownIcon className="inner-icon" />
                    </div>
                  </div>
                  <div className="filter-item">
                    <label>Ship To</label>
                    <div className="input-with-icon">
                      <select value={filters.shipTo} onChange={(e) => setFilters({ ...filters, shipTo: e.target.value })}>
                        <option value="">Fertivue, Pune</option>
                        <option value="Fertivue, Pune">Fertivue, Pune</option>
                        <option value="Vidai, Pune">Vidai, Pune</option>
                      </select>
                      <KeyboardArrowDownIcon className="inner-icon" />
                    </div>
                  </div>
                  <div className="filter-item">
                    <label>Ship By</label>
                    <div className="input-with-icon">
                      <select value={filters.shipBy} onChange={(e) => setFilters({ ...filters, shipBy: e.target.value })}>
                        <option value="">Riley Brooks</option>
                        <option value="Jordan Blake">Jordan Blake</option>
                        <option value="Riley Brooks">Riley Brooks</option>
                      </select>
                      <KeyboardArrowDownIcon className="inner-icon" />
                    </div>
                  </div>
                  <div className="filter-item">
                    <label>Shipment No.</label>
                    <div className="input-with-icon">
                      <input type="text" placeholder="AH-7651" value={filters.shipmentNo} onChange={(e) => setFilters({ ...filters, shipmentNo: e.target.value })} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="filter-item">
                    <label>Ship To</label>
                    <div className="input-with-icon">
                      <select value={filters.shipTo} onChange={(e) => setFilters({ ...filters, shipTo: e.target.value })}>
                        <option value="">Willowbrook</option>
                        <option value="Rosewood">Rosewood</option>
                        <option value="Redwood">Redwood</option>
                      </select>
                      <KeyboardArrowDownIcon className="inner-icon" />
                    </div>
                  </div>
                  <div className="filter-item">
                    <label>Specimen Type</label>
                    <div className="input-with-icon">
                      <select value={filters.specimenType} onChange={(e) => setFilters({ ...filters, specimenType: e.target.value })}>
                        <option value="">Blood</option>
                        <option value="Blood">Blood</option>
                        <option value="Urine">Urine</option>
                      </select>
                    </div>
                  </div>
                  <div className="filter-item">
                    <label>Test Name</label>
                    <div className="input-with-icon">
                      <select value={filters.testName} onChange={(e) => setFilters({ ...filters, testName: e.target.value })}>
                        <option value="">Drug Testing</option>
                        <option value="Urine Culture">Urine Culture</option>
                        <option value="Biopsy">Biopsy</option>
                      </select>
                    </div>
                  </div>
                  <div className="filter-item">
                    <label>Service</label>
                    <div className="input-with-icon">
                      <select value={filters.service} onChange={(e) => setFilters({ ...filters, service: e.target.value })}>
                        <option value="">Women Pathology</option>
                        <option value="Women Pathology 2026">Women Pathology</option>
                        <option value="General Diagnostics">General Diagnostics</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer filter-footer">
              <button className="clear-all-btn" onClick={handleClearFilters}>Clear All</button>
              <button className="apply-btn" onClick={handleApplyFilters}>Apply</button>
            </div>
          </div>
        </div>
      )}

      {showShippingModal && (
        <div className="modal-overlay">
          <div className="modal-content shipping-modal">
            <div className="modal-header">
              <h3>Schedule Shipping</h3>
              <CloseIcon className="close-icon-btn" onClick={() => setShowShippingModal(false)} />
            </div>
            <div className="shipping-form-grid">
              <div className="form-item disabled"><label>Ship Date</label><div className="input-with-icon"><input type="text" value="13/03/2026" readOnly /><CalendarMonthIcon className="inner-icon" /></div></div>
              <div className="form-item"><label>Ship Time</label><div className="input-with-icon"><input type="text" defaultValue="12:30" /><AccessTimeIcon className="inner-icon" /></div></div>
              <div className="form-item disabled"><label>Dispatched By</label><input type="text" value="Fertivue, Pune" readOnly /></div>
              <div className="form-item"><label>Ship To</label><div className="input-with-icon"><select><option>Willowbrook</option></select></div></div>
            </div>
            <div className="shipping-details-section">
              <h4>SHIPPING DETAILS ({selectedRows.length})</h4>
              <div className="mini-table-container">
                <table className="mini-table">
                  <thead><tr><th>Date | Time</th><th>Specimen No. | Type</th><th>Test Code | Name</th><th>Patient</th></tr></thead>
                  <tbody>
                    {pendingDataOriginal.filter(item => selectedRows.includes(item.id)).map(item => (
                      <tr key={item.id}>
                        <td>{item.date}<br />{item.time}</td>
                        <td>{item.sampleNo}<br />{item.type}</td>
                        <td>{item.testCode}<br />{item.testName}</td>
                        <td>{item.patientName} | {item.age}<br />{item.patientCode} | {item.gender}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer shipping-footer">
              <button className="cancel-btn" onClick={() => setShowShippingModal(false)}>Cancel</button>
              <button className="save-btn" onClick={() => { alert("Shipping Scheduled!"); setSelectedRows([]); setShowShippingModal(false); }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentView;
