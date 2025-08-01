const { jsPDF } = require('jspdf');
const path = require('path');
const fs = require('fs');
const db = require('../db');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/pdf');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const PdfHeader = (doc) => {
  return new Promise((resolve) => {
    // Try to load logo, but continue even if it fails
    try {
      // Updated logo path - place logo.jpg in the controllers directory
      const logoPath = path.join(__dirname, 'logo.jpg');
      if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath);
        const logoBase64 = logoBuffer.toString('base64');
        doc.addImage(`data:image/jpeg;base64,${logoBase64}`, "JPEG", 10, 10, 60, 20);
      }
    } catch (error) {
      console.log('Logo not found, continuing without it');
    }

    const drawMiddleLogo = () => {
      try {
        const logoPath = path.join(__dirname, 'logo.jpg');
        if (fs.existsSync(logoPath)) {
          const logoBuffer = fs.readFileSync(logoPath);
          const logoBase64 = logoBuffer.toString('base64');
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const enlargedWidth = 100;
          const enlargedHeight = 50;
          doc.setGState(new doc.GState({ opacity: 0.2 }));
          doc.addImage(
            `data:image/jpeg;base64,${logoBase64}`,
            "JPEG",
            (pageWidth - enlargedWidth) / 2,
            (pageHeight - enlargedHeight) / 2,
            enlargedWidth,
            enlargedHeight
          );
          doc.setGState(new doc.GState({ opacity: 1 }));
        }
      } catch (error) {
        console.log('Background logo not available');
      }
    };

    drawMiddleLogo();
    doc.internal.events.subscribe("addPage", drawMiddleLogo);

    doc.setFontSize(12);
    doc.setTextColor(200);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");

    const lines = [
      "SVKM's NMIMS University",
      "School of Technology Management & Engineering",
      "MPSTME Shirpur Campus",
      "Academic Year: 2024-25",
    ];
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;
    lines.forEach((line, index) => {
      doc.text(line, centerX, 10 + index * 5, { align: "center" });
    });

    resolve();
  });
};

