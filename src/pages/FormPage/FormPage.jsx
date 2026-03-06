import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { trackPageView, trackEvent } from "../../analytics/ga";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./FormPage.css";

const FormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

const [selectedDate, setSelectedDate] = useState(null);

  const vehicleType = location.state?.vehicle || "";

  const [formData, setFormData] = useState({
    vehicle: vehicleType,
    name: "",
    email: "",
    phoneNumber: "",
    bestTime: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    trackPageView("/form");
    if (vehicleType) trackEvent("Form Started", vehicleType);
  }, [vehicleType]);

  /* Validation */
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return re.test(email);
  };

  const validatePakPhone = (phone) => {
    const re = /^[1-9][0-9]{9}$/;
    return re.test(phone);
  };

  /* Change */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
  if (!/^\+?\d*$/.test(value)) return;
}

    setFormData({ ...formData, [name]: value });
  };

  /* Submit */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.email || !validateEmail(formData.email))
      newErrors.email = "Valid email required";

    if (!formData.phoneNumber || !validatePakPhone(formData.phoneNumber))
      newErrors.phoneNumber = "Invalid number";

    if (!formData.bestTime)
      newErrors.bestTime = "Select consultation time";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    trackEvent("Form Submitted", vehicleType);

    navigate("/thank-you");
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">

        {/* LEFT SIDE */}
        <div className="form-left">

          <h1>Compare Pakistan’s Top Takaful Providers</h1>

          <p>
            Find the most reliable coverage for yourself, your vehicle,
            or your family. Enter your details below to view tailored plans.
          </p>

          <div className="form-box">

            <form onSubmit={handleSubmit}>

              {/* Vehicle */}
              <div className="form-group">
                <input
                  name="vehicle"
                  value={formData.vehicle}
                  readOnly
                  className="readonly"
                />
              </div>

              {/* Name */}
              <div className="form-group">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="error">{errors.name}</div>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <input
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="error">{errors.email}</div>
                )}
              </div>

             {/* Phone */}
<div className="form-group">

  <div className="phone-wrapper">

    {/* Country Code */}
    <div className="phone-code-box">
      <img
        src="/images/Flag.png"
        alt="PK"
        className="flag-icon"
      />
      <span>+92</span>
    </div>

    {/* Number Input */}
<input
  name="phoneNumber"
  placeholder="3001234567"
  value={formData.phoneNumber}  // keep only the user-entered number
  onChange={handleChange}
  maxLength={10}
  className="phone-input"
/>

  </div>

  {errors.phoneNumber && (
    <div className="error">{errors.phoneNumber}</div>
  )}

</div>

              {/* Time */}
             <div className="form-group">

  <DatePicker
    selected={selectedDate}
    onChange={(date) => {
      setSelectedDate(date);

      setFormData({
        ...formData,
        bestTime: date
      });
    }}

    showTimeSelect
    timeIntervals={15}
    dateFormat="MMMM d, yyyy h:mm aa"
    placeholderText="Choose your time"
    className="datepicker-input"
  />

  {errors.bestTime && (
    <div className="error">{errors.bestTime}</div>
  )}

</div>

              {/* Button */}
              <button type="submit" className="submit-btn">
                Get a call back
              </button>

            </form>

          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="form-right">
          <img
            src="images/formimage.png"
            alt="Insurance Illustration"
          />
        </div>

      </div>
    </div>
  );
};

export default FormPage;