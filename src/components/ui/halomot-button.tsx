"use client";

import React, { useState } from "react";

export interface HalomotButtonProps {
  gradient?: string;
  inscription: string;
  onClick?: () => void;
  fillWidth?: boolean;
  fixedWidth?: string;
  href?: string;
  backgroundColor?: string;
  icon?: React.ReactElement;
  borderWidth?: string;
  padding?: string;
  outerBorderRadius?: string;
  innerBorderRadius?: string;
  textColor?: string;
  hoverTextColor?: string;
}

export const HalomotButton: React.FC<HalomotButtonProps> = ({
  gradient = "linear-gradient(135deg, #0078d4, #38bdf8, #10b981)",
  inscription,
  onClick,
  fillWidth = false,
  fixedWidth,
  href,
  backgroundColor = "#111014",
  icon,
  borderWidth = "1px",
  padding,
  outerBorderRadius = "8px",
  innerBorderRadius = "7px",
  textColor = "#fff",
  hoverTextColor = "#38bdf8",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle: React.CSSProperties = {
    margin: fillWidth || fixedWidth ? "0" : "auto",
    padding: borderWidth,
    background: gradient,
    border: "0",
    borderRadius: outerBorderRadius,
    color: textColor,
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    userSelect: "none",
    WebkitUserSelect: "none",
    whiteSpace: "nowrap",
    transition: "all .3s ease",
    width: fillWidth || fixedWidth ? "100%" : "fit-content",
    boxSizing: "border-box",
  };

  const spanStyle: React.CSSProperties = {
    background: isHovered ? "transparent" : backgroundColor,
    padding: padding ?? (fillWidth || fixedWidth ? "0.75rem 1rem" : "0.75rem 1.5rem"),
    border: "0",
    borderRadius: innerBorderRadius,
    width: "100%",
    height: "100%",
    transition: "background 300ms ease, color 300ms ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    color: isHovered && hoverTextColor ? hoverTextColor : textColor,
    whiteSpace: "nowrap",
    fontSize: "0.875rem",
    gap: icon ? "0.5em" : "0.25em",
    boxSizing: "border-box",
    cursor: "pointer",
  };

  const content = (
    <span
      style={spanStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      {inscription}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={buttonStyle}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button style={buttonStyle} onClick={onClick} type="button">
      {content}
    </button>
  );
};
