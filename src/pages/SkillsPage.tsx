import Skills from '../components/Skills';
import Alert from '../components/Alert';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackgroundAnimation from '../components/Background';
import { Fragment, useState}  from 'react';
import Pulse from '../components/Pulse';

function SkillsPage() {
  const [alertVisible, setAlertVisible] = useState(false);
    return (
      
        <Fragment>
            <BackgroundAnimation value='matrix'/>
            <Header/>
            {alertVisible && 
            <Alert type="info" onClose={() => setAlertVisible(false)}>
              Hello World!
            </Alert>}
            <Skills/>
            <Pulse/>
            <Footer/>
        </Fragment>
    );
}

export default  SkillsPage;
