import React, { useEffect, useState } from "react";
import axios from "axios";

const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/members")
      .then((res) => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark text-white">
        <h3>Loading members...</h3>
      </div>
    );
  }

  // Placeholder images
  const placeholders = {
    male: "/assets/images/placeholders/male.png",
    female: "/assets/images/placeholders/female.png",
    other: "/assets/images/placeholders/other.png",
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-white">Family Members</h2>
      <div className="row">
        {members.map((member) => (
          <div key={member._id} className="col-md-4 col-sm-6 mb-4">
            <div className="card bg-secondary text-white shadow-lg">
              <img
                src={
                  member.photo
                    ? process.env.REACT_APP_API_URL + member.photo
                    : placeholders[member.gender] // ✅ use placeholder
                }
                alt={`${member.firstName} ${member.lastName}`}
                className="card-img-top"
                style={{ objectFit: "cover", height: "250px" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {member.firstName} {member.lastName}
                </h5>
                <p className="card-text">
                  <strong>Gender:</strong> {member.gender} <br />
                  <strong>Date of Birth:</strong>{" "}
                  {member.dob ? new Date(member.dob).toDateString() : "N/A"}{" "}
                  <br />
                  <strong>Date of Death:</strong>{" "}
                  {member.dod ? new Date(member.dod).toDateString() : "—"}
                </p>
                <a
                  href={`/member/${member._id}`}
                  className="btn btn-light btn-sm"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <div className="text-center text-white">
            <p>No members found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersList;
