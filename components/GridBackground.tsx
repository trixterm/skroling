"use client";

import React, { memo, useMemo } from "react";

type GridBackgroundProps = {
  className?: string;
  zIndexClassName?: string;
};

const BASE_CLASS_NAME =
  "fixed inset-0 w-screen h-screen pointer-events-none";

const DESKTOP_BACKGROUND_IMAGE = `
  repeating-linear-gradient(
    to right,
    transparent 0,
    transparent calc(100% / 12 - 1px),
    #d7d7d7 calc(100% / 12 - 1px),
    #d7d7d7 calc(100% / 12)
  ),
  repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent calc(100% / 6 - 1px),
    #d7d7d7 calc(100% / 6 - 1px),
    #d7d7d7 calc(100% / 6)
  )
`;

const MOBILE_BACKGROUND_IMAGE = `
  repeating-linear-gradient(
    to right,
    transparent 0,
    transparent calc(100% / 4 - 1px),
    #d7d7d7 calc(100% / 4 - 1px),
    #d7d7d7 calc(100% / 4)
  ),
  repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent calc(100% / 6 - 1px),
    #d7d7d7 calc(100% / 6 - 1px),
    #d7d7d7 calc(100% / 6)
  ) !important
`;

function GridBackground({
  className = "",
  zIndexClassName = "-z-10",
}: GridBackgroundProps) {
  const mergedClassName = useMemo(
    () => [BASE_CLASS_NAME, zIndexClassName, className].join(" "),
    [zIndexClassName, className]
  );

  const style = useMemo(
    () => ({ backgroundImage: DESKTOP_BACKGROUND_IMAGE }),
    []
  );

  return (
    <div aria-hidden="true" className={mergedClassName} style={style}>
      <style jsx>{`
        @media (max-width: 1068px) {
          div[aria-hidden="true"] {
            background-image: ${MOBILE_BACKGROUND_IMAGE};
          }
        }
      `}</style>
    </div>
  );
}

export default memo(GridBackground);