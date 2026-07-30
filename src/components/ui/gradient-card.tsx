"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl p-6 md:p-8 border border-white/10 shadow-lg transition-all duration-300 hover:border-white/20",
  {
    variants: {
      gradient: {
        orange: "bg-gradient-to-br from-amber-950/40 via-orange-900/20 to-[#121214] text-white",
        gray: "bg-gradient-to-br from-slate-900/60 via-slate-800/30 to-[#121214] text-white",
        purple: "bg-gradient-to-br from-purple-950/40 via-indigo-900/20 to-[#121214] text-white",
        green: "bg-gradient-to-br from-emerald-950/40 via-teal-900/20 to-[#121214] text-white",
      },
    },
    defaultVariants: {
      gradient: "gray",
    },
  }
);

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  imageUrl?: string;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  (
    {
      className,
      gradient,
      badgeText,
      badgeColor,
      title,
      description,
      ctaText,
      ctaHref,
      imageUrl,
      ...props
    },
    ref
  ) => {
    const cardAnimation = {
      rest: { scale: 1, y: 0 },
      hover: { scale: 1.02, y: -4 },
    };

    const imageAnimation = {
      rest: { scale: 1, rotate: 0 },
      hover: { scale: 1.08, rotate: 2 },
    };

    return (
      <motion.div
        variants={cardAnimation}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="h-full"
        ref={ref}
      >
        <div className={cn(cardVariants({ gradient }), className)} {...props}>
          {imageUrl && (
            <motion.img
              src={imageUrl}
              alt={`${title} background graphic`}
              variants={imageAnimation}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="absolute -right-1/4 -bottom-1/4 w-3/4 opacity-30 pointer-events-none"
            />
          )}

          {/* Card Content */}
          <div className="z-10 flex flex-col h-full justify-between">
            <div>
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-mono text-white/80 backdrop-blur-md w-fit border border-white/10">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: badgeColor }}
                />
                {badgeText}
              </div>

              {/* Title and Description */}
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Call to Action Link */}
            {ctaText && ctaHref && (
              <a
                href={ctaHref}
                className="group mt-6 inline-flex items-center gap-2 text-xs font-mono font-semibold text-sky-400 hover:text-sky-300 transition-colors uppercase tracking-wider"
              >
                {ctaText}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);
GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
