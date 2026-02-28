import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { trackPageView, trackEvent } from "../analytics/ga";

import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView("/landing");
    trackEvent("Landing Page Viewed");
  }, []);

  const handleSelect = (type) => {
    trackEvent("Category Selected", type);
    navigate("/form", { state: { vehicle: type } });
  };

  return (
    <div className="landing-container">
      <div className="content">

        {/* Title */}
        <h1 className="title">
          Find the Best Takaful Coverage Instantly
        </h1>

        {/* Subtitle */}
        <p className="subtitle">
          Search, compare, and secure the perfect Shariah-compliant Takaful plan
          in Pakistan—all under one smart platform.
        </p>

        {/* Cards */}
        <div className="card-container">

          <div
            className="card"
            onClick={() => handleSelect("Car")}
          >
            <img src="/images/Car.png" alt="Auto" />
            <p>Auto</p>
          </div>

          <div
            className="card"
            onClick={() => handleSelect("Health")}
          >
            <img src="/images/Health.png" alt="Health" />
            <p>Health</p>
          </div>

          <div
            className="card"
            onClick={() => handleSelect("Travel")}
          >
            <img src="/images/Travel.png" alt="Travel" />
            <p>Travel</p>
          </div>

        </div>

        {/* Disclaimer Links */}
        <div className="disclaimer">
          <span>Disclaimer</span>
          <span>Terms of Use</span>
          <span>Privacy Policy</span>
        </div>

        {/* Disclaimer Text */}
        <div className="disclaimer-text">
          Insijam (Private) Limited is a Shariah-compliant Fintech platform and
          aggregator. SECP Registered with NTN Registration Number: G062927.
          Trade logos displayed on this platform belong to their respective
          Takaful and insurance providers and are used by Insijam Private Limited
          under agreement/license. Takaful and Insurance are subject matters of
          solicitation. For full details on terms, conditions, and risk factors,
          please refer to the specific policy documents provided above on their
          respective links.
          <br />
          This website and its services are independent and are not a part of,
          endorsed by, sponsored by, or affiliated with Meta Platforms, Inc.,
          Google LLC, TikTok, LinkedIn, or any of their respective affiliates.
        </div>

      </div>
    </div>
  );
};

export default LandingPage;