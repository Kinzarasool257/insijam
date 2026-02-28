import { useEffect } from "react";
import { trackPageView, trackEvent } from "../analytics/ga";

const ThankYou = () => {
 useEffect(() => {
  trackPageView("/thank-you");
  trackEvent("Reached Thank You Page");

  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "auto";
  };
}, []);

  return (
   <div
  style={{
    height: "100vh",              // fixed height instead of minHeight
    overflow: "hidden",           // prevent vertical scroll
    backgroundImage: "url('public/images/insijam_background.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "3vw 5%",            // slightly reduced padding
    fontFamily: "'Montserrat', sans-serif",
    lineHeight: "1.5",
    letterSpacing: 0,
  }}
>
      <h1
        style={{
          fontSize: "clamp(28px, 6vw, 50px)", // responsive font size
          fontWeight: "700",
          color: "#28384F",
          marginBottom: "1rem",
        }}
      >
        Thank You for Choosing Insijam.
      </h1>

      <p
        style={{
          fontSize: "clamp(14px, 2.5vw, 16px)",
          fontWeight: "400",
          color: "#28384F",
          marginBottom: "3rem",
          whiteSpace: "normal", // wrap text on smaller screens
          maxWidth: "90%",
        }}
      >
        We’ve received your details. Our support agent will contact you as per your shared availability.
      </p>

      <h2
        style={{
          fontSize: "clamp(22px, 5vw, 28px)",
          fontWeight: "700",
          color: "#28384F",
          marginBottom: "0.5rem",
        }}
      >
        Prefer to explore on your own?
      </h2>

      <p
        style={{
          fontSize: "clamp(14px, 2.5vw, 16px)",
          fontWeight: "400",
          color: "#28384F",
          maxWidth: "700px",
          marginBottom: "1.5rem",
        }}
      >
        You don't have to wait for our call. Download the app today and compare
        all available Takaful plans in under 2 minutes.
      </p>

      <div
        style={{
          padding: "2vw",
          borderRadius: "12px",
          display: "inline-block",
          marginBottom: "1rem",
        }}
      >
        <img
          src="public/images/qr_code.png"
          alt="QR Code"
          style={{
            width: "clamp(180px, 40vw, 254px)",
            height: "auto", // maintain aspect ratio
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "8px",
          }}
        />
      </div>

      <h3
        style={{
          fontSize: "clamp(24px, 5vw, 33px)",
          color: "#28384F",
          marginTop: "0",
          lineHeight: "1.2",
        }}
      >
        <span style={{ fontWeight: "600" }}>Scan </span>
        <span style={{ fontWeight: "400" }}>to </span>
        <span style={{ fontWeight: "600" }}>Download App</span>
      </h3>
    </div>
  );
};

export default ThankYou;