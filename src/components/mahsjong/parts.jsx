import './mahsjong.css';

/*
 * Drawn pieces for the Mah's Jong case. Stylized: tile faces are a number
 * and a simple suit mark, not the game's art. Nothing here is a screenshot.
 */

const MARK = { b: '❘❘', d: '●', c: '万' };

/* A tile. `t` is like "3b" (3 of bamboo), "7c", "5d", "*" (Celestial) or "" (face down). */
export function MjTile({ t = '', lit, dim, className = '', ...rest }) {
  const celestial = t === '*';
  const suit = celestial ? 'star' : t ? t.slice(-1) : 'back';
  return (
    <span
      className={`mj-tile ${className}`}
      data-suit={suit}
      data-lit={lit ? 'true' : undefined}
      data-dim={dim ? 'true' : undefined}
      {...rest}
    >
      {celestial ? <b>✦</b> : t ? <><b>{t.slice(0, -1)}</b><i>{MARK[suit]}</i></> : null}
    </span>
  );
}

export function Hand({ tiles, lit = [], className = '' }) {
  return (
    <span className={`mj-hand ${className}`}>
      {tiles.map((t, i) => <MjTile key={i} t={t} lit={lit.includes(i)} />)}
    </span>
  );
}

/* The pile: a visible grid. `rows` is an array of arrays of tile codes. */
export function Pile({ rows, litRow, dimOthers }) {
  return (
    <span className="mj-pile">
      {rows.map((row, r) => (
        <span key={r} className="mj-pile-row" data-lit={litRow === r ? 'true' : undefined}>
          {row.map((t, i) => <MjTile key={`${t}${i}`} t={t} dim={dimOthers && litRow !== r} />)}
        </span>
      ))}
    </span>
  );
}

/* A ring that empties as `left` falls from `of` to 0. */
export function TimerRing({ left, of = 45 }) {
  const R = 34;
  const C = 2 * Math.PI * R;
  return (
    <span className="mj-timer" data-out={left === 0 ? 'true' : undefined}>
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r={R} className="mj-timer-track" />
        <circle cx="40" cy="40" r={R} className="mj-timer-arc" strokeDasharray={C} strokeDashoffset={C * (1 - left / of)} transform="rotate(-90 40 40)" />
      </svg>
      <b>0:{String(left).padStart(2, '0')}</b>
    </span>
  );
}

export function Prompt({ children, className = '', ...rest }) {
  return <span className={`mj-prompt ${className}`} {...rest}>{children}</span>;
}

/* Whose turn it is. */
export function Turn({ who }) {
  return (
    <span className="mj-turn">
      <span data-on={who === 'you' ? 'true' : 'false'}>You</span>
      <span data-on={who === 'them' ? 'true' : 'false'}>Opponent</span>
    </span>
  );
}

export function Tag({ children, tone, className = '', ...rest }) {
  return <span className={`mj-tag ${className}`} data-tone={tone} {...rest}>{children}</span>;
}
