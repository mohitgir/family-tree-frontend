import React, { useState } from "react";

const AddMember = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    gender: "male",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: send to backend API
  };
  return (
    <div className="">
      {/* <h1>Add Member Form</h1> */}

      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div
          className="card bg-secondary text-white shadow-lg p-4"
          style={{ width: "400px" }}
        >
          <h3 className="text-center mb-4">Add User</h3>
          <form onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label fw-bold">
                First Name
              </label>
              <input
                type="text"
                className="form-control bg-dark text-white border-0 border-bottom"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name */}
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label fw-bold">
                Last Name
              </label>
              <input
                type="text"
                className="form-control bg-dark text-white border-0 border-bottom"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label fw-bold">Gender</label>
              <select
                className="form-select bg-dark text-white border-0 border-bottom"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="male">♂ Male</option>
                <option value="female">♀ Female</option>
                <option value="other">⚧ Other</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-between">
              <button type="reset" className="btn btn-outline-light">
                Reset
              </button>
              <button type="submit" className="btn btn-light text-dark fw-bold">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
