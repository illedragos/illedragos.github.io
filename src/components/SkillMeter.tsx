import React from "react";
import { useCountUp } from "../hooks/useCountUp";

interface Props {
  label: string;
  value: number;
  /**
   * Optional override. Left out, the hue is derived from `value` so a grid of
   * meters reads as one gradient instead of a per-skill rainbow. The hobby map
   * passes one so each row matches the colour of its planet.
   */
  hue?: number;
  active: boolean;
  delay?: number;
  icon?: string;
  compact?: boolean;
  highlighted?: boolean;
}

/** Endpoints of the site gradient: primary-500 #0ea5e9 and accent-500 #22c55e. */
const PRIMARY_HUE = 199;
const ACCENT_HUE = 142;

/** Blue at 40 and below, ramping to green at 80 and above. */
const hueForValue = (value: number) => {
  const t = Math.min(1, Math.max(0, (value - 40) / 40));
  return Math.round(PRIMARY_HUE - (PRIMARY_HUE - ACCENT_HUE) * t);
};

/**
 * A single filled track. Colour comes from `--meter-hue`, so hacker mode can
 * retint every meter on the page with one rule.
 */
const SkillMeter: React.FC<Props> = ({
  label,
  value,
  hue,
  active,
  delay = 0,
  icon,
  compact = false,
  highlighted = false,
}) => {
  const shown = useCountUp(value, active, delay);

  return (
    <div
      className={`meter ${compact ? "meter--compact" : ""} ${
        highlighted ? "meter--hot" : ""
      }`}
      style={
        {
          "--meter-hue": hue ?? hueForValue(value),
          "--meter-value": `${active ? value : 0}%`,
        } as React.CSSProperties
      }
    >
      <div className="meter__head">
        <span className="meter__label">
          {icon && <span className="meter__icon">{icon}</span>}
          {label}
        </span>
        <span className="meter__value">{Math.round(shown)}%</span>
      </div>

      <div className="meter__track">
        <div className="meter__fill" />
      </div>
    </div>
  );
};

export default SkillMeter;
