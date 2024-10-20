import React, { useState } from 'react';
import axios from 'axios';

function RuleForm() {
  const [rule, setRule] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/rules/createRule', { rule });
      alert(`Rule created with ID: ${response.data.ruleId}`);
    } catch (error) {
      alert(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        placeholder="Enter rule"
      />
      <button type="submit">Create Rule</button>
    </form>
  );
}

export default RuleForm;
