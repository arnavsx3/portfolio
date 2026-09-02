export default function About() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="border-2 border-arcade-cyan rounded-lg p-6 md:p-8 max-w-md w-full bg-black/30">
        <h2 className="font-pixel text-arcade-cyan text-lg mb-6 text-center">
          Player Stats
        </h2>
        <div className="space-y-3 text-sm">
          <p>
            <span className="text-arcade-yellow">Name:</span> Arnav
          </p>
          <p>
            <span className="text-arcade-yellow">Class:</span> CS + AI Student
          </p>
          <p>
            <span className="text-arcade-yellow">Level:</span> 3rd Year
          </p>
          <p>
            <span className="text-arcade-yellow">Current Quest:</span> Building
            net-sentry-backend & Cassian
          </p>
        </div>
      </div>
    </section>
  );
}
