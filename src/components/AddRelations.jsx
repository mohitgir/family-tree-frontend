import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchableDropdown from "./SearchableDropdown";
import axios from "axios";

const AddRelations = () => {
  const [formData, setFormData] = useState({
    from: null,
    to: null,
    type: "parent",
    notes: "",
    details: "",
  });

  const [tooltip, setTooltip] = useState("");

  // Update tooltip text dynamically
  useEffect(() => {
    if (!formData.from || !formData.to) {
      setTooltip("Select both members to save.");
    } else {
      setTooltip(
        `Connects '${formData.from.firstName} ${formData.from.lastName}' as ${formData.type} of '${formData.to.firstName} ${formData.to.lastName}'`
      );
    }
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    axios
      .post(
        process.env.REACT_APP_API_URL + "/api/relationships/add",
        {
          from: formData.from?._id,
          to: formData.to?._id,
          type: formData.type,
          notes: formData.notes,
          details: formData.details,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("Relationship saved successfully!");
        setFormData({ from: null, to: null, type: "parent", notes: "", details: "" });
      })
      .catch((err) => {
        console.error("Error saving relationship:", err);
        alert("Failed to save relationship.");
      });
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-3">
        <h1 className="display-4 p-3 d-inline-block">Add Relation</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Relation Type Selector */}
        <div className="row justify-content-center align-items-center mb-4">
          <div className="col-auto">
            <label htmlFor="type" className="col-form-label fs-4 fw-bold">
              Relation Type:
            </label>
          </div>
          <div className="col-auto">
            <select
              id="type"
              className="form-select form-select-lg"
              style={{ border: "2px solid grey" }}
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <option value="parent">Parent</option>
              <option value="spouse">Spouse</option>
              <option value="friend">Friend</option>
            </select>
          </div>
        </div>

        {/* From / To Selection */}
        <div className="row align-items-center justify-content-center mb-3">
          <div className="col-md-5">
            <SearchableDropdown
              onSelect={(user) => setFormData({ ...formData, from: user })}
              selectedValue={formData.from}
              label="From:"
            />
          </div>

          <div className="col-md-1 text-center">
            {formData.type === "parent" ? (
              <span style={{ fontSize: "3rem", color: "grey" }}>
                &#8594;
              </span>
            ) : (
              <span style={{ fontSize: "3rem", color: "grey" }}>
                &#8596;
              </span>
            )}
          </div>

          <div className="col-md-5">
            <SearchableDropdown
              onSelect={(user) => setFormData({ ...formData, to: user })}
              selectedValue={formData.to}
              label="To:"
            />
          </div>
        </div>

        {/* Details */}
        <div className="row justify-content-center mb-3">
          <div className="col-md-10">
            <label className="form-label fw-bold">Details:</label>
            <textarea
              className="form-control"
              rows="2"
              placeholder="Enter details about this relationship..."
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
            />
          </div>
        </div>

        {/* Notes */}
        <div className="row justify-content-center mb-3">
          <div className="col-md-10">
            <label className="form-label fw-bold">Notes:</label>
            <textarea
              className="form-control"
              rows="2"
              placeholder="Enter notes..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center mt-4">
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={!formData.from || !formData.to}
            title={tooltip}
          >
            Save Relation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRelations;
