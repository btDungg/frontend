import React, { useState } from 'react';

interface SearchRegistrationProps {
  onSubmit: (regNumber: string) => Promise<void>;
}

const SearchRegistration: React.FC<SearchRegistrationProps> = ({ onSubmit }) => {
  const [regNumber, setRegNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!regNumber.trim()) {
      setError('Registration number is required.');
      return;
    }

    if (isNaN(Number(regNumber))) {
      setError('Registration number must be a valid number.');
      return;
    }

    setError(null);
    onSubmit(regNumber); 
  };

  return (
    <div className="user-registration">
      <h1>User Registration</h1>
      <div className="registration-form">
        <input
          type="text"
          placeholder="Enter registration number"
          className="input-field"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
        />
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SearchRegistration;
