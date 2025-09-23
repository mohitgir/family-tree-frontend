import axios from "axios";
import React, { useState } from "react";

const AddMember = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    dod: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/api/member/add",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res.data);

      if (res.data && res.data.success) {
        alert("Member created.");
        setFormData({
          firstName: "",
          lastName: "",
          gender: "",
          dob: "",
          dod: "",
          photo: null,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="">
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

            {/* Date of Birth */}
            <div className="mb-3">
              <label htmlFor="dob" className="form-label fw-bold">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control bg-dark text-white border-0 border-bottom"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            {/* Date of Death */}
            <div className="mb-3">
              <label htmlFor="dod" className="form-label fw-bold">
                Date of Death
              </label>
              <input
                type="date"
                className="form-control bg-dark text-white border-0 border-bottom"
                id="dod"
                name="dod"
                value={formData.dod}
                onChange={handleChange}
              />
            </div>

            {/* Photo */}
            <div className="mb-3">
              <label htmlFor="photo" className="form-label fw-bold">
                Photo
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control bg-dark text-white border-0 border-bottom"
                id="photo"
                name="photo"
                onChange={handleChange}
              />
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
