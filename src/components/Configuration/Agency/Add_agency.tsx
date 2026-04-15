
import React, { useState } from "react";
import "./Add_agency.css";
import back_icon from "../../../assets/icons/back_icon.svg";

interface Props {
  onBack: () => void;
}

interface Service {
  id: number;
  name: string;
  rate: string;
}

const AddNewAgency: React.FC<Props> = ({ onBack }) => {
  const [step, setStep] = useState(1);

  
  const [agencyData, setAgencyData] = useState({
    code: "",
    name: "",
    pinCode: "",
    field1: "",
    field2: "",
    field3: "",
    contact1Name: "",
    contact1Phone: "",
    contact1Email: "",
    contact2Name: "",
    contact2Phone: "",
    contact2Email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAgencyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [clinics, setClinics] = useState([
    "Crysta IVF, Bangalore",
    "Sindh IVF, Punjab",
  ]);

  const [specializations, setSpecializations] = useState([
    "Anesthetist",
    "Andrology",
    "Antenatal",
  ]);

  const [services, setServices] = useState<Service[]>([
    { id: 1, name: "Air Culture Sensitivity - Sarjapur", rate: "421.00" },
    { id: 2, name: "Breeze Health Awareness - Green", rate: "450.00" },
  ]);

  const [search, setSearch] = useState("");

  const allServices = [
    "Air Culture Sensitivity - Sarjapur",
    "Breeze Health Awareness - Green",
    "Sky Wellness Insights - Maplewood",
    "Air Quality Awareness - Oakridge",
    "Atmosphere Health Check - Pine",
    "Air Wellness Initiative - Cedar",
  ];

  const removeTag = (type: "clinic" | "spec", index: number) => {
    if (type === "clinic") {
      setClinics(clinics.filter((_, i) => i !== index));
    } else {
      setSpecializations(specializations.filter((_, i) => i !== index));
    }
  };

  const removeService = (id: number) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const updateRate = (id: number, value: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, rate: value } : s))
    );
  };

  const filteredServices = allServices.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  );

  const addService = (name: string) => {
    const exists = services.find((s) => s.name === name);
    if (exists) return;

    setServices([
      ...services,
      {
        id: Date.now(),
        name,
        rate: "",
      },
    ]);

    setSearch("");
  };

  const handleSave = () => {
    const payload = {
      agency: agencyData,
      services: services,
    };

    console.log("FINAL DATA 👉", payload);
  };

  return (
    <div className="add-wrapper">
      <div className="top-header">
        <button className="edit-btn" onClick={onBack}>
          <img src={back_icon} alt="back" />
        </button>
        <h2>Add New Agency</h2>
      </div>

      <div className="stepper">
        <div className={`step ${step === 1 ? "active" : ""}`}>
          1 Agency Details
        </div>
        <div className={`step ${step === 2 ? "active" : ""}`}>
          2 Service Details
        </div>
      </div>

     
      {step === 1 && (
        <div className="form-container">
          <h4>BASIC DETAILS</h4>

          <div className="row">
            <input
              name="code"
              placeholder="Agency Code"
              value={agencyData.code}
              onChange={handleChange}
            />
            <input
              name="name"
              placeholder="Agency Name"
              value={agencyData.name}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <select name="country" onChange={handleChange}>
  <option value="">Select Country</option>
  <option value="India">India</option>
  <option value="USA">USA</option>
  <option value="UK">UK</option>
</select>

<select name="state" onChange={handleChange}>
  <option value="">Select State</option>
  <option value="Karnataka">Karnataka</option>
  <option value="Tamil Nadu">Tamil Nadu</option>
  <option value="Maharashtra">Maharashtra</option>
  <option value="Delhi">Delhi</option>
</select>

<select name="city" onChange={handleChange}>
  <option value="">Select City</option>
  <option value="Bangalore">Bangalore</option>
  <option value="Chennai">Chennai</option>
  <option value="Mumbai">Mumbai</option>
  <option value="Delhi">Delhi</option>
</select>
            <input
              name="pinCode"
              placeholder="Pin Code"
              value={agencyData.pinCode}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <input
              name="field1"
               placeholder="Address Line 1"
              value={agencyData.field1}
              onChange={handleChange}
            />
            <input
              name="field2"
               placeholder="Address Line 2"
              value={agencyData.field2}
              onChange={handleChange}
            />
            <input
              name="field3"
               placeholder="Address Line 3"
              value={agencyData.field3}
              onChange={handleChange}
            />
          </div>

          <div className="split">
            <div>
              <h4>CLINIC LINKAGE</h4>
              <input placeholder="Search & Add Clinic" />

              <div className="tags">
                {clinics.map((c, i) => (
                  <span key={i} className="tag">
                    {c}
                    <button onClick={() => removeTag("clinic", i)}>×</button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4>SPECIALIZATION DETAILS</h4>
              <input placeholder="Search & Add Parameter" />

              <div className="tags">
                {specializations.map((s, i) => (
                  <span key={i} className="tag">
                    {s}
                    <button onClick={() => removeTag("spec", i)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <h4>CONTACT DETAILS</h4>

          <div className="contact-box">
            <p>CONTACT PERSON 1</p>
            <div className="row">
              <input
                name="contact1Name"
                placeholder="Name"
                value={agencyData.contact1Name}
                onChange={handleChange}
              />
              <input
                name="contact1Phone"
                placeholder="Phone Number"
                value={agencyData.contact1Phone}
                onChange={handleChange}
              />
              <input
                name="contact1Email"
                placeholder="Email Address"
                value={agencyData.contact1Email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="contact-box">
            <p>CONTACT PERSON 2</p>
            <div className="row">
              <input
                name="contact2Name"
                placeholder="Name"
                value={agencyData.contact2Name}
                onChange={handleChange}
              />
              <input
                name="contact2Phone"
                placeholder="Phone Number"
                value={agencyData.contact2Phone}
                onChange={handleChange}
              />
              <input
                name="contact2Email"
                placeholder="Email Address"
                value={agencyData.contact2Email}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )}

      
      {step === 2 && (
        <div className="service-container">
          <div className="service-header">
            <div>
              <span>
                Agency Code: <b>{agencyData.code || "-"}</b>
              </span>
              <span>
                Agency Name: <b>{agencyData.name || "-"}</b>
              </span>
            </div>

            <div className="search-wrapper">
              <input
                className="search"
                placeholder="Search & Add Service"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <div className="dropdown">
                  {filteredServices.map((item, i) => (
                    <div
                      key={i}
                      className="dropdown-item"
                      onClick={() => addService(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <h4>SERVICE LIST ({services.length})</h4>

          <div className="service-grid">
            {services.map((s) => (
              <div key={s.id} className="service-card">
                <button
                  className="remove-btn"
                  onClick={() => removeService(s.id)}
                >
                  ×
                </button>

                <div className="field">
                  <label>Service Name</label>
                  <select value={s.name}>
                    <option>{s.name}</option>
                  </select>
                </div>

                <div className="field">
                  <label>Rate ($)</label>
                  <input
                    value={s.rate}
                    onChange={(e) => updateRate(s.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="footer">
        <button className="cancel" onClick={onBack}>
          Cancel
        </button>

        {step === 1 ? (
          <button className="save" onClick={() => setStep(2)}>
            Save & Next
          </button>
        ) : (
          <button className="save" onClick={handleSave}>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default AddNewAgency;
  