import styles from "./PageToolbar.module.css";
import SearchIcon from "../../../../../assets/icons/search.png";
import AddIcon from "../../../../../assets/icons/add-square.png";

type PageToolbarProps = {
  title: string;
  searchPlaceholder?: string;
  createLabel?: string;
  onSearch?: (value: string) => void;
  onAdd?: () => void;
};

export default function PageToolbar({
  title,
  searchPlaceholder = "Search...",
  createLabel = "Create New",
  onSearch,
  onAdd,
}: PageToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <span className={styles.title}>{title}</span>

      <div className={styles.actions}>
        <div className={styles.searchWrapper}>
          <img src={SearchIcon} className={styles.searchIcon} alt="search" />
          <input
            placeholder={searchPlaceholder}
            className={styles.searchInput}
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>

        <button className={styles.createBtn} onClick={onAdd}>
          <img src={AddIcon} alt="add" className={styles.btnIcon} />
          {createLabel}
        </button>
      </div>
    </div>
  );
}
