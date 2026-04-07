import { useState, useEffect, useMemo } from "react";
import DataTable, {
  Column,
  Toggle,
} from "../CommonComponents/DataTable/DataTable";
import EditIcon from "../../../../assets/icons/edit.svg";
import FilterModal, { FilterValues } from "./FilterModal";

type TemplateRow = {
  code: string;
  name: string;
  noOfPathologists: number;
  gender: string;
  status: boolean;
};

type TemplateTableProps = {
  onCountChange?: (count: number) => void;
  filterOpen?: boolean;
  onFilterClose?: () => void;
  searchText?: string;
  onEdit: (row: TemplateRow) => void;
};

const initialData: TemplateRow[] = [
  {
    code: "TN-041421",
    name: "Culture & Sensitivity growth",
    noOfPathologists: 5,
    gender: "Female",
    status: false,
  },
  {
    code: "TN-041423",
    name: "Culture & Sensitivity no growth",
    noOfPathologists: 4,
    gender: "Male",
    status: true,
  },
  {
    code: "TN-041427",
    name: "Microbial Analysis Report Template",
    noOfPathologists: 4,
    gender: "Both",
    status: true,
  },
  {
    code: "TN-041438",
    name: "Pathogen Sensitivity Report Template",
    noOfPathologists: 4,
    gender: "Female",
    status: true,
  },
  {
    code: "TN-041445",
    name: "Infection Culture Report Template",
    noOfPathologists: 4,
    gender: "Female",
    status: true,
  },
  {
    code: "TN-041452",
    name: "Bacterial Growth Assessment Template",
    noOfPathologists: 4,
    gender: "Female",
    status: true,
  },
  {
    code: "TN-041460",
    name: "Culture Sensitivity Evaluation Template",
    noOfPathologists: 4,
    gender: "Female",
    status: true,
  },
  {
    code: "TN-041472",
    name: "Pathology Culture Report Template",
    noOfPathologists: 4,
    gender: "Female",
    status: true,
  },
  {
    code: "TN-041481",
    name: "Microbial Sensitivity Analysis Template",
    noOfPathologists: 4,
    gender: "Female",
    status: false,
  },
  {
    code: "TN-041493",
    name: "Infectious Agent Culture Report Template",
    noOfPathologists: 4,
    gender: "Female",
    status: false,
  },
  {
    code: "TN-041505",
    name: "Bacterial Sensitivity Testing Template",
    noOfPathologists: 4,
    gender: "Female",
    status: false,
  },
  {
    code: "TN-041517",
    name: "General Pathology Summary Template",
    noOfPathologists: 3,
    gender: "Male",
    status: true,
  },
  {
    code: "TN-041529",
    name: "Histopathology Basic Template",
    noOfPathologists: 2,
    gender: "Both",
    status: true,
  },
  {
    code: "TN-041541",
    name: "Cytology Screening Template",
    noOfPathologists: 3,
    gender: "Female",
    status: false,
  },
  {
    code: "TN-041553",
    name: "Advanced Microbiology Template",
    noOfPathologists: 5,
    gender: "Male",
    status: true,
  },
  {
    code: "TN-041565",
    name: "Hormonal Panel Template",
    noOfPathologists: 2,
    gender: "Female",
    status: true,
  },
  {
    code: "TN-041577",
    name: "Routine Blood Work Template",
    noOfPathologists: 3,
    gender: "Both",
    status: false,
  },
  {
    code: "TN-041589",
    name: "Urine Microscopy Template",
    noOfPathologists: 2,
    gender: "Female",
    status: true,
  },
  {
    code: "TN-041601",
    name: "Fertility Panel Report Template",
    noOfPathologists: 4,
    gender: "Male",
    status: true,
  },
  {
    code: "TN-041613",
    name: "Detailed Infection Study Template",
    noOfPathologists: 5,
    gender: "Both",
    status: false,
  },
];

export default function TemplateTable({
  onCountChange,
  filterOpen = false,
  onFilterClose,
  searchText = "",
  onEdit,
}: TemplateTableProps) {
  const [allData, setAllData] = useState<TemplateRow[]>(initialData);
  const [activeFilters, setActiveFilters] = useState<FilterValues>({
    gender: "",
  });

  const filteredData = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    return allData.filter((row) => {
      const matchesSearch =
        !query ||
        row.code.toLowerCase().includes(query) ||
        row.name.toLowerCase().includes(query);

      const matchesGender =
        !activeFilters.gender || row.gender === activeFilters.gender;

      return matchesSearch && matchesGender;
    });
  }, [allData, activeFilters, searchText]);

  useEffect(() => {
    onCountChange?.(filteredData.length);
  }, [filteredData, onCountChange]);

  const handleToggle = (code: string) => {
    setAllData((prev) =>
      prev.map((item) =>
        item.code === code ? { ...item, status: !item.status } : item,
      ),
    );
  };

  const handleApplyFilters = (filters: FilterValues) => {
    setActiveFilters(filters);
  };

  const handleClearFilters = () => {
    setActiveFilters({ gender: "" });
  };

  const columns: Column<TemplateRow>[] = [
    { key: "code", header: "Template Code", width: "14%" },
    { key: "name", header: "Template Name", width: "30%" },
    { key: "noOfPathologists", header: "No. of Pathologist", width: "16%" },
    { key: "gender", header: "Gender", width: "12%" },
    {
      key: "status",
      header: "Status",
      align: "right",
      width: "14%",
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
          }}
        >
          <img src={EditIcon} alt="edit" width={18} height={18} />
        </button>
      ),
    },
  ];

  return (
    <>
      <DataTable columns={columns} data={filteredData} />

      <FilterModal
        isOpen={filterOpen}
        onClose={() => onFilterClose?.()}
        onApply={handleApplyFilters}
        onClearAll={handleClearFilters}
        initialValues={activeFilters}
      />
    </>
  );
}
