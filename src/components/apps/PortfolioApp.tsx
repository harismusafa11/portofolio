"use client";

import React, { memo } from "react";
import { UnifiedPortfolioApp } from "./UnifiedPortfolioApp";

export const PortfolioApp: React.FC = memo(function PortfolioApp() {
  return <UnifiedPortfolioApp initialSection="portfolio" />;
});
