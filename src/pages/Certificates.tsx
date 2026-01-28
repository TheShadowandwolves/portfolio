import { Fragment, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Pulse from "../components/Pulse";

// ✅ direct JSON import
import { certificate } from "../data/certfificates.json";

interface CertificateEntry {
  name: string;
  Date: string;
  url?: string;
  image: string[];
}

type CertificatesMap = Record<string, CertificateEntry>;

export default function Certificates() {
  const base = import.meta.env.BASE_URL;

  // ✅ convert object map → array once
  const certificates = useMemo<CertificateEntry[]>(() => {
    return Object.values(certificate as CertificatesMap);
  }, []);

  const [open, setOpen] = useState<{
    cert: CertificateEntry;
    index: number;
  } | null>(null);

  return (
    <Fragment>
      <Header />

      <main className="cert-page">
        <h1 className="page-title">Certificates</h1>

        <div className="cert-grid">
          {certificates.map((cert, i) => (
            <div
              key={i}
              className="cert-card"
              onClick={() => setOpen({ cert, index: 0 })}
            >
              <img
                src={`${base}certificates/${cert.image[0]}`}
                alt={cert.name}
              />

              <div className="cert-meta">
                <h3>{cert.name}</h3>
                <p>
                  {cert.Date}
                </p>

                {cert.url && cert.url !== "" && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Visit
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal gallery */}
        {open && (
          <div className="cert-modal" onClick={() => setOpen(null)}>
            <div
              className="cert-modal-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="cert-modal-header">
                <h2>{open.cert.name}</h2>
                <button onClick={() => setOpen(null)}>✕</button>
              </header>

              <img
                className="cert-full"
                src={`${base}certificates/${open.cert.image[open.index]}`}
                alt=""
              />

              {open.cert.image.length > 1 && (
                <div className="cert-thumbs">
                  {open.cert.image.map((img, idx) => (
                    <img
                      key={idx}
                      src={`${base}certificates/${img}`}
                      className={idx === open.index ? "active" : ""}
                      onClick={() =>
                        setOpen({ cert: open.cert, index: idx })
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <Pulse />
    </Fragment>
  );
}
