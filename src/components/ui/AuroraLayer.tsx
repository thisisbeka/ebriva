export default function AuroraLayer() {
  return (
    <div
      className="absolute inset-0 -z-10 animate-aurora opacity-[0.25]"
      style={{
        background:
          'radial-gradient(600px circle at 30% 40%, rgba(245,212,122,0.25), transparent 60%), radial-gradient(800px circle at 70% 70%, rgba(212,175,55,0.2), transparent 60%)',
      }}
    />
  );
}
