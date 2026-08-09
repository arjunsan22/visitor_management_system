import { Scanner as QRScanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";

export const Scanner = () => {

  const navigate = useNavigate();

  const handleScan = (result) => {

    if (!result || result.length === 0) {
      return;
    }

    const scannedValue = result[0].rawValue;

    console.log("Scanned QR:", scannedValue);

    try {

      const scannedUrl = new URL(scannedValue);

      const pathParts = scannedUrl.pathname.split("/");

      const token = pathParts[pathParts.length - 1];

      if (!token) {
        console.error("Invalid visitor QR code");
        return;
      }

      console.log("Visitor Pass Token:", token);

      navigate(`/security/visitor/${token}`);

    } catch (error) {

      console.error(
        "Invalid QR code:",
        error
      );

    }
  };

  return (
    <div>

      <h1>Scan Visitor Pass</h1>

      <QRScanner
        onScan={handleScan}
      />

    </div>
  );
};
