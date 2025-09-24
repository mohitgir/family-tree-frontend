import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchableDropdown = ({ onSelect, selectedValue, label, debounceTime = 300 }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef();
  const debounceRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch members from API with debounce
  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3002/api/members/search?q=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, debounceTime);

    return () => clearTimeout(debounceRef.current);
  }, [searchTerm, debounceTime]);

  const handleSelect = (user) => {
    onSelect(user);
    setSearchTerm('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="card shadow-sm" style={{ border: "2px solid #0d6efd" }}>
      <div className="card-body">
        <h5 className="card-title fw-bold">{label}</h5>
        <div className="position-relative">
          <input
            type="text"
            className="form-control"
            placeholder="Search for member..."
            value={searchTerm || (selectedValue ? `${selectedValue.firstName} ${selectedValue.lastName}` : '')}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />

          {isOpen && (
            <ul className="dropdown-menu show w-100 mt-1 shadow">
              {loading ? (
                <li><span className="dropdown-item-text">Loading...</span></li>
              ) : results.length > 0 ? (
                results.map(user => (
                  <li key={user._id}>
                    <button
                      className="dropdown-item d-flex align-items-center"
                      onClick={() => handleSelect(user)}
                    >
                      <img
                        src={user.avatar || `https://i.pravatar.cc/150?u=${user._id}`}
                        alt={user.firstName}
                        className="rounded-circle me-2"
                        width="30"
                        height="30"
                      />
                      <div>
                        <div>{user.firstName} {user.lastName}</div>
                        <small className="text-muted">DOB: {user.dob}</small>
                      </div>
                    </button>
                  </li>
                ))
              ) : (
                <li><span className="dropdown-item-text">No members found</span></li>
              )}
            </ul>
          )}
        </div>

        {selectedValue && (
          <div className="mt-3 text-muted d-flex align-items-center gap-1">
            <img
              src={selectedValue.avatar || `https://i.pravatar.cc/150?u=${selectedValue._id}`}
              alt=""
              style={{ height: "20px", width: "20px", borderRadius: "100%" }}
            />
            <small>Selected: {selectedValue.firstName} {selectedValue.lastName}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;
