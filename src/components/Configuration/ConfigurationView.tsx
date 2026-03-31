import { useState } from "react";
import TabsHeader from "./Test/CommonComponents/TabsHeader/TabsHeader";
import PageToolbar from "./Test/CommonComponents/PageToolbar/PageToolbar";
import ParameterTable from "./Test/ParameterMaster/ParameterTable";
import CategoryTable from "./Test/CategoryMaster/CategoryTable";
import TestTable from "./Test/TestMaster/TestTable";
import TemplateTable from "./Test/TemplateMaster/TemplateTable";
import styles from "./ConfigurationView.module.css";

const tabs = ["Parameter", "Category", "Test", "Template"];

type ToolbarConfig = {
  title: (count: number) => string;
  searchPlaceholder: string;
  createLabel: string;
};

const toolbarConfig: Record<string, ToolbarConfig> = {
  Parameter: {
    title: (count) => `List of Parameters (${count})`,
    searchPlaceholder: "Search by Parameter Code / Name / Print Name / Unit",
    createLabel: "Create New Parameter",
  },
  Category: {
    title: (count) => `List of Categories (${count})`,
    searchPlaceholder: "Search by Category Code / Name",
    createLabel: "Create New Category",
  },
  Test: {
    title: (count) => `List of Tests (${count})`,
    searchPlaceholder: "Search by Test Code / Name",
    createLabel: "Create New Test",
  },
  Template: {
    title: (count) => `List of Templates (${count})`,
    searchPlaceholder: "Search by Template Code / Name",
    createLabel: "Create New Template",
  },
};

function ConfigurationView() {
  const [activeTab, setActiveTab] = useState("Parameter");
  const [dataCount, setDataCount] = useState(0);

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
          onAdd={() => console.log("add:", activeTab)}
          showFilter={activeTab === "Template"}
          onFilter={() => console.log("filter")}
        />
        {renderTable()}
      </div>
    </div>
  );
}

export default ConfigurationView;
