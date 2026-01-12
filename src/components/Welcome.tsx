// Welcome section
import { Fragment } from "react";

function professionName(language: string){
    return "Full-Stack Developer";
}

function Welcome(){
    let language = (localStorage.getItem("language") || "en") as "en" | "de";
    let name = (localStorage.getItem("name") || (language == "de" ? "Welt" : "World"));
    return (
        <Fragment>
            <section id="welcome" className="welcome-section">
                <div className="left-section">
                    <h3>{language == "de" ? ("Hallöchen " + name + ", ich bin") : ("Hello " + name + ", I'm") }</h3>
                    <h1>Leonard Blam</h1>
                    <h4>{professionName(language)}</h4>
                    <button className="hire-up">{language == "de" ? "Stellen Sie mich ein" : "Hire me"}</button>
                </div>
                <div className="right-section">
                    <img src="./public/logo.jpg" alt="Logo" className="welcome-logo"/>
                </div>
            </section>
        </Fragment>
    )
}
export default Welcome;