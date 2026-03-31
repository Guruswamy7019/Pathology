import { useState, useEffect } from "react";
import DataTable, {
  Column,
  Toggle,
} from "../CommonComponents/DataTable/DataTable";
import EditIcon from "../../../../assets/icons/edit.svg";

type TestRow = {
  code: string;
  name: string;
  printName: string;
  category: string;
  parameterCount: number;
  status: boolean;
};

type TestTableProps = {
  onCountChange?: (count: number) => void;
};

const initialData: TestRow[] = [
  {
    code: "TN-041421",
    name: "CBC",
    printName: "Complete Blood Count",
    category: "Biochemistry",
    parameterCount: 6,
    status: true,
  },
  {
    code: "TN-041422",
    name: "CBC",
    printName: "Comprehensive Hemogram",
    category: "Biochemistry",
    parameterCount: 6,
    status: true,
  },
  {
    code: "TN-041423",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
  {
    code: "TN-041443",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
  {
    code: "TN-046423",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
  {
    code: "TN-041023",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
  {
    code: "TN-041473",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
  {
    code: "TN-041483",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
  {
    code: "TN-041924",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
  {
    code: "TN-041925",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
  {
    code: "TN-041926",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
  {
    code: "TN-041927",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
  {
    code: "TN-041928",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    parameterCount: 6,
    status: false,
  },
];

export default function TestTable({ onCountChange }: TestTableProps) {
  const [data, setData] = useState<TestRow[]>(initialData);

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

  const columns: Column<TestRow>[] = [
    { key: "code", header: "Test Code", width: "12%" },
    { key: "name", header: "Test Name", width: "12%" },
    { key: "printName", header: "Print Name", width: "17%" },
    { key: "category", header: "Test Category", width: "18%" },
    { key: "parameterCount", header: "No. of Parameter", width: "18%" },
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
