import React, { useState } from 'react';

const FormComponent = ({ title, fields, onSubmit }) => {
  const [formState, setFormState] = useState(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <div className="form-component">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="input-group" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === 'number' ? (
              <input
                type="number"
                id={field.name}
                name={field.name}
                value={formState[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="form-input"
              />
            ) : (
              <select
                id={field.name}
                name={field.name}
                value={formState[field.name]}
                onChange={handleChange}
                className="form-select"
              >
                <option value="" disabled>Select {field.label.toLowerCase()}</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button className="carbon-button" type="submit">Calculate</button>
      </form>
    </div>
  );
};

export default FormComponent;
