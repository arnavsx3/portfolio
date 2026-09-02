import { profiles } from '../data/profiles'

export default function CodingProfiles() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="font-pixel text-arcade-cyan text-lg mb-10 text-center">
        Achievements
      </h2>

      <div className="flex flex-wrap gap-4 justify-center">
        {profiles.map((p) => (
          <a
            key={p.platform}
            href={p.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-xs text-arcade-magenta border-2 border-arcade-magenta rounded-full px-4 py-3 hover:bg-arcade-magenta hover:text-black transition"
          >
            {p.platform}
          </a>
        ))}
      </div>
    </section>
  )
}
