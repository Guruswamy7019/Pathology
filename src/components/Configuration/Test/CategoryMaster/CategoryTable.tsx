import { useState, useEffect } from "react";
import EditIcon from "../../../../assets/icons/edit.svg";
import DataTable, {
  Column,
  Toggle,
} from "../CommonComponents/DataTable/DataTable";

type CategoryRow = {
  code: string;
  name: string;
  tests: number;
  status: boolean;
};

type CategoryTableProps = {
  onCountChange?: (count: number) => void;
};

const initialData: CategoryRow[] = [
  { code: "CT-001", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-002", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-003", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-004", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-005", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-006", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-007", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-008", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-009", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-010", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-011", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-012", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-013", name: "Biochemistry", tests: 9, status: true },
  { code: "CT-014", name: "Biochemistry", tests: 9, status: true },
];

export default function CategoryTable({ onCountChange }: CategoryTableProps) {
  const [data, setData] = useState<CategoryRow[]>(initialData);

  useEffect(() => {
    onCountChange?.(data.length);
  }, [data, onCountChange]);

  const handleToggle = (code: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.code === code ? { ...item, status: !item.status } : item,
      ),
    );
  };

  const columns: Column<CategoryRow>[] = [
    { key: "code", header: "Category Code", width: "15%" },
    { key: "name", header: "Category Name", width: "18%" },
    { key: "tests", header: "No. of Tests", width: "18%" },
    {
      key: "status",
      header: "Status",
      align: "right",
      render: (row) => (
        <Toggle checked={row.status} onChange={() => handleToggle(row.code)} />
      ),
    },
    {
      key: "actions",
      header: "",
      align: "right",
      width: "5%",
      render: (row) => (
        <button
          type="button"
          onClick={() => console.log("edit", row)}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img src={EditIcon} alt="" width={20} height={20} />
        </button>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
