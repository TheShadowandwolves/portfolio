
import Alert from '../components/Alert';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { EducationBox } from '../components/EducationBox';
import { schools } from '../data/education.json';

import { Fragment, useState}  from 'react';
import Pulse from '../components/Pulse';
import BackgroundAnimation from '../components/Background';

function Education() {
  const [alertVisible, setAlertVisible] = useState(false);
    return (
      
        <Fragment>
          <BackgroundAnimation value="matrix"/>
            <Header/>
            {alertVisible && 
            <Alert type="info" onClose={() => setAlertVisible(false)}>
              Hello World!
            </Alert>}
            <section>
            <h2 className="page-title">Education</h2>
            {schools.map((school, index) => (
              <EducationBox 
                key={index}
                school={school.name}
                degree={school.degree? school.degree : undefined}
                fieldOfStudy={school.fieldOfStudy}
                startDate={school.startYear}
                endDate={school.endYear ? school.endYear : undefined}
                details={school.description}
              />
            ))}
            </section>
            <Pulse/>
            <Footer/>
        </Fragment>
    );
}

export default  Education;
