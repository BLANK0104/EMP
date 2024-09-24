import React from 'react';
import FormComponent from './FormComponent.jsx';
import { generatePdf } from './PdfGenerator.js';

const Form = () => {
  const handleFormSubmit = (formData) => {
    generatePdf({ formData });
  };

  return (
    <div>
      <FormComponent onSubmit={handleFormSubmit} />
    </div>
  );
};

export default Form;