

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
                {language === "de" && <p>
                  Ich studiere derzeit Informatik am Jerusalem College of Technology und verfüge über mehrere Jahre praktische Erfahrung in der Softwareentwicklung. 
                  Neben meinem Studium arbeite ich kontinuierlich an eigenen Projekten - von Webanwendungen bis hin zu kreativen Tools -, 
                  die ich regelmäßig auf GitHub veröffentliche.<br/>
                  Durch Studium, Freelance- und Hobbyprojekte habe ich mir ein breites technisches Fundament aufgebaut. 
                  Ich arbeite gerne ganzheitlich - von der ersten Idee über Design und Architektur bis zur Umsetzung - ebenso wie im Team. 
                  Dabei nutze ich unter anderem Python, Java, C++, SQL, HTML/CSS und JavaScript, häufig in Kombination mit React und modernen Frameworks. 
                  Git gehört selbstverständlich zu meinem täglichen Workflow. <br/>
                  Zusätzlich bringe ich Erfahrung in Web- und Softwareentwicklung, Game Development sowie Hardware-Prototyping (Arduino) mit 
                  und fühle mich sowohl unter Windows, Linux als auch macOS sicher. Besonders motiviert mich die Zusammenarbeit in interdisziplinären Teams, 
                  um gemeinsam durchdachte, kreative und nachhaltige Softwarelösungen zu entwickeln.
                  </p>}
                  {language === "en" && <p>
                  I am currently studying Computer Science at the Jerusalem College of Technology and have several years of hands-on experience in software 
                  development. Alongside my studies, I continuously work on personal projects ranging from web applications to creative tools, 
                  which I regularly publish on GitHub. <br/>
                  Through my studies as well as freelance and personal projects, I have built a strong technical foundation. 
                  I enjoy working holistically—from initial ideas and design to architecture and implementation—both independently 
                  and within collaborative teams. My work includes Python, Java, C++, SQL, HTML/CSS, and JavaScript, often combined with React 
                  and modern frameworks. Git is a natural part of my daily workflow. <br/>
                  I also have experience in web and software development, game development, and hardware prototyping (Arduino), 
                  and I am comfortable working across Windows, Linux, and macOS. What particularly motivates me is collaborating in creative, 
                  team-oriented environments to build meaningful and well-designed software solutions.
                  </p>}
            </div>
            <div className='right-section'>
                  <img src={meMachon} alt="Leonard Blam Standing" className="transparent-logo"/>
            </div>
          </section>
        </Fragment>
    );
}

export default  About;
