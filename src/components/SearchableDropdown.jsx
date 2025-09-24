import React, { useState, useEffect, useRef } from 'react';

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

  const handleClear = () => {
    onSelect(null);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (selectedValue) onSelect(null); // clear previous selection when typing
  };

  return (
    <div ref={containerRef} className="card shadow-sm mb-3" style={{ border: "2px solid grey" }}>
      <div className="card-body">
        <h5 className="card-title fw-bold">{label}</h5>
        
        {/* Input */}
        <div className="position-relative">
          <input
            type="text"
            className="form-control pe-5"
            placeholder="Search for member..."
            value={searchTerm || (selectedValue ? `${selectedValue.firstName} ${selectedValue.lastName}` : '')}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
          />

          {selectedValue && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger position-absolute top-50 end-0 translate-middle-y me-1"
              style={{ padding: '0 6px', lineHeight: 1 }}
              onClick={handleClear}
            >
              ×
            </button>
          )}
        </div>

        {/* Dropdown results */}
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
                      <small className="text-muted">DOB: {user.dob || 'N/A'}</small>
                      {user.dod && <small className="text-muted ms-2">DOD: {user.dod}</small>}
                    </div>
                  </button>
                </li>
              ))
            ) : (
              <li><span className="dropdown-item-text">No members found</span></li>
            )}
          </ul>
        )}

        {/* Selected member card (modern style) */}
        {selectedValue && (
          <div className="mt-3 border rounded p-2 bg-light d-flex align-items-center gap-3">
            <img
              src={selectedValue.avatar || `https://i.pravatar.cc/150?u=${selectedValue._id}`}
              alt=""
              className="rounded-circle"
              style={{ width: "60px", height: "60px" }}
            />
            <div>
              <div className="fw-bold">{selectedValue.firstName} {selectedValue.lastName}</div>
              <div><small>DOB: {selectedValue.dob || 'N/A'}</small></div>
              {selectedValue.dod && <div><small>DOD: {selectedValue.dod}</small></div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchableDropdown;
