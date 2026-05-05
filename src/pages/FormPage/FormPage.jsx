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
  const [selectedTime, setSelectedTime] = useState(null);

  const vehicleType = location.state?.vehicle || "";

  // Initialize: if Auto/Car, leave blank for dropdown; otherwise pre-fill
  const [formData, setFormData] = useState({
    vehicle: (vehicleType === "Auto" || vehicleType === "Car") ? "" : vehicleType,
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    trackPageView("/form");
    if (vehicleType) trackEvent("Form Started", vehicleType);
  }, [vehicleType]);

  /* Validation Helpers */
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return re.test(email);
  };

  const validatePakPhone = (phone) => {
    const re = /^[1-9][0-9]{9}$/;
    return re.test(phone);
  };

  /* Change Handler */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      if (!/^\+?\d*$/.test(value)) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  /* Submit Handler */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.vehicle) newErrors.vehicle = "Selection is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email || !validateEmail(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.phoneNumber || !validatePakPhone(formData.phoneNumber))
      newErrors.phoneNumber = "Invalid number";
    if (!selectedTime) newErrors.bestTime = "Select consultation time";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdoWEuKL1EJyKwj7La6Iac9I1lwvh8sB1Xm32FAbebALK1A1Q/formResponse";
    const params = new URLSearchParams();
    
    // Mapping state to the Entry IDs
    params.append("entry.1037011590", formData.vehicle);      // Takaful Type (Car, Bike, Health, or Travel)
    params.append("entry.1355950951", formData.name);         // Full Name
    params.append("entry.1054815149", formData.email);        // Email
    params.append("entry.1940347616", formData.phoneNumber);  // Phone
    
    if (selectedDate) {
      params.append("entry.2069882319", selectedDate.toISOString().split('T')[0]);
    }

    if (selectedTime) {
      // Formats as 24h time for Google Sheets compatibility
      const timeStr = selectedTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      params.append("entry.1931685745", timeStr);
    }

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      trackEvent("Form Submitted", vehicleType);
      navigate("/thank-you"); 
    } catch (error) {
      console.error("Submission failed", error);
      navigate("/thank-you"); 
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">

        <div className="form-left">
          <h1>Compare Pakistan’s Top Takaful Providers</h1>
          
          <div className="form-box">
            <form onSubmit={handleSubmit}>

              {/* Conditional Input: Dropdown for Auto journey, Read-only for others */}
              {(vehicleType === "Auto" || vehicleType === "Car") ? (
                <div className="form-group">
                  <select 
                    name="vehicle" 
                    value={formData.vehicle} 
                    onChange={handleChange}
                  >
                    <option value="">Select Vehicle Type</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                  </select>
                  {errors.vehicle && <div className="error">{errors.vehicle}</div>}
                </div>
              ) : (
                <div className="form-group">
                  <input
                    name="vehicle"
                    value={formData.vehicle}
                    readOnly
                    className="readonly"
                  />
                </div>
              )}

              <div className="form-group">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <input
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <div className="phone-wrapper">
                  <div className="phone-code-box">
                    <span>+92</span>
                  </div>
                  <input
                    name="phoneNumber"
                    placeholder="3001234567"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    maxLength={10}
                    className="phone-input"
                  />
                </div>
                {errors.phoneNumber && (
                  <div className="error">{errors.phoneNumber}</div>
                )}
              </div>

              <div className="form-group">
                <div className="availability-row">
                  <div className="availability-field">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      dateFormat="MMMM d, yyyy"
                      placeholderText="Select Date"
                      className="datepicker-input"
                    />
                  </div>
                  <div className="availability-field">
                    {/* FIXED TIME PICKER */}
                    <DatePicker
                      selected={selectedTime}
                      onChange={(time) => setSelectedTime(time)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      placeholderText="Select Time"
                      className="datepicker-input"
                    />
                    {errors.bestTime && <div className="error">{errors.bestTime}</div>}
                  </div>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Get a call back
              </button>

            </form>
          </div>
        </div>

        <div className="form-right">
          <img src="images/formimage.png" alt="Insurance Illustration" />
        </div>

      </div>
    </div>
  );
};

export default FormPage;