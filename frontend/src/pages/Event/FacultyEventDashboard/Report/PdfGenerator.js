import jsPDF from "jspdf";
import { PdfHeader } from "./PdfHeader";

const getClubLogoPath = (clubName) => {
  const logoPath = `/public/Club_logo/${clubName}.jpg`;
  return logoPath;
};

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generatePdf = async ({ formData }) => {
  const doc = new jsPDF();

  await PdfHeader(doc);

  const clubLogoPath = getClubLogoPath(formData.cname);
  try {
    const response = await fetch(clubLogoPath);
    if (response.ok) {
      const imgData = await response.blob();
      const logoDataUrl = await readFileAsDataURL(imgData);
      doc.addImage(logoDataUrl, "JPEG", 160, 10, 30, 30);
    }
  } catch (error) {
    console.error("Error fetching club logo:", error);
  }

  // Centralize the title and make its font bigger
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 0); // Set text color to black
  doc.text(formData.title, doc.internal.pageSize.getWidth() / 2, 40, {
    align: "center",
  });

  // Event type
  doc.setFontSize(16);
  doc.text(`Event Type: ${formData.type}`, 10, 50);

  // Add the guest speakers/judges/mentors section
  doc.setFontSize(12);
  let yOffset = 60;
  doc.text(
    "Name and designation of the Guest Speakers/ Judges/ Mentors etc.:",
    10,
    yOffset
  );

  formData.guestSpeakers.forEach((guestSpeaker, index) => {
    yOffset += 10;
    if (yOffset > 280) {
      // Check if we need to add a new page
      doc.addPage();
      yOffset = 10;
    }
    doc.text(
      `${index + 1}. ${guestSpeaker.name}, ${guestSpeaker.designation}`,
      10,
      yOffset
    );
  });

  // Add the rest of the form data
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }
  doc.text(
    `Start Date and Time: ${formData.startDate}, ${formData.startTime}`,
    10,
    yOffset
  );
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }
  doc.text(
    `End Date and Time: ${formData.endDate}, ${formData.endTime}`,
    10,
    yOffset
  );
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }
  doc.text(`Venue: ${formData.venue}`, 10, yOffset);
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }

  // Add the school, branch, and year fields
  doc.text(`School: ${formData.schools}`, 10, yOffset);
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }
  doc.text(`Branch: ${formData.branches}`, 10, yOffset);
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }
  doc.text(`Year: ${formData.years}`, 10, yOffset);
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }

  doc.text(`External Audience: ${formData.externalInput}`, 10, yOffset);
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }
  // Add the cname field
  doc.text(`Club Name: ${formData.cname}`, 10, yOffset);
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }

  doc.text(`Additional Clubs: ${formData.clubs}`, 10, yOffset);
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }

  // Add the faculty coordinators section
  doc.text("Faculty Coordinators:", 10, yOffset);
  yOffset += 10; // Add some space before listing the faculty coordinators

  formData.facultyCoordinators.forEach((coordinator, index) => {
    if (yOffset > 280) {
      // Check if we need to add a new page
      doc.addPage();
      yOffset = 10;
    }
    doc.text(`${index + 1}. ${coordinator.name}`, 10, yOffset);
    yOffset += 10;
  });

  // Add the student coordinators section
  doc.text("Student Coordinators:", 10, yOffset);
  yOffset += 10; // Add some space before listing the student coordinators

  formData.studentCoordinators.forEach((coordinator, index) => {
    if (yOffset > 280) {
      // Check if we need to add a new page
      doc.addPage();
      yOffset = 10;
    }
    doc.text(`${index + 1}. ${coordinator.name}`, 10, yOffset);
    yOffset += 10;
  });

  doc.text(`Resources: ${formData.resources}`, 10, yOffset);
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }
  doc.text(`Audience: ${formData.audience}`, 10, yOffset);
  yOffset += 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }

  // Wrap the description text
  const descriptionLines = doc.splitTextToSize(formData.description, 180);
  doc.text(descriptionLines, 10, yOffset);
  yOffset += descriptionLines.length * 10;
  if (yOffset > 280) {
    // Check if we need to add a new page
    doc.addPage();
    yOffset = 10;
  }

  // Add the objectives section
  doc.text("The following are the objectives that we achieved:", 10, yOffset);
  yOffset += 10; // Add some space before listing the objectives

  formData.objectives.forEach((objective, index) => {
    if (yOffset > 280) {
      // Check if we need to add a new page
      doc.addPage();
      yOffset = 10;
    }
    doc.text(`Objective ${index + 1}: ${objective}`, 10, yOffset);
    yOffset += 10;
  });

  // Add the photos section
  doc.text("Here are a few glimpses from the event:", 10, yOffset);
  yOffset += 18; // Add some space before listing the photos

  let photoCount = 0;
  for (const photo of formData.photos) {
    try {
      const imgData = await readFileAsDataURL(photo);
      if (photoCount === 2) {
        // Check if we need to add a new page
        doc.addPage();
        yOffset = 10;
        photoCount = 0;
      }
      doc.addImage(imgData, "JPEG", 10, yOffset, 180, 120); // Adjust the position and size as needed
      yOffset += 130; // Adjust the offset for the next image
      photoCount++;
    } catch (error) {
      console.error("Error reading photo file:", error);
    }
  }
  // Convert the PDF to a Blob
  const pdfBlob = doc.output("blob");

  // Create a FormData object to send the PDF to the server
  const formDataToSend = new FormData();
  formDataToSend.append("file", pdfBlob, `${formData.title}.pdf`);

  // Send the PDF to the server
  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formDataToSend,
    });

    if (!response.ok) {
      throw new Error("Failed to upload PDF");
    }

    console.log("PDF uploaded successfully");
  } catch (error) {
    console.error("Error uploading PDF:", error);
  }
  const fileName = formData.title ? `${formData.title}.pdf` : "form.pdf";
  doc.save(fileName);
};