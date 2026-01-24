"use client";

import React, { useState, useEffect } from "react";

const RtlMode = () => {
  const [isRTL, setIsRTL] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted state to true after component mounts
    setMounted(true);

    // Get RTL preference from localStorage only on client side
    const savedRTL = localStorage.getItem("rtl") === "true";
    setIsRTL(savedRTL);
  }, []);

  useEffect(() => {
    // Apply direction and save to localStorage only after component is mounted
    if (mounted) {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      localStorage.setItem("rtl", isRTL.toString());
    }
  }, [isRTL, mounted]);

  const toggleRTL = () => {
    setIsRTL((prev) => !prev);
  };

  // Prevent rendering until component has mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={`rtl-demo ${isRTL ? "rtl" : "ltr"}`}>
      <button type="button" onClick={toggleRTL}>
        {isRTL ? "Click to LTR" : "Click to RTL"}
      </button>
    </div>
  );
};

export default RtlMode;
