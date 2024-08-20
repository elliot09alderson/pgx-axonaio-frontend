import React, { useEffect, useState, useRef } from "react";

const IdleTimer = ({ logout }) => {
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [lastNavigation, setLastNavigation] = useState(Date.now());

  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
  const twoHours = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  // const oneHour = 10000; // 1 hour in milliseconds
  // const twoHours = 30000; // 2 hours in milliseconds
  const activityTimeout = useRef(null);
  const navigationTimeout = useRef(null);

  const resetActivityTimer = () => {
    setLastActivity(Date.now());
    if (activityTimeout.current) {
      clearTimeout(activityTimeout.current);
    }
    activityTimeout.current = setTimeout(() => {
      logout();
    }, oneHour);
  };

  const resetNavigationTimer = () => {
    setLastNavigation(Date.now());
    if (navigationTimeout.current) {
      clearTimeout(navigationTimeout.current);
    }
    navigationTimeout.current = setTimeout(() => {
      logout();
    }, twoHours);
  };

  const handleUserActivity = () => {
    resetActivityTimer();
  };

  const handleNavigation = () => {
    resetNavigationTimer();
  };

  useEffect(() => {
    // Set initial timers
    resetActivityTimer();
    resetNavigationTimer();

    // Set event listeners for user activity
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);

    // Listen to page visibility change to detect tab change or minimize
    document.addEventListener("visibilitychange", handleNavigation);

    return () => {
      // Cleanup event listeners and timers on component unmount
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      document.removeEventListener("visibilitychange", handleNavigation);
      if (activityTimeout.current) clearTimeout(activityTimeout.current);
      if (navigationTimeout.current) clearTimeout(navigationTimeout.current);
    };
  }, []);

  return null;
};

export default IdleTimer;
