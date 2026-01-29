import { useEffect, useMemo, useRef, useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";

type Review = {
  id: string;
  message: string;
  stars: number;
  createdAt?: Date;
  name?: string;
};

function toDateSafe(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (value instanceof Timestamp) return value.toDate();
  // @ts-expect-error runtime check
  if (typeof value === "object" && typeof value?.seconds === "number") {
    // @ts-expect-error runtime check
    return new Timestamp(value.seconds, value.nanoseconds ?? 0).toDate();
  }
  return undefined;
}

function Stars({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, Math.round(value || 0)));
  return (
    <div className="ref-stars" aria-label={`${v} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < v ? "star on" : "star off"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function References() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "References"),
          where("verifiedMessage", "==", true),
          orderBy("createdAt", "desc")
        );

        const snap = await getDocs(q);
        if (cancelled) return;

        const data: Review[] = snap.docs.map((d) => {
          const x = d.data() as any;
          return {
            id: d.id,
            message: String(x.Message ?? x.message ?? "").trim(),
            stars: Number(x.Stars ?? x.stars ?? 0),
            name: String(x.name ?? "").trim(),
            createdAt: toDateSafe(x.createdAt),
          };
        });

        setReviews(data);
      } catch (err) {
        console.error("Failed to load references:", err);
        if (!cancelled) setReviews([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const canShow = useMemo(() => reviews.length > 0, [reviews.length]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".ref-card");
    const amount = (card?.offsetWidth ?? 320) + 16;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="ref-wrap">
      <div className="ref-head">
        <h2 className="ref-title">References</h2>

        <div className="ref-controls">
          <button onClick={() => scrollByCard(-1)}>‹</button>
          <button onClick={() => scrollByCard(1)}>›</button>
        </div>
      </div>

      {loading && <div className="ref-loading">Loading…</div>}

      {!loading && !canShow && (
        <div className="ref-empty">No verified reviews yet.</div>
      )}

      {!loading && canShow && (
        <div className="ref-scroller" ref={scrollerRef}>
          {reviews.map((r) => (
            <article key={r.id} className="ref-card">
              <div className="ref-top">
                <Stars value={r.stars} />
                {r.name && <span className="ref-user">— {r.name}</span>}
              </div>

              {r.message ? (
                <p className="ref-message">“{r.message}”</p>
              ) : (
                <p className="ref-message ref-message-empty">
                  (No message provided)
                </p>
              )}

              {r.createdAt && (
                <div className="ref-date">
                  {r.createdAt.toLocaleDateString()}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
