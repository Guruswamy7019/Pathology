import { useState, useEffect } from "react";
import EditIcon from "../../../../assets/icons/edit.svg";
import DataTable, {
  Column,
  Toggle,
} from "../CommonComponents/DataTable/DataTable";

type ParameterRow = {
  code: string;
  name: string;
  printName: string;
  unit: string;
  status: boolean;
};

type ParameterTableProps = {
  onCountChange?: (count: number) => void;
};

const initialData: ParameterRow[] = [
  {
    code: "TN-041421",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mL",
    status: true,
  },
  {
    code: "TN-041422",
    name: "CBC",
    printName: "Comprehensive Hemogram",
    unit: "g/dL",
    status: true,
  },
  {
    code: "TN-041423",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "g/dL",
    status: false,
  },
  {
    code: "TN-041424",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "g/dL",
    status: false,
  },
  {
    code: "TN-041425",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "g/dL",
    status: false,
  },
  {
    code: "TN-041426",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "g/dL",
    status: false,
  },
  {
    code: "TN-041427",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mg/dL",
    status: false,
  },
  {
    code: "TN-041428",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mg/dL",
    status: false,
  },
  {
    code: "TN-041429",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mg/dL",
    status: false,
  },
  {
    code: "TN-041430",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mg/dL",
    status: false,
  },
  {
    code: "TN-041431",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mg/dL",
    status: false,
  },
  {
    code: "TN-041432",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mg/dL",
    status: false,
  },
  {
    code: "TN-041433",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mg/dL",
    status: false,
  },
  {
    code: "TN-041434",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mg/dL",
    status: false,
  },
  {
    code: "TN-041435",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mg/dL",
    status: false,
  },
  {
    code: "TN-041436",
    name: "CBC",
    printName: "Complete Blood Count",
    unit: "mg/dL",
    status: false,
  },
];

export default function ParameterTable({ onCountChange }: ParameterTableProps) {
  const [data, setData] = useState<ParameterRow[]>(initialData);

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

  const handleEdit = (row: ParameterRow) => {
    console.log("Edit:", row);
  };

  const columns: Column<ParameterRow>[] = [
    { key: "code", header: "Parameter Code", width: "14.4%" },
    { key: "name", header: "Parameter Name", width: "20%" },
    { key: "printName", header: "Parameter Print Name", width: "17.3%" },
    { key: "unit", header: "Unit", width: "5%" },
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
      width: "3.6%",
      render: (row) => (
        <button
          type="button"
          onClick={() => handleEdit(row)}
          aria-label={`Edit ${row.code}`}
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
