const socials = [
  { label: "GitHub", url: "https://github.com/arnavsx3" },
  { label: "LinkedIn", url: "https://in.linkedin.com/in/arnavsx3" },
  { label: "Email", url: "mailto:arnavsx3dev@gmail.com" },
];

export default function Socials() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="font-pixel text-arcade-magenta text-lg mb-10 text-center">
        Connect
      </h2>

      <div className="flex gap-6">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-xs text-arcade-yellow border-2 border-arcade-yellow rounded-lg px-4 py-3 hover:bg-arcade-yellow hover:text-black transition">
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
