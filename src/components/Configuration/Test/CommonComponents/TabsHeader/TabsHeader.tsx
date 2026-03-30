import styles from "./TabsHeader.module.css";

type TabsHeaderProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function TabsHeader({
  tabs,
  activeTab,
  setActiveTab,
}: TabsHeaderProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <span
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}
