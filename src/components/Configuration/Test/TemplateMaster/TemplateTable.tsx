import { useState, useEffect } from "react";
import DataTable, {
  Column,
  Toggle,
} from "../CommonComponents/DataTable/DataTable";
import EditIcon from "../../../../assets/icons/edit.svg";

type TemplateRow = {
  code: string;
  name: string;
  noOfPathologists: number;
  gender: string;
  status: boolean;
};

type TemplateTableProps = {
  onCountChange?: (count: number) => void;
};

const initialData: TemplateRow[] = [
  {
    code: "TM-001",
    name: "Template A",
    noOfPathologists: 5,
    gender: "Male",
    status: true,
  },
  {
    code: "TM-002",
    name: "Template B",
    noOfPathologists: 3,
    gender: "Female",
    status: false,
  },
  {
    code: "TM-003",
    name: "Template C",
    noOfPathologists: 2,
    gender: "Male",
    status: true,
  },
  {
    code: "TM-004",
    name: "Template D",
    noOfPathologists: 3,
    gender: "Female",
    status: false,
  },
  {
    code: "TM-009",
    name: "Template D",
    noOfPathologists: 3,
    gender: "Female",
    status: false,
  },
  {
    code: "TM-005",
    name: "Template E",
    noOfPathologists: 4,
    gender: "Female",
    status: true,
  },
  {
    code: "TM-006",
    name: "Template C",
    noOfPathologists: 2,
    gender: "Male",
    status: true,
  },
  {
    code: "TM-007",
    name: "Template C",
    noOfPathologists: 2,
    gender: "Male",
    status: true,
  },
  {
    code: "TM-008",
    name: "Template C",
    noOfPathologists: 2,
    gender: "Male",
    status: true,
  },
  {
    code: "TM-010",
    name: "Template C",
    noOfPathologists: 2,
    gender: "Male",
    status: true,
  },
  {
    code: "TM-011",
    name: "Template C",
    noOfPathologists: 2,
    gender: "Male",
    status: true,
  },
  {
    code: "TM-012",
    name: "Template C",
    noOfPathologists: 2,
    gender: "Male",
    status: true,
  },
  {
    code: "TM-013",
    name: "Template C",
    noOfPathologists: 2,
    gender: "Male",
    status: true,
  },
];

export default function TemplateTable({ onCountChange }: TemplateTableProps) {
  const [data, setData] = useState<TemplateRow[]>(initialData);

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

  const columns: Column<TemplateRow>[] = [
    { key: "code", header: "Template Code", width: "13%" },
    { key: "name", header: "Template Name", width: "25%" },
    { key: "noOfPathologists", header: "No. of Pathologists", width: "18%" },
    { key: "gender", header: "Gender", width: "15%" },
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
