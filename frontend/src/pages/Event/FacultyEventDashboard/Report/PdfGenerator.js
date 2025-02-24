export const generatePdf = async ({ formData }) => {
  try {
    const response = await fetch(`${backendUrl}/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ formData })
    });

    if (!response.ok) {
      throw new Error('Failed to generate PDF');
    }

    const data = await response.json();
    return data.fileName;

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};