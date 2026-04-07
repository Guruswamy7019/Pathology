import { useState, useEffect } from "react";
import styles from "./FilterModal.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FilterValues = {
  gender: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterValues) => void;
  onClearAll?: () => void;
  initialValues?: FilterValues;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const GENDER_OPTIONS = ["", "Male", "Female", "Both"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
  onClearAll,
  initialValues = { gender: "" },
}: Props) {
  const [gender, setGender] = useState(initialValues.gender);

  // Sync local state when initialValues change (e.g. after clear)
  useEffect(() => {
    setGender(initialValues.gender);
  }, [initialValues.gender]);

  if (!isOpen) return null;

  const handleClearAll = () => {
    setGender("");
    onClearAll?.();
    onClose();
  };

  const handleApply = () => {
    onApply({ gender });
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* ── Header ────────────────────────────────────────────────── */}
        <div className={styles.header}>
          <h2 className={styles.title}>Filter By</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <line
                x1="1"
                y1="1"
                x2="11"
                y2="11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="11"
                y1="1"
                x2="1"
                y2="11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <hr className={styles.divider} />

        {/* ── Body ──────────────────────────────────────────────────── */}
        <div className={styles.body}>
          <div className={styles.fieldWrap}>
            <div className={styles.fieldBorder}>
              <span className={styles.floatLabel}>Gender</span>
              <select
                className={styles.floatSelect}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {GENDER_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o || "Select"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Footer ────────────────────────────────────────────────── */}
        <div className={styles.footer}>
          <button className={styles.clearBtn} onClick={handleClearAll}>
            Clear All
          </button>
          <button className={styles.applyBtn} onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
