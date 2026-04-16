

import { Fragment}  from 'react';
import meMachon from "/public/meMachon.png"


function About() {
    let language = (localStorage.getItem("language") || "en") as "en" | "de";
    let title = language === "de" ? "Über mich" : "About me";
    let subtitle = language === "de" ? "Mein Name ist " : "My name is ";
    return (
      
        <Fragment>
          <div className='about-title-div'>
            <h2 className="page-title about-title">{title}</h2> 
          </div>
          
          <section id='AboutId'>
              
            
            <div className='left-section'>
                <h3>{subtitle} Leonard Blam,</h3>
                {language === "de" && <div>
                   <p>
                   Durch mein Informatikstudium und verschiedene eigene Projekte habe ich bereits in unterschiedlichen Bereichen der Softwareentwicklung praktische Erfahrung gesammelt. Ich arbeite gerne strukturiert, denke lösungsorientiert und lege Wert auf saubere technische Umsetzung. Besonders spannend finde ich es, Ideen in funktionierende Anwendungen, Spiele oder andere technische Lösungen umzusetzen.
                   </p>
                   <br/>
                   <h3>Zielsetzung:</h3>
                    <p>Ich möchte mein Wissen in der Informatik weiter ausbauen und es in spannenden Projekten praktisch anwenden. Mir ist wichtig, Lösungen zu entwickeln, die gut durchdacht, sauber umgesetzt und wirklich nützlich sind. Langfristig möchte ich mich fachlich weiterentwickeln, neue Erfahrungen sammeln und meine Kenntnisse besonders in der Webentwicklung gezielt vertiefen.
                    </p>
                   </div>}
                {language === "en" &&  <div>
                  <p>
                  Through my computer science studies and various personal projects, I have already gained practical experience in different areas of software development. I enjoy working in a structured way, thinking in a solution-oriented manner, and placing great value on clean technical implementation. What especially motivates me is turning ideas into working applications, games, or other technical solutions.
                  </p>
                  <br/>
                  <h3>Objective:</h3>
                    <p> I want to further expand my knowledge in computer science and apply it practically in exciting projects. It is important to me to develop solutions that are well thought out, cleanly implemented, and truly useful. In the long term, I want to continue developing professionally, gain new experiences, and deepen my knowledge, especially in web development.
                    </p>
                   </div>}
                  
            </div>
            <div className='right-section'>
                  <img src={meMachon} alt="Leonard Blam Standing" className="transparent-logo"/>
            </div>
          </section>
        </Fragment>
    );
}

export default  About;
