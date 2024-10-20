import React, { useState } from 'react';
import axios from 'axios';

function EvaluationForm() {
  const [ruleId, setRuleId] = useState('');
  const [data, setData] = useState('{}');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/rules/evaluateRule', {
        ruleId,
        data: JSON.parse(data),
      });
      setResult(response.data.result);
    } catch (error) {
      alert(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ruleId}
        onChange={(e) => setRuleId(e.target.value)}
        placeholder="Enter Rule ID"
      />
      <textarea
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter data in JSON format"
      />
      <button type="submit">Evaluate Rule</button>
      {result !== null && <p>Result: {result ? 'True' : 'False'}</p>}
    </form>
  );
}

export default EvaluationForm;
