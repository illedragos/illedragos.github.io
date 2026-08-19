import React from "react";

interface Props {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2";
}

/**
 * RGB-split glitch. The two clipped copies live in ::before/::after and read
 * `data-text`, so screen readers only ever see the single real text node.
 */
const GlitchText: React.FC<Props> = ({ text, className = "", as = "span" }) => {
  const Tag = as;
  return (
    <Tag className={`glitch ${className}`} data-text={text}>
      {text}
    </Tag>
  );
};

export default GlitchText;
