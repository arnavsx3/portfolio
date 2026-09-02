import { motion } from "framer-motion";
import { certifications } from "../data/certifications";

export default function Certifications() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="font-pixel text-arcade-yellow text-lg mb-10 text-center">
        Certifications
      </h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 max-w-md w-full">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="border-2 border-arcade-cyan rounded-lg p-4 bg-black/30 flex items-center justify-between">
            <div>
              <p className="font-pixel text-xs text-arcade-cyan mb-1">
                {cert.name}
              </p>
              <p className="text-xs text-gray-400">{cert.issuer}</p>
            </div>
            <span
              className={`text-xs font-pixel px-2 py-1 rounded ${
                cert.status === "earned"
                  ? "text-arcade-yellow border border-arcade-yellow"
                  : "text-arcade-magenta border border-arcade-magenta"
              }`}>
              {cert.status === "earned" ? "Unlocked" : "In Progress"}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
