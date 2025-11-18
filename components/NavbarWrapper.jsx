"use client";

import Navbar from "./Navbar";
import { useAnimation } from "@/context/AnimationContext";
import { useEffect, useState } from "react";

export default function NavbarWrapper() {
  const { introFinished } = useAnimation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
        if (introFinished) {
            setTimeout(() => {
                setVisible(true);
            }, 150); 
        }
  }, [introFinished]);

  return (
    <div className={`navbar-transition ${visible ? "navbar-show" : ""}`}>
      {/* <Navbar /> */}
    </div>
  );
}