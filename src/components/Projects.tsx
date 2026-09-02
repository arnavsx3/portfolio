import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <h2 className="font-pixel text-arcade-yellow text-lg mb-10 text-center">
        Projects
      </h2>

      <div className="grid gap-6 md:grid-cols-2 max-w-3xl w-full">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-arcade-magenta rounded-lg p-5 bg-black/30 hover:bg-black/50 transition">
            <h3 className="font-pixel text-arcade-cyan text-sm mb-3">
              {p.title}
            </h3>

            <p className="text-sm text-gray-300 mb-4">{p.description}</p>

            <div className="flex flex-wrap gap-2">
              {p.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-pixel text-arcade-yellow border border-arcade-yellow rounded px-2 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
