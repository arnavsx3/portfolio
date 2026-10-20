export default function Footer() {
  return (
    <footer className="footer wrap">
      <a className="wordmark" href="#top" aria-label="Arnav — back to top">
        arnav<span>✳</span>
      </a>
      <p className="mono">
        © {new Date().getFullYear()} ARNAV. BUILT WITH CURIOSITY.
      </p>
      <a className="mono back-top" href="#top">
        BACK TO TOP ↑
      </a>
    </footer>
  )
}
