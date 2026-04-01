import styles from "./TextInput.module.css";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

export default function TextInput({
  label,
  value,
  onChange,
  type = "text",
}: Props) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    </div>
  );
}
