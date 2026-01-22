import Alert from '../components/Alert';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackgroundAnimation from '../components/Background';
import { Fragment, useState}  from 'react';
import Pulse from '../components/Pulse';
import ProjectShow from '../components/ProjectShow';
import {projects} from '../data/projects.json';

function Projects() {
  const [alertVisible, setAlertVisible] = useState(false);
    return (
      
        <Fragment>
            <Header/>
            {alertVisible && 
            <Alert type="info" onClose={() => setAlertVisible(false)}>
              Hello World!
            </Alert>}
            <Pulse/>
            <BackgroundAnimation value='matrix'/>
            <section>
            <h2 className="page-title">Projects</h2>
            {
                projects.map((project, index) =>(
                    <ProjectShow 
                    key={index}
                    name={project.name}
                    startYear={project.startYear}
                    endYear={project.endYear || undefined}
                    description={project.desc}
                    skills={project.Skills}
                    link={project.link}
                    />
                ))
            }
            </section>
            <Footer/>
        </Fragment>
    );
}

export default  Projects;
