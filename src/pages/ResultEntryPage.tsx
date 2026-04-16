import { useState } from "react";
import "./ResultEntry.css";
import { FiSearch, FiPlus } from "react-icons/fi";
 import { HiOutlineFilter } from "react-icons/hi";
import { FaRegFileAlt } from "react-icons/fa";
 


interface Result {
  id: number;
  date: string;
  time: string;
  patient: string;
  details: string;
  type: string;
  doctor: string;
  bill: string;
  orders: number;
  status: "Pending" | "Complete";
}

const ResultEntry = () => {
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  
  const [activeBill, setActiveBill] = useState<number | null>(null);

  const itemsPerPage = 10;

  const data: Result[] = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    date: "04/02/2024",
    time: "10:30 AM",
    patient: i % 2 ? "Olivia Anderson" : "Emilia Williamson",
    details: "PCC-1719 | Female",
    type: i % 2 ? "Registered" : "Walk-In",
    doctor: "Dr. Emilia Clarke",
    bill: "PCC/25/OP/000134",
    orders: 16,
    status: i % 3 === 0 ? "Pending" : "Complete",
  }));

  const filteredData = data.filter((item) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      item.patient.toLowerCase().includes(searchText) ||
      item.bill.toLowerCase().includes(searchText);

    const matchesFilter =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="result-container"
      onClick={() => setActiveBill(null)} 
    >
      <div className="result-header">
        <h3>Result Entry List ({filteredData.length})</h3>

        <div className="actions">
          <div className="search-box">
            <FiSearch />
            <input
              placeholder="Search by Patient name, MRN No."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <button
            className="filter-btn"
            onClick={() => setFilterOpen(true)}
          >
            <HiOutlineFilter />
          </button>
        </div>
      </div>

      
      {filterOpen && (
        <div
          className="filter-overlay"
          onClick={() => setFilterOpen(false)}
        >
          <div
            className="filter-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Filters</h4>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Complete">Complete</option>
            </select>

            <div className="filter-actions">
              <button
                className="clear"
                onClick={() => setStatusFilter("All")}
              >
                Clear All
              </button>

              <button
                className="apply"
                onClick={() => setFilterOpen(false)}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      
      <div className="table">
        <div className="table-head">
          <span>Order Date | Time</span>
          <span>Patient</span>
          <span>Patient Type</span>
          <span>Doctor Name</span>
          <span>Bill Details</span>
          <span>No. of Orders</span>
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

           
            <span
              className="bill"
              onClick={(e) => {
                e.stopPropagation();
                setActiveBill(item.id);
              }}
            >
              ⓘ {item.bill}

              
              {activeBill === item.id && (
                <div className="bill-tooltip">
                  <p>
                    Net Amt. : <strong>$5463.0</strong>
                  </p>
                  <p>
                    Status :
                    <span className="paid">Paid</span>
                  </p>
                </div>
              )}
            </span>

            <span>{item.orders}</span>

            <span>
              <span
                className={`status ${
                  item.status === "Pending" ? "pending" : "complete"
                }`}
              >
                {item.status}
              </span>
            </span>

            <span className="result-icon">
              {item.status === "Pending" ? <FiPlus /> : <FaRegFileAlt />}
            </span>
          </div>
        ))}
      </div>

      
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          ◀
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default ResultEntry;