const path = require('path');
const fs = require('fs').promises;
const db = require('../db');

const generatePdfHeader = async (doc, formData) => {
  try {
    // Read logo from assets directory
    const logoPath = path.join(__dirname, '../assets/logo.jpg');
    const logoBuffer = await fs.readFile(logoPath);
    const logoBase64 = logoBuffer.toString('base64');

    // Draw the original logo
    doc.addImage(`data:image/jpeg;base64,${logoBase64}`, "JPEG", 10, 10, 60, 20);

    const drawMiddleLogo = () => {
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
    };

    // Draw middle logo and subscribe to new pages
    drawMiddleLogo();
    doc.internal.events.subscribe("addPage", drawMiddleLogo);

    // Set text properties
    doc.setFontSize(12);
    doc.setTextColor(200);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");

    // Get current club from database
    const clubQuery = 'SELECT club_name FROM clubs WHERE id = $1';
    const clubResult = await db.query(clubQuery, [formData.clubId]);
    const currentClub = clubResult.rows[0]?.club_name || 'Unknown Club';

    // Add header text
    const lines = [
      "SVKM's NMIMS University",
      "School of Technology Management & Engineering",
      "MPSTME Shirpur Campus",
      "Academic Year: 2024-25",
      `Current Club: ${currentClub}`
    ];

    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;
    lines.forEach((line, index) => {
      doc.text(line, centerX, 10 + index * 5, { align: "center" });
    });

    // Add club logo if available
    try {
      const clubLogoPath = path.join(__dirname, `../assets/club_logos/${currentClub}.jpg`);
      const clubLogoBuffer = await fs.readFile(clubLogoPath);
      const clubLogoBase64 = clubLogoBuffer.toString('base64');

      const rightLogoWidth = 20;
      const rightLogoHeight = 20;
      doc.addImage(
        `data:image/jpeg;base64,${clubLogoBase64}`,
        "JPEG",
        pageWidth - rightLogoWidth - 10,
        10,
        rightLogoWidth,
        rightLogoHeight
      );
    } catch (error) {
      console.error('Club logo not found:', error);
    }

  } catch (error) {
    console.error('Error generating PDF header:', error);
    throw error;
  }
};

module.exports = { generatePdfHeader };