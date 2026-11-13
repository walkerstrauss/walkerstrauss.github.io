import React from 'react';

/*
 * The Augmented Intelligence wordmark, redrawn as vector.
 *
 * The supplied file (src/assets/aui/augmentedintelligence_aui_logo.jpeg) is a
 * 200x200 raster with a baked white background, which meant it upscaled softly
 * in the tile and needed a white plate to sit on in dark mode. Drawing it
 * instead means it stays sharp at any size and inherits `currentColor`, so it
 * flips with the theme like everything else on the page.
 *
 * Set in Poppins SemiBold, requested alongside Inter in App.css. Poppins has a
 * taller cap height and wider caps than a serif, so the size and baseline here
 * are tuned to it: changing the family means re-tuning fontSize and y.
 *
 * `currentColor` resolves to --logo-ink via .thumb-mark, which is pinned to the
 * light theme rather than following the toggle, so the mark keeps its white
 * ground in dark mode.
 */
export default function AUIMark({ title = 'Augmented Intelligence (AUI)' }) {
  return (
    <svg
      className="aui-mark"
      viewBox="0 0 200 200"
      role="img"
      aria-label={title}
      focusable="false"
    >
      <rect
        x="12"
        y="12"
        width="176"
        height="176"
        rx="30"
        ry="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="9"
      />
      <text
        x="100"
        y="119"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="'Poppins', 'Century Gothic', 'Futura', sans-serif"
        fontSize="56"
        fontWeight="600"
        letterSpacing="1"
      >
        AUI
      </text>
    </svg>
  );
}
