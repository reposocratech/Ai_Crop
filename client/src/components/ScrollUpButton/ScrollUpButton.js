import React, { useState } from "react";
import "./scrollUpButton.scss";

export const ScrollUpButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button className="up_button">
      <img src="/assets/images/swipe-up.png" />
    </button>
  );
};
