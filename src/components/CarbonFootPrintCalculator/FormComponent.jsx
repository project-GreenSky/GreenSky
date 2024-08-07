import React, { useState } from "react";
import { toSpacedCase } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const FormComponent = ({ title, fields, onSubmit, loading }) => {
  const [formState, setFormState] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
  };

  return (
    <div className="min-w-[300px] max-w-[400px] grow animate-bounce-in">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div className="input-group" key={field.name}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.type === "number" ? (
              <Input
                type="number"
                id={field.name}
                name={field.name}
                value={formState[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="bg-base-200"
              />
            ) : (
              <Select
                name={field.name}
                value={formState[field.name]}
                onValueChange={(value) =>
                  handleChange({ target: { name: field.name, value } })
                }          
              >
                <SelectTrigger className="my-2 bg-base-200">
                  <SelectValue
                    placeholder={`Select ${field.label.toLowerCase()}`}
                  />
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {toSpacedCase(option)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectTrigger>
              </Select>
            )}
          </div>
        ))}
        <button className="carbon-button" type="submit" disabled={loading}>
          {loading ? <div className="loading loading-spinner loading-sm text-neutral-200"></div>: "Calculate"}
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
