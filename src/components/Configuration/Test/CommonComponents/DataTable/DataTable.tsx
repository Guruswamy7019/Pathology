import { useMemo, useState, useRef, useEffect } from "react";
import LeftArrow from "../../../../../assets/icons/left_arrow.svg";
import RightArrow from "../../../../../assets/icons/right_arrow.svg";
import AddIcon from "../../../../../assets/icons/add-square.svg";
import FunnelIcon from "../../../../../assets/icons/Filter_Leads.svg";
import SearchIcon from "../../../../../assets/icons/search.png";
import tableStyles from "./DataTable.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Column<T> = {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: "left" | "right";
  render?: (row: T) => React.ReactNode;
};

// ─── Toggle ───────────────────────────────────────────────────────────────────

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
};

export function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <label className={tableStyles.switch}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={tableStyles.slider}></span>
    </label>
  );
}

// ─── TabsHeader ───────────────────────────────────────────────────────────────

type TabsHeaderProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function TabsHeader({ tabs, activeTab, setActiveTab }: TabsHeaderProps) {
  return (
    <div className={tableStyles.tabs}>
      {tabs.map((tab) => (
        <span
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`${tableStyles.tab} ${activeTab === tab ? tableStyles.activeTab : ""}`}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}

// ─── PageToolbar ──────────────────────────────────────────────────────────────

type PageToolbarProps = {
  title: string;
  searchPlaceholder?: string;
  searchValue?: string;
  createLabel?: string;
  onSearch?: (value: string) => void;
  onAdd?: () => void;
  showFilter?: boolean;
  onFilter?: () => void;
};

export function PageToolbar({
  title,
  searchPlaceholder = "Search...",
  searchValue = "",
  createLabel = "Create New",
  onSearch,
  onAdd,
  showFilter = false,
  onFilter,
}: PageToolbarProps) {
  return (
    <div className={tableStyles.toolbar}>
      <span className={tableStyles.title}>{title}</span>
      <div className={tableStyles.actions}>
        <div className={tableStyles.searchWrapper}>
          <img
            src={SearchIcon}
            className={tableStyles.searchIcon}
            alt="search"
          />
          <input
            value={searchValue}
            placeholder={searchPlaceholder}
            className={tableStyles.searchInput}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        {showFilter && (
          <button
            type="button"
            className={tableStyles.filterBtn}
            onClick={onFilter}
          >
            <img src={FunnelIcon} alt="filter" width={30} height={30} />
          </button>
        )}

        <button type="button" className={tableStyles.createBtn} onClick={onAdd}>
          <img src={AddIcon} alt="add" className={tableStyles.btnIcon} />
          {createLabel}
        </button>
      </div>
    </div>
  );
}

// ─── DataTable ────────────────────────────────────────────────────────────────

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
};

export default function DataTable<T extends { [key: string]: unknown }>({
  columns,
  data,
  itemsPerPage: fixedItemsPerPage,
}: DataTableProps<T>) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [dynamicItemsPerPage, setDynamicItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (fixedItemsPerPage) return;

    const calculateRows = () => {
      if (!wrapperRef.current) return;

      const availableHeight = wrapperRef.current.getBoundingClientRect().height;
      const header = wrapperRef.current.querySelector("thead");
      const footer = wrapperRef.current.querySelector(`.${tableStyles.footer}`);
      const firstRow = wrapperRef.current.querySelector("tbody tr");

      const headerH = header?.getBoundingClientRect().height ?? 49;
      const footerH = footer?.getBoundingClientRect().height ?? 56;
      const rowH = firstRow?.getBoundingClientRect().height ?? 55;

      const BUFFER = 20;

      const rowsAvailable = Math.floor(
        (availableHeight - headerH - footerH - BUFFER) / rowH,
      );

      setDynamicItemsPerPage(Math.max(1, rowsAvailable));
      setCurrentPage(1);
    };

    const observer = new ResizeObserver(calculateRows);
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [fixedItemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const itemsPerPage = fixedItemsPerPage ?? dynamicItemsPerPage;
  const totalItems = data.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startEntry =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalItems);

  const currentRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return (
    <div className={tableStyles.wrapper} ref={wrapperRef}>
      <div className={tableStyles.tableWrapper}>
        <table className={tableStyles.table}>
          <thead className={tableStyles.head}>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  style={{ width: col.width, textAlign: col.align ?? "left" }}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, rowIndex) => (
              <tr
                key={`row-${(currentPage - 1) * itemsPerPage + rowIndex}`}
                className={tableStyles.row}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    style={{ textAlign: col.align ?? "left" }}
                  >
                    {col.render
                      ? col.render(row)
                      : (row[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={tableStyles.footer}>
        <span>
          Showing {startEntry} to {endEntry} of {totalItems} entries
        </span>
        <div className={tableStyles.pagination}>
          <button
            type="button"
            className={tableStyles.pageBtn}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <img src={LeftArrow} alt="previous" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              type="button"
              key={page}
              className={`${tableStyles.pageBtn} ${currentPage === page ? tableStyles.active : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className={tableStyles.pageBtn}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <img src={RightArrow} alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
}