const generatePdf = async (req, res) => {
    try {
        const { formData } = req.body;
        console.log('=== PDF GENERATION START ===');
        console.log('Backend PDF generation called for event:', formData.title);
        
        // Check if payload is reasonable
        const payloadSize = JSON.stringify(formData).length;
        console.log('Payload size:', Math.round(payloadSize / 1024), 'KB');
        
        if (payloadSize > 50 * 1024 * 1024) { // 50MB limit
            throw new Error('Payload too large. Please reduce image sizes or quantity.');
        }
        
        const doc = new jsPDF();

        await PdfHeader(doc);
        console.log('Header added successfully');

        // Add club logo on the right side if available
        try {
          const clubLogoPath = path.join(__dirname, '../public/Club_logo', `${formData.cname}.jpg`);
          if (fs.existsSync(clubLogoPath)) {
            const clubLogoBuffer = fs.readFileSync(clubLogoPath);
            const clubLogoBase64 = clubLogoBuffer.toString('base64');
            const pageWidth = doc.internal.pageSize.getWidth();
            doc.addImage(`data:image/jpeg;base64,${clubLogoBase64}`, "JPEG", pageWidth - 30, 10, 20, 20);
          }
        } catch (error) {
          console.log('Club logo not found:', error);
        }

        // Centralize the title and make its font bigger
        doc.setFontSize(20);
        doc.setTextColor(0, 0, 0);
        doc.text(formData.title || 'Event Report', doc.internal.pageSize.getWidth() / 2, 40, {
            align: "center",
        });
        console.log('Title added:', formData.title);

        // Event type
        doc.setFontSize(16);
        doc.text(`Event Type: ${formData.type || formData.event_type || 'N/A'}`, 10, 50);
        console.log('Event type added:', formData.type || formData.event_type);

        // Add the guest speakers/judges/mentors section
        doc.setFontSize(12);
        let yOffset = 60;
        doc.text(
            "Name and designation of the Guest Speakers/ Judges/ Mentors etc.:",
            10,
            yOffset
        );

        if (formData.guestSpeakers && formData.guestSpeakers.length > 0) {
            console.log('Adding guest speakers:', formData.guestSpeakers);
            formData.guestSpeakers.forEach((guestSpeaker, index) => {
                yOffset += 10;
                if (yOffset > 280) {
                    doc.addPage();
                    yOffset = 50;
                }
                doc.text(
                    `${index + 1}. ${guestSpeaker.name || 'N/A'}, ${guestSpeaker.designation || 'N/A'}`,
                    10,
                    yOffset
                );
            });
        } else {
            yOffset += 10;
            doc.text("No guest speakers listed", 10, yOffset);
        }

        // Add the rest of the form data
        yOffset += 15;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 50;
        }
        doc.text(
            `Start Date and Time: ${formData.startDate || 'N/A'}, ${formData.startTime || 'N/A'}`,
            10,
            yOffset
        );
        yOffset += 10;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 50;
        }
        doc.text(
            `End Date and Time: ${formData.endDate || 'N/A'}, ${formData.endTime || 'N/A'}`,
            10,
            yOffset
        );
        yOffset += 10;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 50;
        }
        doc.text(`Venue: ${formData.venue || 'N/A'}`, 10, yOffset);
        yOffset += 15;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 50;
        }

        // Add the school, branch, and year fields
        const schoolsText = Array.isArray(formData.schools) ? formData.schools.join(', ') : formData.schools || 'N/A';
        doc.text(`School: ${schoolsText}`, 10, yOffset);
        yOffset += 10;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 50;
        }
        
        const branchesText = Array.isArray(formData.branches) ? formData.branches.join(', ') : formData.branches || 'N/A';
        doc.text(`Branch: ${branchesText}`, 10, yOffset);
        yOffset += 10;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 50;
        }
        
        const yearsText = Array.isArray(formData.years) ? formData.years.join(', ') : formData.years || 'N/A';
        doc.text(`Year: ${yearsText}`, 10, yOffset);
        yOffset += 10;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 50;
        }

        // Add external audience if available
        if (formData.externalInput) {
            doc.text(`External Audience: ${formData.externalInput}`, 10, yOffset);
            yOffset += 10;
            if (yOffset > 280) {
                doc.addPage();
                yOffset = 50;
            }
        }

        // Add club name
        doc.text(`Club Name: ${formData.cname || 'N/A'}`, 10, yOffset);
        yOffset += 10;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 50;
        }

        // Add additional clubs
        if (formData.clubs) {
            doc.text(`Additional Clubs: ${formData.clubs}`, 10, yOffset);
            yOffset += 10;
            if (yOffset > 280) {
                doc.addPage();
                yOffset = 50;
            }
        }

        // Add the faculty coordinators section
        yOffset += 5;
        doc.text("Faculty Coordinators:", 10, yOffset);
        yOffset += 10;

        if (formData.facultyCoordinators && formData.facultyCoordinators.length > 0) {
            console.log('Adding faculty coordinators:', formData.facultyCoordinators);
            formData.facultyCoordinators.forEach((coordinator, index) => {
                if (yOffset > 280) {
                    doc.addPage();
                    yOffset = 50;
                }
                doc.text(`${index + 1}. ${coordinator.name || 'N/A'}`, 15, yOffset);
                yOffset += 8;
            });
        } else {
            doc.text("No faculty coordinators listed", 15, yOffset);
            yOffset += 8;
        }

        // Add the student coordinators section
        yOffset += 5;
        doc.text("Student Coordinators:", 10, yOffset);
        yOffset += 10;

        if (formData.studentCoordinators && formData.studentCoordinators.length > 0) {
            console.log('Adding student coordinators:', formData.studentCoordinators);
            formData.studentCoordinators.forEach((coordinator, index) => {
                if (yOffset > 280) {
                    doc.addPage();
                    yOffset = 50;
                }
                doc.text(`${index + 1}. ${coordinator.name || 'N/A'}`, 15, yOffset);
                yOffset += 8;
            });
        } else {
            doc.text("No student coordinators listed", 15, yOffset);
            yOffset += 8;
        }

        yOffset += 5;
        doc.text(`Resources: ${formData.resources || 'N/A'}`, 10, yOffset);
        yOffset += 10;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 50;
        }
        doc.text(`Audience: ${formData.audience || 'N/A'}`, 10, yOffset);
        yOffset += 15;
        if (yOffset > 280) {
            doc.addPage();
            yOffset = 50;
        }

        // Wrap the description text
        if (formData.description) {
            doc.text("Description:", 10, yOffset);
            yOffset += 10;
            const descriptionLines = doc.splitTextToSize(formData.description, 180);
            doc.text(descriptionLines, 10, yOffset);
            yOffset += descriptionLines.length * 5 + 10;
            if (yOffset > 280) {
                doc.addPage();
                yOffset = 50;
            }
        }

        // Add the objectives section
        doc.text("The following are the objectives that we achieved:", 10, yOffset);
        yOffset += 10;

        if (formData.objectives && formData.objectives.length > 0) {
            console.log('Adding objectives:', formData.objectives);
            formData.objectives.forEach((objective, index) => {
                if (yOffset > 280) {
                    doc.addPage();
                    yOffset = 50;
                }
                doc.text(`Objective ${index + 1}: ${objective}`, 15, yOffset);
                yOffset += 8;
            });
        } else {
            doc.text("No objectives listed", 15, yOffset);
            yOffset += 8;
        }

        // Add the photos section
        yOffset += 10;
        doc.text("Here are a few glimpses from the event:", 10, yOffset);
        yOffset += 18;

        // Handle photos if they are provided as base64 strings
        if (formData.photoBase64Array && formData.photoBase64Array.length > 0) {
            console.log('Adding', formData.photoBase64Array.length, 'photos to PDF');
            let photoCount = 0;
            formData.photoBase64Array.forEach((photoBase64, index) => {
                try {
                    if (photoCount === 2) {
                        doc.addPage();
                        yOffset = 50;
                        photoCount = 0;
                    }
                    
                    // Add some spacing before photos
                    if (yOffset > 200) {
                        doc.addPage();
                        yOffset = 50;
                        photoCount = 0;
                    }
                    
                    doc.addImage(photoBase64, "JPEG", 10, yOffset, 180, 120);
                    yOffset += 130;
                    photoCount++;
                } catch (error) {
                    console.error('Error adding photo', index + 1, 'to PDF:', error);
                }
            });
        } else {
            doc.text("No photos were uploaded for this event", 10, yOffset);
        }

        // Generate unique filename
        const timestamp = Date.now();
        const fileName = `${formData.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'report'}_${timestamp}.pdf`;
        const filePath = path.join(uploadsDir, fileName);
        
        console.log('Saving PDF to:', filePath);

        // Save PDF to file system
        const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
        fs.writeFileSync(filePath, pdfBuffer);

        console.log('PDF file saved successfully');

        // Save PDF info to database
        const query = `
            INSERT INTO event_reports (event_id, file_path, created_at)
            VALUES ($1, $2, NOW())
            RETURNING id
        `;
        
        const result = await db.query(query, [formData.event_id, fileName]);
        console.log('PDF info saved to database:', result.rows[0]);

        console.log('=== PDF GENERATION COMPLETE ===');

        res.json({ 
            success: true, 
            message: 'PDF generated and saved successfully',
            fileName
        });
    } catch (error) {
        console.error('=== PDF GENERATION ERROR ===');
        console.error('Error generating PDF:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error generating PDF: ' + error.message
        });
    }
};

const downloadPdf = async (req, res) => {
    try {
        const { fileName } = req.params;
        const filePath = path.join(uploadsDir, fileName);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'PDF not found' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error downloading PDF:', error);
        res.status(500).json({ message: 'Error downloading PDF' });
    }
};

module.exports = { generatePdf, downloadPdf };