import { useState, useEffect, useMemo } from "react";
import EditIcon from "../../../../assets/icons/edit.svg";
import DataTable, {
  Column,
  Toggle,
} from "../CommonComponents/DataTable/DataTable";

type TestRow = {
  code: string;
  name: string;
  printName: string;
  category: string;
  noOfParameter: number;
  status: boolean;
};

type TestTableProps = {
  onCountChange?: (count: number) => void;
  searchText?: string;
  onEdit: (row: TestRow) => void;
};

const initialData: TestRow[] = [
  {
    code: "TN-041421",
    name: "CBC",
    printName: "Complete Blood Count",
    category: "Biochemistry",
    noOfParameter: 6,
    status: false,
  },
  {
    code: "TN-041423",
    name: "CBC",
    printName: "Comprehensive Hemogram",
    category: "Biochemistry",
    noOfParameter: 6,
    status: true,
  },
  {
    code: "TN-041429",
    name: "CBC",
    printName: "Full Blood Analysis",
    category: "Biochemistry",
    noOfParameter: 6,
    status: true,
  },
  {
    code: "TN-041437",
    name: "CBC",
    printName: "Complete Hematological Profile",
    category: "Biochemistry",
    noOfParameter: 6,
    status: true,
  },
  {
    code: "TN-041445",
    name: "CBC",
    printName: "Detailed Blood Examination",
    category: "Biochemistry",
    noOfParameter: 6,
    status: true,
  },
  {
    code: "TN-041452",
    name: "CBC",
    printName: "Total Blood Assessment",
    category: "Biochemistry",
    noOfParameter: 6,
    status: true,
  },
  {
    code: "TN-041460",
    name: "CBC",
    printName: "Complete Blood Evaluation",
    category: "Biochemistry",
    noOfParameter: 6,
    status: true,
  },
  {
    code: "TN-041468",
    name: "CBC",
    printName: "Blood Cell Count Overview",
    category: "Biochemistry",
    noOfParameter: 6,
    status: true,
  },
  {
    code: "TN-041476",
    name: "CBC",
    printName: "Hematology Panel",
    category: "Biochemistry",
    noOfParameter: 6,
    status: false,
  },
  {
    code: "TN-041484",
    name: "CBC",
    printName: "Blood Composition Analysis",
    category: "Biochemistry",
    noOfParameter: 6,
    status: false,
  },
  {
    code: "TN-041492",
    name: "CBC",
    printName: "Full Blood Count Report",
    category: "Biochemistry",
    noOfParameter: 6,
    status: false,
  },
  {
    code: "TN-041500",
    name: "LFT",
    printName: "Liver Function Test",
    category: "Biochemistry",
    noOfParameter: 8,
    status: true,
  },
  {
    code: "TN-041508",
    name: "RFT",
    printName: "Renal Function Test",
    category: "Biochemistry",
    noOfParameter: 7,
    status: true,
  },
  {
    code: "TN-041516",
    name: "TFT",
    printName: "Thyroid Function Test",
    category: "Immunology",
    noOfParameter: 5,
    status: true,
  },
  {
    code: "TN-041524",
    name: "Lipid",
    printName: "Lipid Profile",
    category: "Biochemistry",
    noOfParameter: 6,
    status: false,
  },
  {
    code: "TN-041532",
    name: "HbA1c",
    printName: "Glycated Hemoglobin",
    category: "Biochemistry",
    noOfParameter: 3,
    status: true,
  },
  {
    code: "TN-041540",
    name: "CRP",
    printName: "C-Reactive Protein",
    category: "Immunology",
    noOfParameter: 2,
    status: true,
  },
  {
    code: "TN-041548",
    name: "ESR",
    printName: "Erythrocyte Sedimentation Rate",
    category: "Hematology",
    noOfParameter: 2,
    status: false,
  },
  {
    code: "TN-041556",
    name: "Urine",
    printName: "Urine Routine",
    category: "Pathology",
    noOfParameter: 5,
    status: true,
  },
  {
    code: "TN-041564",
    name: "PT",
    printName: "Prothrombin Time",
    category: "Hematology",
    noOfParameter: 3,
    status: true,
  },
];

export default function TestTable({
  onCountChange,
  searchText = "",
  onEdit,
}: TestTableProps) {
  const [data, setData] = useState<TestRow[]>(initialData);

  const filteredData = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    if (!query) return data;
    return data.filter(
      (item) =>
        item.code.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.printName.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
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

  // Figma: Code 16% | Name 10% | Print Name 24% | Category 18% | No. of Param 10% | Status 14% | Edit 8%
  const columns: Column<TestRow>[] = [
    { key: "code", header: "Test Code", width: "16%" },
    { key: "name", header: "Test Name", width: "10%" },
    { key: "printName", header: "Print Name", width: "24%" },
    { key: "category", header: "Test Category", width: "18%" },
    { key: "noOfParameter", header: "No. of Parameter", width: "30%" },
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
      width: "7%",
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
