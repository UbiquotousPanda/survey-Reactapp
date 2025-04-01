import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/submit', formData);
    setSubmittedData([...submittedData, response.data]);
    setFormData({ name: '', email: '', feedback: '' });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/surveys');
      setSubmittedData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <textarea
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          placeholder="Feedback"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Submitted Data</h2>
        <ul>
          {submittedData.map((data, index) => (
            <li key={index}>
              {data.name} ({data.email}): {data.feedback}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SurveyForm;