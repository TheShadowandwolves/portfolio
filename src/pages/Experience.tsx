
import Alert from '../components/Alert';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {experiences} from '../data/experience.json';

import { Fragment, useState}  from 'react';
import { ExperienceBox } from '../components/ExperienceBox';
import Pulse from '../components/Pulse';

function Experience() {
  const [alertVisible, setAlertVisible] = useState(false);
    return (
      
        <Fragment>
            <Header/>
            {alertVisible && 
            <Alert type="info" onClose={() => setAlertVisible(false)}>
              Hello World!
            </Alert>}
            <section>
            <h2 className="page-title">Experience</h2>
            {experiences.map((exp, index) => (
              <ExperienceBox
                key={index}
                title={exp.position}
                company={exp.company}
                startYear={exp.startYear}
                endYear={exp.endYear ? exp.endYear : undefined}
                details={exp.description}
                skills={exp.skills}
                place={exp.place}
                imageUrl={exp.image !== "" ? exp.image : undefined}
              />
            ))}
            </section>
            <Pulse/>
            <Footer/>
        </Fragment>
    );
}

export default  Experience;
