import { useMemo, useState } from "react";
import LeftArrow from "../../../../../assets/icons/left_arrow.svg";
import RightArrow from "../../../../../assets/icons/right_arrow.svg";
import styles from "./DataTable.module.css";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: "left" | "right";
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  itemsPerPage?: number;
};

export default function DataTable<T extends { [key: string]: unknown }>({
  columns,
  data,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startEntry =
    totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalItems);

  const currentRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.head}>
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
                className={styles.row}
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

      <div className={styles.footer}>
        <span>
          Showing {startEntry} to {endEntry} of {totalItems} entries
        </span>
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <img src={LeftArrow} alt="previous" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`${styles.pageBtn} ${currentPage === page ? styles.active : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className={styles.pageBtn}
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
