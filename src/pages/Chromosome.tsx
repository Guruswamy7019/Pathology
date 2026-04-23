import { useState } from "react";
import "./Chromosome.css";
import { Result } from "./types";

interface Props {
  onBack: () => void;
  data?: Result;
}

const Chromosome = ({ onBack, data }: Props) => {
  const [activeTab, setActiveTab] = useState("Y Chromosome Microdeletion");
  const [showCreate, setShowCreate] = useState(false);

const [isSaved, setIsSaved] = useState(false);
  const tabs = [
    "HIV (Rapid Card)",
    "HCV (Rapid Card)",
    "(CBC) Complete Blood Count",
    "Y Chromosome Microdeletion",
  ];

  if (!data) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No Data Found</h2>
        <button onClick={onBack}>Back</button>
      </div>
    );
  }

  if (showCreate) {
  return (
    <div className="editor-container">

      
      <div className="editor-header">
        <button onClick={() => setShowCreate(false)}>←</button>
        <h2>Add Result Details</h2>
      </div>

      
      <div className="editor-toolbar">
        <div className="left-tools">
          <span>LOAD TEMPLATE</span>
          {["H1","H2","H3","SH1","SH2","SH3","T"].map(btn => (
            <button key={btn}>{btn}</button>
          ))}
        </div>

        <div className="right-tools">
          <span>Nunito</span>
          <button>B</button>
          <button>I</button>
          <button>U</button>
        </div>
      </div>

      
      <div className="editor-box">
        <h4>RESULTS:</h4>

        <p><b>AZFa Region:</b> STS markers analyzed. No deletion detected.</p>
        <p><b>AZFb Region:</b> STS markers analyzed. No deletion detected.</p>
        <p><b>AZFc Region:</b> Partial deletion observed.</p>
        <p><b>AZFc Region:</b> Partial deletion observed.</p>

<p><b>AZFc Region:</b> Partial deletion observed.</p>


        <h4>INTERPRETATION:</h4>
        <p>
          The Y chromosome contains critical regions responsible for spermatogenesis.
        </p>
      </div>

      
      <div className="editor-footer">

        <input placeholder="Suggestion Note" />
        <input placeholder="Foot Note" />

        <div className="bottom-row">
          <input placeholder="Referred By" />
          <input placeholder="Pathologist" />
        </div>

       <div className="action-buttons">
  {!isSaved ? (
    <>
      <button
        className="cancel-btn"
        onClick={() => setShowCreate(false)}
      >
        Cancel
      </button>

      <button
        className="save-btn"
        onClick={() => setIsSaved(true)}
      >
        Save
      </button>
    </>
  ) : (
    <button
      className="edit-btn"
      onClick={() => setIsSaved(false)}
    >
      Edit
    </button>
  )}
</div>
      </div>
    </div>
  );
}

  return (
    <div className="container">

      
      <div className="header">
        <button onClick={onBack}>←</button>
        <h2>Add Result Details</h2>
      </div>

      
      <div className="patient-row">
        <img src="https://i.pravatar.cc/50" />
        <div><span>Patient Name</span><p>{data.patient}</p></div>
        <div><span>Age</span><p>27 Years</p></div>
        <div><span>Sex Assigned At Birth</span><p>Female</p></div>
        <div><span>MRN</span><p>{data.details}</p></div>
        <div><span>Allergy</span><p>No</p></div>
        <div><span>SART ID</span><p>14SKG9876432</p></div>
        <div><span>Last Modified</span><p>{data.date}</p></div>
      </div>

      <div className="main">

       
        <div className="sidebar">
          <h4>PARAMETER</h4>

          {[
            "Select All",
            "HIV (Rapid Card)",
            "HCV (Rapid Card)",
            "HBsAG (Rapid Card)",
            "(CBC) Complete Blood Count",
          ].map((item, i) => (
            <label key={i}>
              <input type="checkbox" defaultChecked={i !== 0} />
              {item}
            </label>
          ))}

          <h4 style={{ marginTop: "20px" }}>TEMPLATE</h4>

          {[
            "Y Chromosome Microdeletion",
            "VDRL (Rapid Card)",
            "Blood Glucose (RBS)",
          ].map((item, i) => (
            <label key={i}>
              <input type="checkbox" defaultChecked={i === 0} />
              {item}
            </label>
          ))}

          <button className="get-test">Get Test</button>
        </div>

        
        <div className="content">

         
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? "active" : ""}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          
          <div className="toolbar">
            <div className="left-tools">
              <span>LOAD TEMPLATE</span>
              {["H1", "H2", "H3", "SH1", "SH2", "SH3", "T"].map((b) => (
                <button key={b}>{b}</button>
              ))}
            </div>

            <div className="right-tools">
              <span>Nunito</span>
              <button>B</button>
              <button>I</button>
              <button>U</button>
            </div>
          </div>

          
          <div className="create-card" onClick={() => setShowCreate(true)}>
            <h1>+</h1>
            <p>Create New</p>
          </div>

          <p className="or">OR</p>

          
          <div className="template-box">
            
            
            <div className="search-bar">
              <input value="Dr. Alex Carry" readOnly />
              <span>🔍</span>
            </div>

            <p className="template-title">
              List of Templates for Dr. Alex Carry :
            </p>

            <div className="template-list">
              <div>Y Chromosome Microdel...</div>
              <div>Karyotyping Report</div>
              <div>Male Hormone Profile</div>
              <div>Basic Semen Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chromosome;