/**
 * Helper to safely load an image with CORS
 */
const loadImage = (src) => {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => {
      console.warn("Failed to load image for ID card:", src);
      resolve(null);
    };
    img.src = src;
  });
};

/**
 * Generates a high-resolution ID card on an HTML5 canvas and downloads it.
 * Zero external library dependencies - 100% native browser Canvas 2D.
 */
export const generateAndDownloadIdCard = async (visitor, qrCanvasElement) => {
  if (!visitor) {
    throw new Error("No visitor data provided");
  }

  // 1. Create High-Resolution Canvas (2x scale: 700 x 1080)
  const canvas = document.createElement("canvas");
  const width = 700;
  const height = 1080;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // 2. Base Dark Blue Background
  ctx.fillStyle = "#25384B";
  ctx.fillRect(0, 0, width, height);

  // 3. Background Geometric Shapes (mimicking template)
  // Large White Top Arch
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.ellipse(width / 2, 80, 520, 320, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Dark decorative circle top-left
  ctx.save();
  ctx.fillStyle = "#182532";
  ctx.beginPath();
  ctx.arc(-20, -10, 110, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Dark circular ring top-right
  ctx.save();
  ctx.strokeStyle = "#182532";
  ctx.lineWidth = 26;
  ctx.beginPath();
  ctx.arc(690, 80, 80, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // White circular ring bottom-left
  ctx.save();
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 32;
  ctx.beginPath();
  ctx.arc(-30, 1070, 120, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // White accent square bottom-right
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(600, 960, 60, 60);
  ctx.restore();



  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "#25384B";
  ctx.font = "bold 20px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("NIT CALICUT", width / 2, 180);

  ctx.fillStyle = "#64748B";
  ctx.font = "bold 13px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillText("VISITOR PASS", width / 2, 205);
  ctx.restore();

  // 5. Photo Box
  const photoBoxX = width / 2 - 130;
  const photoBoxY = 240;
  const photoBoxWidth = 260;
  const photoBoxHeight = 310;

  // Outer white photo frame shadow / border
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = "rgba(0,0,0,0.25)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetY = 8;
  ctx.fillRect(photoBoxX - 8, photoBoxY - 8, photoBoxWidth + 16, photoBoxHeight + 16);
  ctx.restore();

  // Inner photo area
  const apiUrl = import.meta.env.VITE_API_URL;
  const photoUrl = visitor.image ? `${apiUrl}${visitor.image}` : null;
  const visitorImg = photoUrl ? await loadImage(photoUrl) : null;

  if (visitorImg) {
    ctx.drawImage(visitorImg, photoBoxX, photoBoxY, photoBoxWidth, photoBoxHeight);
  } else {
    // Placeholder with Initial
    ctx.fillStyle = "#E2E8F0";
    ctx.fillRect(photoBoxX, photoBoxY, photoBoxWidth, photoBoxHeight);

    const initial = visitor.name?.trim()?.charAt(0)?.toUpperCase() || "V";
    ctx.fillStyle = "#64748B";
    ctx.font = "bold 100px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initial, width / 2, photoBoxY + photoBoxHeight / 2);
  }

  // 6. Visitor Info
  ctx.save();
  ctx.textAlign = "center";

  // Visitor Name
  const visitorName = (visitor.name || "VISITOR").toUpperCase();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 34px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText(visitorName, width / 2, 620);

  // Decorative Underline under name
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(width / 2 - 120, 638, 240, 3);

  // "CAMPUS VISITOR" Subtitle
  ctx.fillStyle = "#CBD5E1";
  ctx.font = "bold 18px system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
  ctx.fillText("CAMPUS VISITOR", width / 2, 680);

  

  let dateStr = "TODAY";
  if (visitor.visit_date) {
    try {
      dateStr = new Date(visitor.visit_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      dateStr = String(visitor.visit_date);
    }
  }

  ctx.font = "17px 'JetBrains Mono', monospace, sans-serif";
  ctx.fillStyle = "#94A3B8";
  ctx.fillText(`DATE : ${dateStr}`, width / 2, 755);

  if (visitor.person_to_visit) {
    ctx.fillText(`TO MEET : ${visitor.person_to_visit.toUpperCase()}`, width / 2, 785);
  }
  ctx.restore();

  // 7. QR Code Badge
  const qrBadgeSize = 140;
  const qrBadgeX = width / 2 - qrBadgeSize / 2;
  const qrBadgeY = 855;

  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 15;
  ctx.shadowOffsetY = 6;
  ctx.fillRect(qrBadgeX - 8, qrBadgeY - 8, qrBadgeSize + 16, qrBadgeSize + 16);
  ctx.restore();

  // Draw QR code onto badge
  if (qrCanvasElement) {
    ctx.drawImage(qrCanvasElement, qrBadgeX, qrBadgeY, qrBadgeSize, qrBadgeSize);
  } else {
    // If no qr canvas element, draw placeholder QR box
    ctx.fillStyle = "#1E293B";
    ctx.fillRect(qrBadgeX, qrBadgeY, qrBadgeSize, qrBadgeSize);
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 12px monospace";
    ctx.textAlign = "center";
    ctx.fillText("PASS QR", width / 2, qrBadgeY + qrBadgeSize / 2);
  }

  // 8. Trigger PNG Download
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  const safeName = (visitor.name || "visitor").trim().replace(/\s+/g, "-");
  link.download = `visitor-pass-${safeName}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return true;
};

