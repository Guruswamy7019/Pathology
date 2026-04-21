import { useEffect, useState } from "react";
import "./ResultEntry.css";
import { FiSearch, FiPlus } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import { FaRegFileAlt } from "react-icons/fa";

import CBC from "./CBC";
import { Result } from "./types";

const ResultEntry = () => {
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const data: Result[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    date: "04/02/2024",
    time: "10:30 AM",
    patient: i % 2 ? "Olivia Anderson" : "Emilia Williamson",
    details: "PCC-1719 | Female",
    type: "Registered",
    doctor: "Dr. Emilia Clarke",
    bill: "PCC/25/OP/000134",
    orders: 16,
    status: i % 3 === 0 ? "Pending" : "Completed",
  }));

  // 🔍 FILTER DATA
  const filteredData = data.filter((item) => {
    const searchText = search.toLowerCase();
    return (
      Object.values(item).join(" ").toLowerCase().includes(searchText) &&
      (statusFilter === "All" || item.status === statusFilter)
    );
  });

  // 🔁 RESET PAGE ON SEARCH/FILTER CHANGE
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // 📄 PAGINATION
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🔙 OPEN CBC PAGE
  if (selectedResult) {
    return (
      <CBC onBack={() => setSelectedResult(null)} data={selectedResult} />
    );
  }

  return (
    <div className="result-container">
      {/* HEADER */}
      <div className="result-header">
        <h3>Result Entry List ({filteredData.length})</h3>

        <div className="actions">
          <div className="search-box">
            <FiSearch />
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button className="filter-btn">
            <HiOutlineFilter />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table">
        <div className="table-head">
          <span>Order Date | Time</span>
          <span>Patient</span>
          <span>Type</span>
          <span>Doctor</span>
          <span>Bill</span>
          <span>Orders</span>
          <span>Status</span>
          <span>Result</span>
        </div>

        {paginatedData.map((item) => (
          <div className="table-row" key={item.id}>
            <div>
              <p>{item.date}</p>
              <small>{item.time}</small>
            </div>

            <div>
              <p>{item.patient}</p>
              <small>{item.details}</small>
            </div>

            <span>{item.type}</span>
            <span>{item.doctor}</span>
            <span>{item.bill}</span>
            <span>{item.orders}</span>

            <span className={item.status === "Pending" ? "pending" : "complete"}>
              {item.status}
            </span>

            <span
              onClick={(e) => {
                e.stopPropagation();
                setSelectedResult(item);
              }}
              style={{ cursor: "pointer" }}
            >
              {item.status === "Pending" ? <FiPlus /> : <FaRegFileAlt />}
            </span>
          </div>
        ))}
      </div>

      {/* 🔵 NUMBERED PAGINATION */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResultEntry;