import { useEffect, useMemo } from "react";
import EditIcon from "../../../../assets/icons/edit.svg";
import DataTable, {
  Column,
  Toggle,
} from "../CommonComponents/DataTable/DataTable";
import type { CategoryRow } from "../Test";

type CategoryTableProps = {
  data: CategoryRow[];
  setData: React.Dispatch<React.SetStateAction<CategoryRow[]>>;
  onCountChange?: (count: number) => void;
  onEdit: (row: CategoryRow) => void;
  searchText?: string;
};

export default function CategoryTable({
  data,
  setData,
  onCountChange,
  onEdit,
  searchText = "",
}: CategoryTableProps) {
  const filteredData = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return data;
    return data.filter(
      (item) =>
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query),
    );
  }, [data, searchText]);

  useEffect(() => {
    onCountChange?.(filteredData.length);
  }, [filteredData, onCountChange]);

  const handleToggle = (code: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.code === code ? { ...item, status: !item.status } : item,
      ),
    );
  };

  // Figma: Code 20% | Name 44% | No. of Tests 14% | Status 16% | Edit 6%
  const columns: Column<CategoryRow>[] = [
    { key: "code", header: "Category Code", width: "15%" },
    { key: "name", header: "Category Name", width: "19%" },
    { key: "tests", header: "No. of Tests", width: "50%" },
    {
      key: "status",
      header: "Status",
      align: "right",
      width: "16%",
      render: (row) => (
        <Toggle checked={row.status} onChange={() => handleToggle(row.code)} />
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      width: "6%",
      render: (row) => (
        <button
          type="button"
          onClick={() => onEdit(row)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <img src={EditIcon} alt="edit" width={18} height={18} />
        </button>
      ),
    },
  ];

  return <DataTable columns={columns} data={filteredData} />;
}
