import styles from "./Toggle.module.css";

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
};

export default function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.slider}></span>
    </label>
  );
}
