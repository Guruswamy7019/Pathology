import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TabsHeader,
  PageToolbar,
} from "./CommonComponents/DataTable/DataTable";

import ParameterTable from "./ParameterMaster/ParameterTable";
import CategoryTable from "./CategoryMaster/CategoryTable";
import TestTable from "./TestMaster/TestTable";
import TemplateTable from "./TemplateMaster/TemplateTable";
import CreateCategoryModal from "./CategoryMaster/CreateCategoryModal";
import styles from "./Test.module.css";

const tabs = ["Parameter", "Category", "Test", "Template"] as const;
type TabKey = (typeof tabs)[number];

export type CategoryRow = {
  code: string;
  name: string;
  tests: number;
  status: boolean;
  testIds?: string[];
};

const initialCategoryData: CategoryRow[] = [
  {
    code: "CN-041421",
    name: "Biochemistry",
    tests: 6,
    status: false,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041422",
    name: "Biochemistry",
    tests: 6,
    status: true,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041423",
    name: "Biochemistry",
    tests: 6,
    status: true,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041424",
    name: "Biochemistry",
    tests: 6,
    status: true,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041425",
    name: "Biochemistry",
    tests: 6,
    status: true,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041426",
    name: "Biochemistry",
    tests: 6,
    status: true,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041427",
    name: "Biochemistry",
    tests: 6,
    status: true,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041428",
    name: "Biochemistry",
    tests: 6,
    status: true,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041429",
    name: "Biochemistry",
    tests: 6,
    status: false,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041430",
    name: "Biochemistry",
    tests: 6,
    status: false,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041431",
    name: "Biochemistry",
    tests: 6,
    status: false,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
  {
    code: "CN-041432",
    name: "Hematology",
    tests: 5,
    status: true,
    testIds: ["t1", "t2", "t3", "t4", "t5"],
  },
  {
    code: "CN-041433",
    name: "Microbiology",
    tests: 4,
    status: true,
    testIds: ["t1", "t2", "t3", "t4"],
  },
  {
    code: "CN-041434",
    name: "Immunology",
    tests: 3,
    status: true,
    testIds: ["t1", "t2", "t3"],
  },
  {
    code: "CN-041435",
    name: "Endocrinology",
    tests: 4,
    status: false,
    testIds: ["t1", "t2", "t3", "t4"],
  },
  {
    code: "CN-041436",
    name: "Pathology",
    tests: 5,
    status: true,
    testIds: ["t1", "t2", "t3", "t4", "t5"],
  },
  {
    code: "CN-041437",
    name: "Serology",
    tests: 3,
    status: true,
    testIds: ["t1", "t2", "t3"],
  },
  {
    code: "CN-041438",
    name: "Cytology",
    tests: 2,
    status: false,
    testIds: ["t1", "t2"],
  },
  {
    code: "CN-041439",
    name: "Histopathology",
    tests: 4,
    status: true,
    testIds: ["t1", "t2", "t3", "t4"],
  },
  {
    code: "CN-041440",
    name: "Molecular Diagnostics",
    tests: 6,
    status: true,
    testIds: ["t1", "t2", "t3", "t4", "t5", "t6"],
  },
];

type ToolbarConfig = {
  title: (count: number) => string;
  searchPlaceholder: string;
  createLabel: string;
  createPath: string;
};

const toolbarConfig: Record<TabKey, ToolbarConfig> = {
  Parameter: {
    title: (count) => `List of Parameters (${count})`,
    searchPlaceholder: "Search by Parameter Code / Name / Print Name / Unit",
    createLabel: "Create New Parameter",
    createPath: "/pathology/configuration/test/parameter/create",
  },
  Category: {
    title: (count) => `List of Categories (${count})`,
    searchPlaceholder: "Search by Category Code / Name",
    createLabel: "Create New Category",
    createPath: "",
  },
  Test: {
    title: (count) => `List of Tests (${count})`,
    searchPlaceholder: "Search by Test Code / Name",
    createLabel: "Create New Test",
    createPath: "/pathology/configuration/test/test/create",
  },
  Template: {
    title: (count) => `List of Templates (${count})`,
    searchPlaceholder: "Search by Template Code / Name",
    createLabel: "Create New Template",
    createPath: "/pathology/configuration/test/template/create",
  },
};

function TestConfigurationView() {
  const [activeTab, setActiveTab] = useState<TabKey>("Parameter");
  const [dataCount, setDataCount] = useState(0);
  const [isTemplateFilterOpen, setIsTemplateFilterOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryRow | null>(
    null,
  );
  const [categoryData, setCategoryData] =
    useState<CategoryRow[]>(initialCategoryData);

  const [searchByTab, setSearchByTab] = useState<Record<TabKey, string>>({
    Parameter: "",
    Category: "",
    Test: "",
    Template: "",
  });

  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab as TabKey);
    setIsTemplateFilterOpen(false);
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleAdd = () => {
    if (activeTab === "Category") {
      setEditingCategory(null);
      setIsCategoryModalOpen(true);
      return;
    }

    navigate(toolbarConfig[activeTab].createPath);
  };

  const currentSearchText = searchByTab[activeTab];

  const renderTable = () => {
    switch (activeTab) {
      case "Parameter":
        return (
          <ParameterTable
            onCountChange={setDataCount}
            searchText={currentSearchText}
            onEdit={(row) =>
              navigate("/pathology/configuration/test/parameter/create", {
                state: {
                  mode: "edit",
                  parameterData: row,
                },
              })
            }
          />
        );

      case "Category":
        return (
          <CategoryTable
            data={categoryData}
            setData={setCategoryData}
            onCountChange={setDataCount}
            searchText={currentSearchText}
            onEdit={(row) => {
              setEditingCategory(row);
              setIsCategoryModalOpen(true);
            }}
          />
        );

      case "Test":
        return (
          <TestTable
            onCountChange={setDataCount}
            searchText={currentSearchText}
            onEdit={(row) =>
              navigate("/pathology/configuration/test/test/create", {
                state: {
                  mode: "edit",
                  testData: row,
                },
              })
            }
          />
        );

      case "Template":
        return (
          <TemplateTable
            onCountChange={setDataCount}
            searchText={currentSearchText}
            filterOpen={isTemplateFilterOpen}
            onFilterClose={() => setIsTemplateFilterOpen(false)}
            onEdit={(row) =>
              navigate("/pathology/configuration/test/template/create", {
                state: {
                  mode: "edit",
                  templateData: row,
                },
              })
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    >
      <div className={styles.contentContainer}>
        <TabsHeader
          tabs={[...tabs]}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />

        <PageToolbar
          title={toolbarConfig[activeTab].title(dataCount)}
          searchPlaceholder={toolbarConfig[activeTab].searchPlaceholder}
          searchValue={searchByTab[activeTab]}
          createLabel={toolbarConfig[activeTab].createLabel}
          onSearch={(val: string) =>
            setSearchByTab((prev) => ({
              ...prev,
              [activeTab]: val,
            }))
          }
          onAdd={handleAdd}
          showFilter={activeTab === "Template"}
          onFilter={() => setIsTemplateFilterOpen(true)}
        />

        {renderTable()}

        <CreateCategoryModal
          isOpen={isCategoryModalOpen}
          onClose={() => {
            setIsCategoryModalOpen(false);
            setEditingCategory(null);
          }}
          existingCodes={categoryData.map((item) => item.code)}
          initialData={
            editingCategory
              ? {
                  code: editingCategory.code,
                  name: editingCategory.name,
                  testIds: editingCategory.testIds ?? [],
                }
              : undefined
          }
          onSave={(formData) => {
            if (editingCategory) {
              setCategoryData((prev) =>
                prev.map((item) =>
                  item.code === editingCategory.code
                    ? {
                        ...item,
                        code: formData.categoryCode,
                        name: formData.categoryName,
                        tests: formData.testIds.length,
                        testIds: formData.testIds,
                      }
                    : item,
                ),
              );
            } else {
              const newCategory: CategoryRow = {
                code: formData.categoryCode,
                name: formData.categoryName,
                tests: formData.testIds.length,
                status: true,
                testIds: formData.testIds,
              };

              setCategoryData((prev) => [newCategory, ...prev]);
            }

            setIsCategoryModalOpen(false);
            setEditingCategory(null);
          }}
        />
      </div>
    </div>
  );
}

export default TestConfigurationView;
