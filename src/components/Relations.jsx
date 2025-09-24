import React, { useState, useEffect } from "react";
import SearchableDropdown from "./SearchableDropdown";
import axios from "axios";

// Helper to render selected member info
const MemberCard = ({ member }) => {
  if (!member) return null;
  return (
    <div className="d-flex align-items-center gap-2">
      <img
        src={member.avatar || `https://i.pravatar.cc/150?u=${member._id}`}
        alt={`${member.firstName} ${member.lastName}`}
        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />
      <div>
        <div><strong>{member.firstName} {member.lastName}</strong></div>
        <div>DOB: {member.dob || "N/A"}</div>
        {member.dod && <div>DOD: {member.dod}</div>}
      </div>
    </div>
  );
};

const RelationsList = () => {
  const [relationships, setRelationships] = useState([]);
  const [filterMember, setFilterMember] = useState(null);
  const [filteredRelations, setFilteredRelations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ from: null, to: null, type: "", details: "", notes: "" });

  // Fetch all relationships
  const fetchRelationships = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/relationships`);
      setRelationships(res.data);
      setFilteredRelations(res.data);
    } catch (err) {
      console.error("Failed to fetch relationships:", err);
    }
  };

  useEffect(() => {
    fetchRelationships();
  }, []);

  // Filter relationships by selected member
  useEffect(() => {
    if (!filterMember) {
      setFilteredRelations(relationships);
    } else {
      setFilteredRelations(
        relationships.filter(
          (rel) =>
            rel.from?._id === filterMember._id || rel.to?._id === filterMember._id
        )
      );
    }
  }, [filterMember, relationships]);

  const handleEdit = (rel) => {
    setEditingId(rel._id);
    setEditFormData({
      from: rel.from,
      to: rel.to,
      type: rel.type,
      details: rel.details || "",
      notes: rel.notes || ""
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFormData({ from: null, to: null, type: "", details: "", notes: "" });
  };

  const handleSave = async (relId) => {
    if (!editFormData.from || !editFormData.to) {
      alert("From and To members are required");
      return;
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/relationships/${relId}`, {
        from: editFormData.from._id,
        to: editFormData.to._id,
        type: editFormData.type,
        details: editFormData.details,
        notes: editFormData.notes
      });
      setEditingId(null);
      fetchRelationships();
    } catch (err) {
      console.error("Failed to update:", err);
      alert("Failed to update relationship.");
    }
  };

  const handleDelete = async (relId) => {
    if (!window.confirm("Are you sure you want to delete this relationship?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/relationships/${relId}`);
      fetchRelationships();
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Failed to delete relationship.");
    }
  };

  return (
    <div className="mt-5">
      <h3 className="mb-4 text-center">All Relationships</h3>

      {/* Filter by member */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <SearchableDropdown
            onSelect={(member) => setFilterMember(member)}
            selectedValue={filterMember}
            label="Filter by Member"
          />
          {filterMember && (
            <button
              className="btn btn-sm btn-secondary mt-2"
              onClick={() => setFilterMember(null)}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>

      {/* Relationship cards */}
      <div className="row">
        {filteredRelations.length === 0 ? (
          <div className="text-center text-muted">No relationships found</div>
        ) : (
          filteredRelations.map((rel) => (
            <div key={rel._id} className="col-md-6 mb-3">
              <div className="card shadow-sm" style={{ border: "2px solid #0d6efd" }}>
                <div className="card-body d-flex align-items-center justify-content-between">
                  {/* Editable From */}
                  {editingId === rel._id ? (
                    <SearchableDropdown
                      onSelect={(user) => setEditFormData({ ...editFormData, from: user })}
                      selectedValue={editFormData.from}
                      label="From"
                    />
                  ) : (
                    <MemberCard member={rel.from} />
                  )}

                  {/* Editable Type */}
                  {editingId === rel._id ? (
                    <select
                      className="form-select w-auto mx-2"
                      value={editFormData.type}
                      onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                    >
                      <option value="parent">Parent</option>
                      <option value="spouse">Spouse</option>
                      <option value="friend">Friend</option>
                    </select>
                  ) : (
                    <div className="text-center fs-4">{rel.type}</div>
                  )}

                  {/* Editable To */}
                  {editingId === rel._id ? (
                    <SearchableDropdown
                      onSelect={(user) => setEditFormData({ ...editFormData, to: user })}
                      selectedValue={editFormData.to}
                      label="To"
                    />
                  ) : (
                    <MemberCard member={rel.to} />
                  )}
                </div>

                {/* Details & Notes */}
                {editingId === rel._id ? (
                  <div className="card-footer d-flex flex-column gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Details"
                      value={editFormData.details}
                      onChange={(e) => setEditFormData({ ...editFormData, details: e.target.value })}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Notes"
                      value={editFormData.notes}
                      onChange={(e) => setEditFormData({ ...editFormData, notes: e.target.value })}
                    />
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-success btn-sm" onClick={() => handleSave(rel._id)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancel}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  (rel.details || rel.notes) && (
                    <div className="card-footer">
                      {rel.details && <div><strong>Details:</strong> {rel.details}</div>}
                      {rel.notes && <div><strong>Notes:</strong> {rel.notes}</div>}
                    </div>
                  )
                )}

                {/* Edit/Delete buttons */}
                {editingId !== rel._id && (
                  <div className="card-footer d-flex justify-content-end gap-2">
                    <button className="btn btn-primary btn-sm" onClick={() => handleEdit(rel)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(rel._id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RelationsList;
