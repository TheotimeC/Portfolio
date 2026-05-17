export function GridBg() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 60% 30%, rgba(94,106,210,0.06) 0%, transparent 60%), " +
          "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 32px 32px",
      }}
    />
  );
}
