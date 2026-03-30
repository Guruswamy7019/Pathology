<<<<<<< Updated upstream
function ConfigurationView() {
=======
import { useState } from "react";
import TabsHeader from "./test/CommonComponents/TabsHeader/TabsHeader";
import PageToolbar from "./test/CommonComponents/PageToolbar/PageToolbar";
import ParameterTable from "./test/ParameterMaster/ParameterTable";
import CategoryTable from "./test/CategoryMaster/CategoryTable";
import TestTable from "./test/TestMaster/TestTable";
import TemplateTable from "./test/TemplateMaster/TemplateTable";
import styles from "./ConfigurationView.module.css";

const tabs = ["Parameter", "Category", "Test", "Template"];

type ToolbarConfig = {
  title: string;
  searchPlaceholder: string;
  createLabel: string;
};

const toolbarConfig: Record<string, ToolbarConfig> = {
  Parameter: {
    title: "List of Parameters (9)",
    searchPlaceholder: "Search by Parameter Code / Name / Print Name / Unit",
    createLabel: "Create New Parameter",
  },
  Category: {
    title: "List of Categories (9)",
    searchPlaceholder: "Search by Category Code / Name",
    createLabel: "Create New Category",
  },
  Test: {
    title: "List of Tests (9)",
    searchPlaceholder: "Search by Test Code / Name",
    createLabel: "Create New Test",
  },
  Template: {
    title: "List of Templates (9)",
    searchPlaceholder: "Search by Template Code / Name",
    createLabel: "Create New Template",
  },
};

export default function ConfigurationView() {
  const [activeTab, setActiveTab] = useState("Parameter");

  const renderTable = () => {
    switch (activeTab) {
      case "Parameter":
        return <ParameterTable />;
      case "Category":
        return <CategoryTable />;
      case "Test":
        return <TestTable />;
      case "Template":
        return <TemplateTable />;
      default:
        return <ParameterTable />;
    }
  };

>>>>>>> Stashed changes
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={styles.contentContainer}>
        <TabsHeader
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <PageToolbar
          title={toolbarConfig[activeTab].title}
          searchPlaceholder={toolbarConfig[activeTab].searchPlaceholder}
          createLabel={toolbarConfig[activeTab].createLabel}
          onSearch={(val) => console.log("search:", val)}
          onAdd={() => console.log("add:", activeTab)}
        />
        {renderTable()}
      </div>
    </div>
  );
}

export default ConfigurationView;

