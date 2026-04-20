import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import CloseCircleIcon from "../../../assets/icons/close-circle.svg";
import type { MachineParameterItem } from "./MachinemockData";

type Option = {
  id: number;
  name: string;
};

export type ParameterFormPayload = {
  code: string;
  name: string;
  linkedMachineIds: number[];
};

type ParameterCreateProps = {
  isOpen: boolean;
  mode: "create" | "edit";
  initialValue: MachineParameterItem | null;
  machineOptions: Option[];
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSave: (payload: ParameterFormPayload) => void;
};

const styles: Record<string, CSSProperties> = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(23, 26, 31, 0.36)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    zIndex: 1400,
  },
  modal: {
    width: "100%",
    maxWidth: "380px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    boxShadow: "0 16px 40px rgba(20, 24, 32, 0.18)",
    overflow: "hidden",
  },
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    borderBottom: "1px solid #e6e9ef",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    lineHeight: 1.15,
    fontWeight: 700,
    color: "#262a31",
  },
  closeButton: {
    width: "28px",
    height: "28px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "grid",
    placeItems: "center",
    padding: 0,
  },
  body: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "15px",
    color: "#6f747d",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    height: "56px",
    borderRadius: "10px",
    border: "1px solid #d7dbe3",
    padding: "0 14px",
    fontSize: "14px",
    color: "#2b3038",
    outline: "none",
  },
  selectButton: {
    width: "100%",
    minHeight: "56px",
    borderRadius: "10px",
    border: "1px solid #d7dbe3",
    backgroundColor: "#ffffff",
    padding: "0 14px",
    fontSize: "14px",
    color: "#8a909a",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    textAlign: "left",
  },
  caret: {
    width: "10px",
    height: "10px",
    borderBottom: "2px solid #2e333a",
    borderRight: "2px solid #2e333a",
    transform: "rotate(45deg)",
    marginTop: "-6px",
    flexShrink: 0,
  },
  optionsBox: {
    border: "1px solid #d7dbe3",
    borderRadius: "10px",
    overflow: "hidden",
  },
  optionSearch: {
    width: "100%",
    border: "none",
    borderBottom: "1px solid #eceff3",
    height: "44px",
    padding: "0 12px",
    fontSize: "14px",
    outline: "none",
  },
  optionsList: {
    maxHeight: "170px",
    overflowY: "auto",
  },
  option: {
    width: "100%",
    border: "none",
    borderBottom: "1px solid #f0f2f5",
    backgroundColor: "#ffffff",
    textAlign: "left",
    padding: "11px 12px",
    fontSize: "14px",
    color: "#2f343c",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },
  optionIndicator: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #d0d5dd",
    display: "grid",
    placeItems: "center",
    color: "#ffffff",
    fontSize: "12px",
    flexShrink: 0,
  },
  chips: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    height: "32px",
    padding: "0 10px",
    borderRadius: "9px",
    backgroundColor: "#f7efef",
    color: "#444a53",
    fontSize: "14px",
    fontWeight: 500,
  },
  chipRemove: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    border: "1px solid #e34a4a",
    color: "#e34a4a",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "11px",
    lineHeight: 1,
    display: "grid",
    placeItems: "center",
    padding: 0,
  },
  footer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginTop: "4px",
  },
  cancelButton: {
    border: "none",
    borderRadius: "10px",
    height: "36px",
    backgroundColor: "#efeff0",
    color: "#484d55",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
  saveButton: {
    border: "none",
    borderRadius: "10px",
    height: "36px",
    backgroundColor: "#59595b",
    color: "#ffffff",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
};

function ParameterCreate({
  isOpen,
  mode,
  initialValue,
  machineOptions,
  onClose,
  onSave,
}: ParameterCreateProps) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [selectedMachineIds, setSelectedMachineIds] = useState<number[]>([]);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (initialValue) {
      setCode(initialValue.code);
      setName(initialValue.name);
      setSelectedMachineIds(initialValue.linkedMachineIds);
    } else {
      setCode("");
      setName("");
      setSelectedMachineIds([]);
    }

    setIsPickerOpen(false);
  }, [isOpen, initialValue]);

  const filteredOptions = useMemo(() => machineOptions, [machineOptions]);

  const selectedOptions = useMemo(() => {
    const map = new Map(
      machineOptions.map((option) => [option.id, option.name]),
    );
    return selectedMachineIds
      .map((id) => ({ id, name: map.get(id) ?? "Unknown" }))
      .filter((item) => item.name !== "Unknown");
  }, [machineOptions, selectedMachineIds]);

  if (!isOpen) {
    return null;
  }

  const heading =
    mode === "create" ? "Add New Machine Parameter" : "Edit Machine Parameter";

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div style={styles.head}>
          <h2 style={styles.title}>{heading}</h2>
          <button type="button" style={styles.closeButton} onClick={onClose}>
            <img src={CloseCircleIcon} alt="Close" width={24} height={24} />
          </button>
        </div>

        <div style={styles.body}>
          <label style={styles.fieldWrap}>
            <span style={styles.label}>Machine Parameter Code</span>
            <input
              value={code}
              style={styles.input}
              onChange={(event) => setCode(event.target.value)}
              placeholder="MPN-451241"
            />
          </label>

          <label style={styles.fieldWrap}>
            <span style={styles.label}>Machine Parameter Name</span>
            <input
              value={name}
              style={styles.input}
              onChange={(event) => setName(event.target.value)}
              placeholder="ALP2L"
            />
          </label>

          <div style={styles.fieldWrap}>
            <span style={styles.label}>Link Machine</span>
            <button
              type="button"
              style={styles.selectButton}
              onClick={() => setIsPickerOpen((prev) => !prev)}
            >
              <span>
                {selectedOptions.length === 0
                  ? "Search & select machine"
                  : "Select more machines"}
              </span>
              <span style={styles.caret} />
            </button>

            {isPickerOpen && (
              <div style={styles.optionsBox}>
                <div style={styles.optionsList}>
                  {filteredOptions.length === 0 ? (
                    <button
                      type="button"
                      style={{
                        ...styles.option,
                        cursor: "default",
                        color: "#8a909a",
                      }}
                    >
                      No machine found
                    </button>
                  ) : (
                    filteredOptions.map((option) => {
                      const isSelected = selectedMachineIds.includes(option.id);

                      return (
                        <button
                          key={option.id}
                          type="button"
                          style={styles.option}
                          onClick={() => {
                            setSelectedMachineIds((prev) =>
                              isSelected
                                ? prev.filter((id) => id !== option.id)
                                : [...prev, option.id],
                            );
                          }}
                        >
                          <span>{option.name}</span>
                          <span
                            style={{
                              ...styles.optionIndicator,
                              borderColor: isSelected ? "#a8dcb7" : "#d0d5dd",
                              backgroundColor: isSelected
                                ? "#8fd3a5"
                                : "transparent",
                            }}
                          >
                            {isSelected ? "✓" : ""}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {selectedOptions.length > 0 && (
              <div style={styles.chips}>
                {selectedOptions.map((option) => (
                  <span key={option.id} style={styles.chip}>
                    {option.name}
                    <button
                      type="button"
                      style={styles.chipRemove}
                      onClick={() =>
                        setSelectedMachineIds((prev) =>
                          prev.filter((id) => id !== option.id),
                        )
                      }
                    >
                      x
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div style={styles.footer}>
            <button type="button" style={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              style={styles.saveButton}
              onClick={() => {
                if (!code.trim() || !name.trim()) {
                  return;
                }

                onSave({
                  code: code.trim(),
                  name: name.trim(),
                  linkedMachineIds: selectedMachineIds,
                });
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParameterCreate;
