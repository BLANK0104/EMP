import React from 'react';
import FormComponent from './FormComponent.jsx';
import { generatePdf } from './PdfGenerator.js';

const Form = () => {
  const handleFormSubmit = (formData) => {
    generatePdf({ formData });
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4">
      <FormComponent onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Form;