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
                [...projects]
                    .sort((a, b) => {
                        const aEndNull = a.endYear == null;
                        const bEndNull = b.endYear == null;
                        if (aEndNull !== bEndNull) return aEndNull ? -1 : 1; // null endYear first
                        const aStart = Number(a.startYear) || 0;
                        const bStart = Number(b.startYear) || 0;
                        if (aStart !== bStart) return bStart - aStart; // newer startYear first
                        const aEnd = a.endYear == null ? 0 : Number(a.endYear) || 0;
                        const bEnd = b.endYear == null ? 0 : Number(b.endYear) || 0;
                        return bEnd - aEnd; // newer endYear first
                    })
                    .map((project, index) => (
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
