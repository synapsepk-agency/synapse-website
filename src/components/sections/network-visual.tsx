export function NetworkVisual() {
  const nodes = [
    [18, 22],
    [32, 58],
    [48, 30],
    [62, 70],
    [78, 24],
    [86, 62],
    [70, 44],
    [40, 78],
  ];
  const links = [
    [0, 2],
    [2, 4],
    [1, 2],
    [1, 3],
    [3, 5],
    [2, 6],
    [6, 5],
    [1, 7],
    [7, 3],
  ];
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[1] hidden h-full w-full opacity-40 mix-blend-screen md:block"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {links.map(([a, b], i) => {
        const n1 = nodes[a];
        const n2 = nodes[b];
        if (!n1 || !n2) return null;
        return (
          <line
            key={i}
            x1={n1[0]}
            y1={n1[1]}
            x2={n2[0]}
            y2={n2[1]}
            className="network-line"
            stroke="currentColor"
            strokeWidth="0.12"
            style={{ color: "var(--color-accent)" }}
          />
        );
      })}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="0.55"
          fill="currentColor"
          className="pulse-dot"
          style={{
            color: "var(--color-accent)",
            animation: `pulse-node ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}
