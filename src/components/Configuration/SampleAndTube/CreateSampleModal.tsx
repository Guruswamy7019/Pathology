import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  type: "Sample" | "Tube";
  onClose: () => void;
  onSave: (code: string, name: string) => void;
}

function CreateSampleModal({ isOpen, type, onClose, onSave }: Props) {
  const [sampleCode, setSampleCode] = useState("");
  const [sampleName, setSampleName] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(sampleCode, sampleName);
    setSampleCode("");
    setSampleName("");
    onClose();
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div style={headerContainer}>
         <span>Create New {type}</span>

          <button style={closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        {/* BODY */}
        <div style={{ paddingTop: "16px" }}>
          {/* Sample Code */}
          <div style={fieldWrapper}>
           <span style={floatingLabel}>{type} Code</span>

            <input
              type="text"
              placeholder={`Enter ${type} Code`}
              value={sampleCode}
              onChange={(e) => setSampleCode(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Sample Name */}
          <div style={fieldWrapper}>
            <span style={floatingLabel}>{type} code</span>

            <input
              type="text"
              placeholder={`Enter ${type} Code`}
              value={sampleName}
              onChange={(e) => setSampleName(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* BUTTONS */}
          <div style={buttonRow}>
            <button style={cancelButton} onClick={onClose}>
              Cancel
            </button>

            <button style={saveButton} onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateSampleModal;

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle: React.CSSProperties = {
  width: "420px",
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  padding: "0 24px 24px 24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
};


const fieldWrapper: React.CSSProperties = {
  position: "relative",
  marginTop: "22px",
};

const floatingLabel: React.CSSProperties = {
  position: "absolute",
  top: "-8px",
  left: "12px",
  backgroundColor: "#ffffff",
  padding: "0 6px",
  fontSize: "12px",
  color: "#6B7280",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: "40px",
  borderRadius: "10px",
  border: "1px solid #D1D5DB",
  padding: "0 12px",
  fontSize: "14px",
};

const buttonRow: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  marginTop: "24px",
};

const cancelButton: React.CSSProperties = {
  width: "50%",
  height: "40px",
  backgroundColor: "#E5E5E5",
  border: "none",
  borderRadius: "10px",
  fontWeight: 600,
  cursor: "pointer",
};

const saveButton: React.CSSProperties = {
  width: "50%",
  height: "40px",
  backgroundColor: "#4B4F56",
  color: "#ffffff",
  border: "none",
  borderRadius: "10px",
  fontWeight: 600,
  cursor: "pointer",
};
const headerContainer: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "18px",
  fontWeight: 600,
  padding: "16px 0",
  borderBottom: "1px solid #E5E7EB",
};

const closeButton: React.CSSProperties = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#E5E7EB",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "28px",
  textAlign: "center",
};
