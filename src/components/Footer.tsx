export default function Footer() {
  return (
    <footer className="py-10 flex items-center justify-center">
      <p className="font-pixel text-arcade-cyan text-xs opacity-60">
        © {new Date().getFullYear()} Arnav — built with Vite + React
      </p>
    </footer>
  );
}
