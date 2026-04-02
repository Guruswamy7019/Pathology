import { useMemo, useState } from "react";
import AddIcon from "../../../assets/icons/add-square.svg";
import EditIcon from "../../../assets/icons/edit.svg";
import LeftArrow from "../../../assets/icons/left_arrow.svg";
import RightArrow from "../../../assets/icons/right_arrow.svg";
import SearchIcon from "../../../assets/icons/search.png";
import {
  type SampleTubeItem,
  sampleMockData,
  tubeMockData,
} from "./mockDataSampleTube";

type SampleTubeTab = "Sample" | "Tube";

const tabs: SampleTubeTab[] = ["Sample", "Tube"];

const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    borderRadius: "14px",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  tabs: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    borderBottom: "1px solid #eceef2",
    backgroundColor: "#fafafa",
  },
  tabButton: {
    padding: "14px 10px",
    border: "none",
    borderBottom: "2px solid transparent",
    background: "transparent",
    color: "#81858d",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  tabButtonActive: {
    color: "#23262b",
    borderBottomColor: "#e65245",
    backgroundColor: "#ffffff",
  },
  content: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
    padding: "14px",
    height: "100%",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    flexWrap: "wrap" as const,
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#2a2d33",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap" as const,
  },
  searchWrapper: {
    position: "relative" as const,
  },
  searchIcon: {
    position: "absolute" as const,
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "14px",
    height: "14px",
    opacity: 0.55,
    pointerEvents: "none" as const,
  },
  searchInput: {
    width: "280px",
    height: "36px",
    borderRadius: "10px",
    border: "1px solid #dde1e7",
    padding: "0 12px 0 34px",
    fontSize: "13px",
    outline: "none",
    color: "#333842",
  },
  createButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    height: "36px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#4e5158",
    color: "#ffffff",
    padding: "0 14px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
  createIcon: {
    width: "14px",
    height: "14px",
    filter: "brightness(0) invert(1)",
  },
  tableWrap: {
    border: "1px solid #edf0f4",
    borderRadius: "12px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    minHeight: "420px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
  },
  tableHead: {
    backgroundColor: "#f8f9fb",
  },
  th: {
    textAlign: "left" as const,
    fontSize: "12px",
    color: "#7d828b",
    fontWeight: 600,
    padding: "12px 14px",
    borderBottom: "1px solid #edf0f4",
    whiteSpace: "nowrap" as const,
  },
  td: {
    fontSize: "14px",
    color: "#373b43",
    padding: "13px 14px",
    borderBottom: "1px solid #f2f4f7",
  },
  mutedTd: {
    color: "#8a909a",
    textAlign: "center" as const,
  },
  statusCell: {
    textAlign: "center" as const,
  },
  actionCell: {
    textAlign: "center" as const,
    width: "40px",
  },
  iconButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    padding: 0,
    lineHeight: 0,
  },
  switchLabel: {
    position: "relative" as const,
    display: "inline-block",
    width: "30px",
    height: "16px",
  },
  switchInput: {
    opacity: 0,
    width: 0,
    height: 0,
    position: "absolute" as const,
  },
  slider: {
    position: "absolute" as const,
    inset: 0,
    borderRadius: "999px",
    backgroundColor: "#d8dbe1",
    transition: "all .2s ease",
  },
  sliderOn: {
    backgroundColor: "#4bb569",
  },
  knob: {
    position: "absolute" as const,
    top: "2px",
    left: "2px",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    boxShadow: "0 1px 3px rgba(0,0,0,.25)",
    transition: "all .2s ease",
  },
  knobOn: {
    transform: "translateX(14px)",
  },
  tableFooter: {
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    padding: "12px 14px",
    color: "#8a909a",
    fontSize: "12px",
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  pageButton: {
    minWidth: "24px",
    height: "24px",
    border: "1px solid #d6dae2",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    color: "#636a75",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    display: "grid",
    placeItems: "center" as const,
    padding: 0,
  },
  pageButtonActive: {
    backgroundColor: "#1f232a",
    borderColor: "#1f232a",
    color: "#ffffff",
  },
  pageButtonDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
};

