import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, {
  Column,
  Toggle,
  TabsHeader,
  PageToolbar,
} from "./CommonComponents/DataTable/DataTable";

import ParameterTable from "./ParameterMaster/ParameterTable";
import CategoryTable from "./CategoryMaster/CategoryTable";
import TestTable from "./TestMaster/TestTable";
import TemplateTable from "./TemplateMaster/TemplateTable";
import styles from "./Test.module.css";

const tabs = ["Parameter", "Category", "Test", "Template"];

type ToolbarConfig = {
  title: (count: number) => string;
  searchPlaceholder: string;
  createLabel: string;
  createPath: string;
};

const toolbarConfig: Record<string, ToolbarConfig> = {
  Parameter: {
    title: (count) => `List of Parameters (${count})`,
    searchPlaceholder: "Search by Parameter Code / Name / Print Name / Unit",
    createLabel: "Create New Parameter",
    createPath: "/pathology/configuration/parameter/create",
  },
  Category: {
    title: (count) => `List of Categories (${count})`,
    searchPlaceholder: "Search by Category Code / Name",
    createLabel: "Create New Category",
    createPath: "/pathology/configuration/category/create",
  },
  Test: {
    title: (count) => `List of Tests (${count})`,
    searchPlaceholder: "Search by Test Code / Name",
    createLabel: "Create New Test",
    createPath: "/pathology/configuration/test/create",
  },
  Template: {
    title: (count) => `List of Templates (${count})`,
    searchPlaceholder: "Search by Template Code / Name",
    createLabel: "Create New Template",
    createPath: "/pathology/configuration/template/create",
  },
};

function TestConfigurationView() {
  const [activeTab, setActiveTab] = useState("Parameter");
  const [dataCount, setDataCount] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (tab: string) => {
    setDataCount(0);
    setActiveTab(tab);
  };

  const renderTable = () => {
    switch (activeTab) {
      case "Parameter":
        return <ParameterTable onCountChange={setDataCount} />;
      case "Category":
        return <CategoryTable onCountChange={setDataCount} />;
      case "Test":
        return <TestTable onCountChange={setDataCount} />;
      case "Template":
        return <TemplateTable onCountChange={setDataCount} />;
      default:
        return <ParameterTable onCountChange={setDataCount} />;
    }
  };

  return (
    <div
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    >
      <div className={styles.contentContainer}>
        <TabsHeader
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />
        <PageToolbar
          title={toolbarConfig[activeTab].title(dataCount)}
          searchPlaceholder={toolbarConfig[activeTab].searchPlaceholder}
          createLabel={toolbarConfig[activeTab].createLabel}
          onSearch={(val) => console.log("search:", val)}
          onAdd={() => navigate(toolbarConfig[activeTab].createPath)}
          showFilter={activeTab === "Template"}
          onFilter={() => console.log("filter")}
        />
        {renderTable()}
      </div>
    </div>
  );
}

export default TestConfigurationView;
