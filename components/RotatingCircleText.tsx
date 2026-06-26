"use client";

import clsx from "clsx";
import styles from "@/components/RotatingCircleText.module.css";

type Props = {
  text: string;
  centerText?: string;
  size?: number;        // px
  className?: string;
};

export default function RotatingCircleText({
  text,
  centerText = "VIDEO",
  size = 245,
  className,
}: Props) {
  return (
    <div
      className={clsx(styles.wrapper, className)}
      style={{ width: size, height: size }}
    >
      {/* centrinis tekstas */}
      <span className={styles.centerText}>{centerText}</span>

      {/* tekstas ratu */}
      <svg className={styles.svg} viewBox="0 0 100 100">
        <defs>
          <path
            id="textCircle"
            d="
              M 50,50
              m -35,0
              a 35,35 0 1,1 70,0
              a 35,35 0 1,1 -70,0
            "
          />
        </defs>

        <text>
          <textPath href="#textCircle">{text}</textPath>
        </text>
      </svg>
    </div>
  );
}