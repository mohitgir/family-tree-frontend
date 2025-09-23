import React, { useState } from "react";

const AddRelations = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    type: "spouse",
    isBidirectional: true,
  });

  const users = [
    { _id: "68ccfd3b2fe4751e701754c1", name: "John Doe" },
    { _id: "68ccfd3b2fe4751e701754c2", name: "Jane Doe" },
    { _id: "68ccfd3b2fe4751e701754c3", name: "Mike Smith" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Relation Submitted:", formData);
    // TODO: send to backend API
  };
  return <div>

     <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
      <div className="card bg-secondary text-white shadow-lg p-4" style={{ width: "480px" }}>
        <h3 className="text-center mb-4">Add Relation</h3>
        <form onSubmit={handleSubmit}>
          {/* From */}
          <div className="mb-3">
            <label htmlFor="from" className="form-label fw-bold">From</label>
            <select
              id="from"
              name="from"
              className="form-select bg-dark text-white border-0 border-bottom"
              value={formData.from}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Person --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* To */}
          <div className="mb-3">
            <label htmlFor="to" className="form-label fw-bold">To</label>
            <select
              id="to"
              name="to"
              className="form-select bg-dark text-white border-0 border-bottom"
              value={formData.to}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Relative --</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Relation Type */}
          <div className="mb-3">
            <label htmlFor="type" className="form-label fw-bold">Relation Type</label>
            <select
              id="type"
              name="type"
              className="form-select bg-dark text-white border-0 border-bottom"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="spouse">Spouse</option>
              <option value="parent">Parent</option>
              <option value="child">Child</option>
              <option value="sibling">Sibling</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* isBidirectional */}
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="isBidirectional"
              name="isBidirectional"
              checked={formData.isBidirectional}
              onChange={handleChange}
            />
            <label className="form-check-label fw-bold" htmlFor="isBidirectional">
              Bidirectional
            </label>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-between">
            <button type="reset" className="btn btn-outline-light">
              Reset
            </button>
            <button type="submit" className="btn btn-light text-dark fw-bold">
              Save Relation
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>;
};

export default AddRelations;
