import { Fragment, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pulse from "../components/Pulse";
import { CERTIFICATES } from "../data/certfificates";

type CertItem = { title: string; src: string };

function prettifyFilename(file: string) {
  const noExt = file.replace(/\.(png|jpe?g|webp|svg)$/i, "");
  return noExt
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Certificates() {
  const base = import.meta.env.BASE_URL; // important for GitHub Pages

  const certificates: CertItem[] = useMemo(
    () =>
      CERTIFICATES.map((file) => ({
        title: prettifyFilename(file),
        src: `${base}certificates/${file}`,
      })),
    [base]
  );

  const [open, setOpen] = useState<CertItem | null>(null);

  return (
    <Fragment>
      <Header />

      <main className="cert-page">
        <div className="cert-hero">
          <h1>Certificates</h1>
          <p>All my certificates in one place.</p>
        </div>

        {certificates.length === 0 ? (
          <div className="cert-empty">
            <p>Add filenames to <code>src/data/certificates.ts</code>.</p>
          </div>
        ) : (
          <div className="cert-grid">
            {certificates.map((c) => (
              <button
                key={c.src}
                className="cert-card"
                onClick={() => setOpen(c)}
                type="button"
                aria-label={`Open certificate ${c.title}`}
              >
                <img className="cert-thumb" src={c.src} alt={c.title} />
                <div className="cert-meta">
                  <h3>{c.title}</h3>
                  <span>Click to view</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {open && (
          <div className="cert-modal" onClick={() => setOpen(null)}>
            <div className="cert-modal-inner" onClick={(e) => e.stopPropagation()}>
              <div className="cert-modal-header">
                <h2>{open.title}</h2>
                <button
                  className="cert-close"
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <img className="cert-full" src={open.src} alt={open.title} />

              <div className="cert-modal-actions">
                <a
                  className="cert-download"
                  href={open.src}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in new tab
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <Pulse />
    </Fragment>
  );
}
