"use client";

import React, { memo } from "react";
import { UnifiedPortfolioApp } from "./UnifiedPortfolioApp";

export const AboutApp: React.FC = memo(function AboutApp() {
  return <UnifiedPortfolioApp initialSection="about" />;
});
