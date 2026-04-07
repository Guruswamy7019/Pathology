import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./CreateTemplatePage.module.css";
import CloseCircleIcon from "../../../../assets/icons/close-circle.svg";
import BackIcon from "../../../../assets/icons/back_icon.svg";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  templateCode: string;
  templateName: string;
  gender: string;
  pathologist: string;
};

type PathologistItem = { id: string; name: string };

type TemplateEditData = {
  code: string;
  name: string;
  noOfPathologists: number;
  gender: string;
  status: boolean;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const GENDER_OPTIONS = ["Both", "Male", "Female"];

const ALL_PATHOLOGISTS: PathologistItem[] = [
  { id: "ph1", name: "Alex Carry" },
  { id: "ph2", name: "Emma Watson" },
  { id: "ph3", name: "Dr. Rajan Mehta" },
  { id: "ph4", name: "Dr. Priya Nair" },
];

const FONT_FAMILIES = [
  "Nunito",
  "Montserrat",
  "Georgia",
  "Courier New",
  "Arial",
];

const DEFAULT_CONTENT = `<p><strong>RESULTS:</strong></p>
<p><strong>AZFa Region:</strong><br/>STS markers (SRY, SY84, SY86) were analyzed. No deletion detected.</p>
<p><strong>AZFb Region:</strong><br/>STS markers (SY127, SY134) were analyzed. No deletion detected.</p>
<p><strong>AZFc Region:</strong><br/>STS markers (SY254, SY255) were analyzed. Partial deletion observed.</p>
<p><strong>AZFd Region:</strong><br/>STS marker (SY157) analyzed. No deletion detected.</p>
<p><strong>INTERPRETATION:</strong></p>
<p>The Y chromosome contains critical regions (AZFa, AZFb, AZFc, AZFd) responsible for spermatogenesis.</p>
<p>No deletions were detected in AZFa, AZFb, and AZFd regions.</p>
<p>A partial deletion in the AZFc region is identified, which may be associated with impaired sperm production and infertility.</p>`;

// ─── Floating-label helpers ───────────────────────────────────────────────────

function FloatInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className={styles.formGroup}>
      <div className={styles.fieldBorder}>
        <span className={styles.floatLabel}>{label}</span>
        <input
          className={styles.floatInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function FloatSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className={styles.formGroup}>
      <div className={styles.fieldBorder}>
        <span className={styles.floatLabel}>{label}</span>
        <select
          className={styles.floatSelect}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

function PathologistDropdown({
  label,
  options,
  selectedIds,
  onToggle,
}: {
  label: string;
  options: PathologistItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={styles.formGroup}
      ref={ref}
      style={{ position: "relative" }}
    >
      <div
        className={styles.fieldBorder}
        onClick={() => setOpen((o) => !o)}
        style={{ cursor: "pointer" }}
      >
        <span className={styles.floatLabel}>{label}</span>
        <div className={styles.pathologistTrigger}>
          <span className={styles.pathologistPlaceholder}>
            Select Pathologist
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path fill="#9e9e9e" d="M6 8L1 3h10z" />
          </svg>
        </div>
      </div>
      {open && (
        <>
          <div
            className={styles.dropdownBackdrop}
            onClick={() => setOpen(false)}
          />
          <div className={styles.dropdownPanel}>
            {options.map((item, idx) => (
              <div key={item.id}>
                <div
                  className={styles.dropdownRow}
                  onClick={() => {
                    onToggle(item.id);
                  }}
                >
                  <span
                    className={
                      selectedIds.includes(item.id)
                        ? styles.roundCheckOn
                        : styles.roundCheckOff
                    }
                  >
                    {selectedIds.includes(item.id) && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <polyline
                          points="2,6 5,9 10,3"
                          stroke="#4CAF50"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className={styles.dropdownRowLabel}>{item.name}</span>
                </div>
                {idx < options.length - 1 && (
                  <div className={styles.dropdownDivider} />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function ToolbarBtn({
  title,
  onClick,
  active,
  children,
}: {
  title: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      className={
        active
          ? `${styles.toolbarBtn} ${styles.toolbarBtnActive}`
          : styles.toolbarBtn
      }
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CreateTemplatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state?.templateData as TemplateEditData | undefined;
  const isEditMode = location.state?.mode === "edit";

  const [form, setForm] = useState<FormState>({
    templateCode: editData?.code ?? "",
    templateName: editData?.name ?? "",
    gender: editData?.gender ?? "Both",
    pathologist: "",
  });

  const [selectedPathIds, setSelectedPathIds] = useState<string[]>([
    "ph1",
    "ph2",
  ]);
  const [fontFamily, setFontFamily] = useState("Nunito");
  const [fontSize, setFontSize] = useState("13");

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML.trim()) {
      editorRef.current.innerHTML = DEFAULT_CONTENT;
    }
  }, []);

  const set = (field: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const togglePathologist = (id: string) =>
    setSelectedPathIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const removePathologist = (id: string) =>
    setSelectedPathIds((prev) => prev.filter((x) => x !== id));

  const selectedPathologists = ALL_PATHOLOGISTS.filter((p) =>
    selectedPathIds.includes(p.id),
  );

  const exec = useCallback((cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  }, []);

  const loadTemplate = (tag: string) => {
    if (!editorRef.current) return;
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const el = document.createElement(tag === "T" ? "p" : tag.toLowerCase());
    el.innerHTML = tag === "T" ? "Text block" : `${tag} Heading`;
    range.deleteContents();
    range.insertNode(el);
    range.setStartAfter(el);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    editorRef.current.focus();
  };

  const applyStyleToSelection = useCallback(
    (property: "fontFamily" | "fontSize", value: string) => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;

      const range = sel.getRangeAt(0);
      const span = document.createElement("span");
      span.style[property] = value;

      try {
        range.surroundContents(span);
      } catch {
        const fragment = range.extractContents();
        span.appendChild(fragment);
        range.insertNode(span);
      }

      sel.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNodeContents(span);
      sel.addRange(newRange);
      editorRef.current?.focus();
    },
    [],
  );

  const handleFontFamily = (v: string) => {
    setFontFamily(v);
    applyStyleToSelection("fontFamily", v);
  };

  const handleFontSize = (v: string) => {
    setFontSize(v);
    applyStyleToSelection("fontSize", `${v}px`);
  };

  const handleSave = () => {
    if (isEditMode) {
      console.log("UPDATE TEMPLATE:", {
        form,
        selectedPathIds,
        content: editorRef.current?.innerHTML,
      });
    } else {
      console.log("CREATE TEMPLATE:", {
        form,
        selectedPathIds,
        content: editorRef.current?.innerHTML,
      });
    }
    navigate("/pathology/configuration/test");
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate(-1)}
          >
            <img src={BackIcon} alt="back" className={styles.backIcon} />
          </button>
          <h2 className={styles.pageTitle}>
            {isEditMode ? "Edit Template" : "Create New Template"}
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Basic Details</p>

            <div className={styles.formGrid}>
              <FloatInput
                label="Template Code"
                value={form.templateCode}
                onChange={(v) => set("templateCode", v)}
              />
              <FloatInput
                label="Template Name"
                value={form.templateName}
                onChange={(v) => set("templateName", v)}
              />
              <FloatSelect
                label="Gender"
                value={form.gender}
                options={GENDER_OPTIONS}
                onChange={(v) => set("gender", v)}
              />
              <PathologistDropdown
                label="Pathologist"
                options={ALL_PATHOLOGISTS}
                selectedIds={selectedPathIds}
                onToggle={togglePathologist}
              />
            </div>

            {selectedPathologists.length > 0 && (
              <div className={styles.chipsRow}>
                {selectedPathologists.map((p) => (
                  <span key={p.id} className={styles.chip}>
                    {p.name}
                    <button
                      type="button"
                      className={styles.chipRemove}
                      onClick={() => removePathologist(p.id)}
                    >
                      <img
                        src={CloseCircleIcon}
                        alt="remove"
                        width={16}
                        height={16}
                      />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className={styles.section}>
            <hr className={styles.sectionDivider} />
            <p className={styles.sectionTitle}>Template Format</p>

            <div className={styles.editorCard}>
              <div className={styles.toolbarWrapper}>
                <div className={styles.toolbarGroup}>
                  <span className={styles.toolbarGroupLabel}>
                    Load Template
                  </span>
                  <div className={styles.toolbarGroupBtns}>
                    {["H1", "H2", "H3", "SH1", "SH2", "SH3", "T"].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className={styles.loadBtn}
                        onClick={() => loadTemplate(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.toolbarSep} />

                <div className={styles.toolbarGroup}>
                  <span className={styles.toolbarGroupLabel}>
                    Custom Options
                  </span>
                  <div className={styles.toolbarGroupBtns}>
                    <ToolbarBtn title="Undo" onClick={() => exec("undo")}>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15a9 9 0 1 0 .49-3.6" />
                      </svg>
                    </ToolbarBtn>
                    <ToolbarBtn title="Redo" onClick={() => exec("redo")}>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="23 4 23 10 17 10" />
                        <path d="M20.49 15a9 9 0 1 1-.49-3.6" />
                      </svg>
                    </ToolbarBtn>

                    <div className={styles.toolbarDivider} />

                    <select
                      className={styles.toolbarSelect}
                      value={fontFamily}
                      onChange={(e) => handleFontFamily(e.target.value)}
                    >
                      {FONT_FAMILIES.map((f) => (
                        <option key={f}>{f}</option>
                      ))}
                    </select>

                    <div className={styles.fontSizeControl}>
                      <button
                        type="button"
                        className={styles.fontSizeBtn}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          const next = String(
                            Math.max(8, parseInt(fontSize, 10) - 1),
                          );
                          handleFontSize(next);
                        }}
                      >
                        −
                      </button>
                      <span className={styles.fontSizeValue}>{fontSize}</span>
                      <button
                        type="button"
                        className={styles.fontSizeBtn}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          const next = String(
                            Math.min(72, parseInt(fontSize, 10) + 1),
                          );
                          handleFontSize(next);
                        }}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.toolbarDivider} />

                    <ToolbarBtn title="Bold" onClick={() => exec("bold")}>
                      <strong style={{ fontSize: "0.9em" }}>B</strong>
                    </ToolbarBtn>
                    <ToolbarBtn title="Italic" onClick={() => exec("italic")}>
                      <em style={{ fontSize: "0.9em" }}>I</em>
                    </ToolbarBtn>
                    <ToolbarBtn
                      title="Underline"
                      onClick={() => exec("underline")}
                    >
                      <span
                        style={{
                          textDecoration: "underline",
                          fontSize: "0.9em",
                        }}
                      >
                        U
                      </span>
                    </ToolbarBtn>

                    <div className={styles.colorPickerWrap} title="Text Color">
                      <span style={{ fontSize: "0.85em", fontWeight: 700 }}>
                        A
                      </span>
                      <input
                        type="color"
                        className={styles.colorPicker}
                        onChange={(e) => exec("foreColor", e.target.value)}
                      />
                    </div>

                    <div className={styles.toolbarDivider} />

                    <ToolbarBtn
                      title="Align Left"
                      onClick={() => exec("justifyLeft")}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="17" y1="10" x2="3" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="17" y1="18" x2="3" y2="18" />
                      </svg>
                    </ToolbarBtn>
                    <ToolbarBtn
                      title="Align Center"
                      onClick={() => exec("justifyCenter")}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="18" y1="10" x2="6" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="18" y1="18" x2="6" y2="18" />
                      </svg>
                    </ToolbarBtn>
                    <ToolbarBtn
                      title="Align Right"
                      onClick={() => exec("justifyRight")}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="21" y1="10" x2="7" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="21" y1="18" x2="7" y2="18" />
                      </svg>
                    </ToolbarBtn>

                    <div className={styles.toolbarDivider} />

                    <ToolbarBtn
                      title="Bullet List"
                      onClick={() => exec("insertUnorderedList")}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="9" y1="6" x2="20" y2="6" />
                        <line x1="9" y1="12" x2="20" y2="12" />
                        <line x1="9" y1="18" x2="20" y2="18" />
                        <circle cx="4" cy="6" r="1" fill="currentColor" />
                        <circle cx="4" cy="12" r="1" fill="currentColor" />
                        <circle cx="4" cy="18" r="1" fill="currentColor" />
                      </svg>
                    </ToolbarBtn>
                    <ToolbarBtn
                      title="Numbered List"
                      onClick={() => exec("insertOrderedList")}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="10" y1="6" x2="21" y2="6" />
                        <line x1="10" y1="12" x2="21" y2="12" />
                        <line x1="10" y1="18" x2="21" y2="18" />
                        <path d="M4 6h1v4" />
                        <path d="M4 10h2" />
                        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                      </svg>
                    </ToolbarBtn>

                    <ToolbarBtn title="Outdent" onClick={() => exec("outdent")}>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="21" y1="10" x2="3" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="21" y1="18" x2="3" y2="18" />
                        <polyline points="7 8 3 12 7 16" />
                      </svg>
                    </ToolbarBtn>
                    <ToolbarBtn title="Indent" onClick={() => exec("indent")}>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <line x1="21" y1="10" x2="3" y2="10" />
                        <line x1="21" y1="6" x2="3" y2="6" />
                        <line x1="21" y1="14" x2="3" y2="14" />
                        <line x1="21" y1="18" x2="3" y2="18" />
                        <polyline points="3 8 7 12 3 16" />
                      </svg>
                    </ToolbarBtn>

                    <ToolbarBtn
                      title="Blockquote"
                      onClick={() => exec("formatBlock", "blockquote")}
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                      </svg>
                    </ToolbarBtn>

                    <ToolbarBtn
                      title="Strikethrough"
                      onClick={() => exec("strikeThrough")}
                    >
                      <span
                        style={{
                          textDecoration: "line-through",
                          fontSize: "0.9em",
                        }}
                      >
                        S
                      </span>
                    </ToolbarBtn>
                  </div>
                </div>
              </div>

              <div
                ref={editorRef}
                className={styles.editor}
                contentEditable
                suppressContentEditableWarning
              />
            </div>
          </div>
        </div>

        <div className={styles.footerActions}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="button" className={styles.saveBtn} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
