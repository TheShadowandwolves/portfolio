// Welcome section
import { Fragment, useEffect, useMemo, useState } from "react";
import logo from "/public/logo.jpg"
import {getDocs, query, where, collection, limit} from "firebase/firestore";
import {auth, db} from '../config/firebase';
import { onAuthStateChanged } from "firebase/auth";
type Lang = "en" | "de";

function getTitles() {
  const en = [
    "Full-Stack Developer",
    "Software Engineer",
    "Q&A Test Engineer",
    "Frontend Developer",
  ];

  return en;
}
function handleClick() {
    const base = import.meta.env.BASE_URL;
    window.location.href = base + '#contact';
}

function Welcome() {
    const language = (localStorage.getItem("language") || "en") as Lang;

  const [name, setName] = useState("World");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user?.email) {
          setName("World");
          return;
        }

        const usersRef = collection(db, "Users");
        const q = query(
          usersRef,
          where("email", "==", user.email),
          limit(1)
        );

        const snap = await getDocs(q);

        if (!snap.empty) {
          const data = snap.docs[0].data() as any;
          setName(data.name ?? "World");
        } else {
          setName("World");
        }
      } catch (err) {
        console.error(err);
        setName("World");
      }
    });

    return () => unsub();
  }, []); // ✅ runs once, listener handles updates

  const titles = useMemo(() => getTitles(), [language]);

  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    // reset index when language changes (or titles list changes)
    setTitleIndex(0);

    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 5500); // change every 2.5 seconds

    return () => clearInterval(interval);
  }, [titles]);

  return (
    <Fragment>
      <section id="welcome" className="welcome-section">
        <div className="left-section">
          <h3>{language === "de" ? `Hallöchen ${name}, ich bin` : `Hello ${name}, I'm`}</h3>
          <h1>Leonard Blam</h1>

          {/* rotating profession */}
          <h4 className="profession-title" key={titleIndex}>
            {titles[titleIndex]}
          </h4>

          <button className="hire-up" onClick={handleClick}>{language === "de" ? "Stellen Sie mich ein" : "Hire me"} </button>
        </div>

        <div className="right-section">
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>
      </section>
    </Fragment>
  );
}

export default Welcome;
