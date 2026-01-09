import Alert from '../components/Alert';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LanguageGroup from '../components/LanguageGroup';
import { Fragment, useState}  from 'react';

function Languages() {
  const [alertVisible, setAlertVisible] = useState(false);
    return (
      
        <Fragment>
            <Header/>
            {alertVisible && 
            <Alert type="info" onClose={() => setAlertVisible(false)}>
              Hello World!
            </Alert>}
            <button onClick={() => setAlertVisible(true)}>Show Alert</button>
            <LanguageGroup/>
            <Footer/>
        </Fragment>
    );
}

export default  Languages;
