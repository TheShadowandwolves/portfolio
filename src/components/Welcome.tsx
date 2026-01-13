// Welcome section
import { Fragment, useEffect, useMemo, useState } from "react";
import logo from "/public/logo.jpg"

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

function Welcome() {
  const language = (localStorage.getItem("language") || "en") as Lang;

    const name =
    JSON.parse(localStorage.getItem("userProfile") || "{}")?.name ??
    (language === "de" ? "Welt" : "World");


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

          <button className="hire-up">{language === "de" ? "Stellen Sie mich ein" : "Hire me"}</button>
        </div>

        <div className="right-section">
          <img src={logo} alt="Logo" className="welcome-logo" />
        </div>
      </section>
    </Fragment>
  );
}

export default Welcome;