function SampleAndTube() {
  const [activeTab, setActiveTab] = useState<SampleTubeTab>("Sample");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sampleData, setSampleData] = useState(sampleMockData);
  const [tubeData, setTubeData] = useState(tubeMockData);

  const itemsPerPage = 10;

  const activeData = activeTab === "Sample" ? sampleData : tubeData;

  const filteredRows = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return activeData;
    }

    return activeData.filter((item) => {
      return (
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query)
      );
    });
  }, [activeData, searchText]);

  const totalItems = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedRows = filteredRows.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const startEntry = totalItems === 0 ? 0 : startIndex + 1;
  const endEntry = Math.min(startIndex + itemsPerPage, totalItems);

  const toolbarTitle = `List of ${activeTab} (${activeData.length})`;

  const handleTabClick = (tab: SampleTubeTab) => {
    setActiveTab(tab);
    setSearchText("");
    setCurrentPage(1);
  };

  const toggleStatus = (id: number) => {
    const updater = (items: SampleTubeItem[]) =>
      items.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      );

    if (activeTab === "Sample") {
      setSampleData((prev) => updater(prev));
      return;
    }

    setTubeData((prev) => updater(prev));
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        {tabs.map((tab) => {
          const tabStyle =
            activeTab === tab
              ? { ...styles.tabButton, ...styles.tabButtonActive }
              : styles.tabButton;

          return (
            <button
              key={tab}
              type="button"
              style={tabStyle}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div style={styles.content}>
        <div style={styles.toolbar}>
          <span style={styles.title}>{toolbarTitle}</span>

          <div style={styles.actions}>
            <div style={styles.searchWrapper}>
              <img src={SearchIcon} alt="search" style={styles.searchIcon} />
              <input
                value={searchText}
                onChange={(event) => {
                  setSearchText(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder={`Search by ${activeTab} Code / Name`}
                style={styles.searchInput}
              />
            </div>

            <button type="button" style={styles.createButton}>
              <img src={AddIcon} alt="add" style={styles.createIcon} />
              {`Create New ${activeTab}`}
            </button>
          </div>
        </div>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={{ ...styles.th, width: "140px" }}>
                  {`${activeTab} Code`}
                </th>
                <th style={styles.th}>{`${activeTab} Name`}</th>
                <th
                  style={{ ...styles.th, textAlign: "center", width: "90px" }}
                >
                  Status
                </th>
                <th
                  style={{ ...styles.th, textAlign: "center", width: "40px" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length === 0 ? (
                <tr>
                  <td style={{ ...styles.td, ...styles.mutedTd }} colSpan={4}>
                    No {activeTab.toLowerCase()} records found.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((row) => (
                  <tr key={row.id}>
                    <td style={styles.td}>{row.code}</td>
                    <td style={styles.td}>{row.name}</td>
                    <td style={{ ...styles.td, ...styles.statusCell }}>
                      <label style={styles.switchLabel}>
                        <input
                          type="checkbox"
                          checked={row.isActive}
                          onChange={() => toggleStatus(row.id)}
                          style={styles.switchInput}
                        />
                        <span
                          style={
                            row.isActive
                              ? { ...styles.slider, ...styles.sliderOn }
                              : styles.slider
                          }
                        >
                          <span
                            style={
                              row.isActive
                                ? { ...styles.knob, ...styles.knobOn }
                                : styles.knob
                            }
                          />
                        </span>
                      </label>
                    </td>
                    <td style={{ ...styles.td, ...styles.actionCell }}>
                      <button
                        type="button"
                        style={styles.iconButton}
                        aria-label={`Edit ${row.name}`}
                      >
                        <img src={EditIcon} alt="edit" width={14} height={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div style={styles.tableFooter}>
            <span>
              Showing {startEntry} to {endEntry} of {totalItems} entries
            </span>

            <div style={styles.pagination}>
              <button
                type="button"
                style={
                  safeCurrentPage === 1
                    ? { ...styles.pageButton, ...styles.pageButtonDisabled }
                    : styles.pageButton
                }
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                }
                disabled={safeCurrentPage === 1}
                aria-label="Previous page"
              >
                <img src={LeftArrow} alt="previous" width={10} height={10} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    style={
                      safeCurrentPage === page
                        ? { ...styles.pageButton, ...styles.pageButtonActive }
                        : styles.pageButton
                    }
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ),
              )}

              <button
                type="button"
                style={
                  safeCurrentPage === totalPages
                    ? { ...styles.pageButton, ...styles.pageButtonDisabled }
                    : styles.pageButton
                }
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, totalPages),
                  )
                }
                disabled={safeCurrentPage === totalPages}
                aria-label="Next page"
              >
                <img src={RightArrow} alt="next" width={10} height={10} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SampleAndTube;
