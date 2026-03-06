import { useEffect } from "react";
import { trackPageView, trackEvent } from "../../analytics/ga";
import "./ThankYou.css";

const ThankYou = () => {
  useEffect(() => {
    trackPageView("/thank-you");
    trackEvent("Reached Thank You Page");
  }, []);

  return (
    <div className="thankyou-container">
      <h1 className="thankyou-title">
        Thank You for Choosing Insijam.
      </h1>

      <p className="thankyou-text">
        We’ve received your details. Our support agent will contact you as per
        your shared availability.
      </p>

      <h2 className="thankyou-subtitle">
        Prefer to explore on your own?
      </h2>

      <p className="thankyou-subtext">
        You don't have to wait for our call. Download the app today and compare
        all available Takaful plans in under 2 minutes.
      </p>

      <div className="qr-wrapper">
        <img
          src="/images/Qrcode.png"
          alt="QR Code"
          className="qr-image"
        />
      </div>

      <h3 className="scan-text">
        <span style={{ fontWeight: 600 }}>Scan </span>
        <span style={{ fontWeight: 400 }}>to </span>
        <span style={{ fontWeight: 600 }}>Download App</span>
      </h3>
    </div>
  );
};

export default ThankYou;