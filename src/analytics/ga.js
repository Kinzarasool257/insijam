import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-XXXXXXXXXX"); // Replace with your GA4 ID
};

export const trackPageView = (page) => {
  ReactGA.send({ hitType: "pageview", page });
};

export const trackEvent = (action, label = "") => {
  ReactGA.event({
    category: "Funnel",
    action,
    label,
  });
};