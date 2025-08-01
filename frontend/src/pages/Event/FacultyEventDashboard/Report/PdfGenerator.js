const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

// Helper function to compress and convert file to base64
const compressAndConvertToBase64 = (file, maxWidth = 800, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedBase64);
    };
    
    img.onerror = reject;
    
    const reader = new FileReader();
    reader.onload = (e) => img.src = e.target.result;
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Helper function to convert file to base64 (fallback)
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generatePdf = async ({ formData }) => {
  try {
    console.log('Calling backend PDF generation with:', formData);
    
    // Convert and compress photos to base64 if they exist
    let photoBase64Array = [];
    if (formData.photos && formData.photos.length > 0) {
      console.log('Converting and compressing photos to base64...');
      for (const photo of formData.photos) {
        if (photo instanceof File) {
          try {
            // Try to compress first, fallback to regular conversion if compression fails
            let base64;
            try {
              base64 = await compressAndConvertToBase64(photo, 800, 0.7);
            } catch (compressionError) {
              console.warn('Compression failed, using original size:', compressionError);
              base64 = await fileToBase64(photo);
            }
            photoBase64Array.push(base64);
          } catch (error) {
            console.error('Error converting photo to base64:', error);
          }
        }
      }
    }

    // Limit the number of photos to prevent payload size issues
    if (photoBase64Array.length > 5) {
      console.warn('Too many photos, limiting to first 5');
      photoBase64Array = photoBase64Array.slice(0, 5);
    }

    // Create a lighter version of formData for the request
    const formDataWithPhotos = {
      ...formData,
      photoBase64Array,
      // Remove the original photos array to reduce payload size
      photos: undefined
    };
    
    console.log('Sending PDF generation request...');
    const response = await fetch(`${backendUrl}/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ formData: formDataWithPhotos })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate PDF');
    }

    const data = await response.json();
    console.log('PDF generation response:', data);
    
    return { success: true, message: data.message };

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};