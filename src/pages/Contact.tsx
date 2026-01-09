import Test from '../components/Test';
import Alert from '../components/Alert';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { Fragment, useState}  from 'react';

function Contact() {
  const [alertVisible, setAlertVisible] = useState(false);
    return (
      
        <Fragment>
            <Header/>
            {alertVisible && 
            <Alert type="info" onClose={() => setAlertVisible(false)}>
              Hello World!
            </Alert>}
            <button onClick={() => setAlertVisible(true)}>Show Alert</button>
            <Test name="Contact"/>
            <Footer/>
        </Fragment>
    );
}

export default  Contact;
