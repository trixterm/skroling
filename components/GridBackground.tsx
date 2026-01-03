"use client";

import React, { memo, useMemo, useId } from "react";

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
  )
`;

function GridBackground({
    className = "",
    zIndexClassName = "-z-10",
}: GridBackgroundProps) {
    const uniqueId = useId();
    const gridId = `grid-bg-${uniqueId.replace(/:/g, "")}`;

    const mergedClassName = useMemo(
        () => [BASE_CLASS_NAME, zIndexClassName, className, gridId].join(" "),
        [zIndexClassName, className, gridId]
    );

    const cssString = `
    .${gridId} {
      background-image: ${DESKTOP_BACKGROUND_IMAGE};
    }
    @media (max-width: 1068px) {
      .${gridId} {
        background-image: ${MOBILE_BACKGROUND_IMAGE};
      }
    }
  `;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: cssString }} />
            <div aria-hidden="true" className={mergedClassName} />
        </>
    );
}

export default memo(GridBackground);