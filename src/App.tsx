import Alert from './components/Alert';
import Header from './components/Header';
import Footer from './components/Footer';
import ListGroup from './components/ListGroup';
import { Fragment, useState}  from 'react';
import Pulse from './components/Pulse';
import Welcome from './components/Welcome';
import About from './components/About';

function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
}
initializeTheme();

function initializeLanguage() {
    const savedLanguage = localStorage.getItem("language");
    if (!savedLanguage) {
        localStorage.setItem("language", "en");
    }
}
initializeLanguage();


function App() {
  const handleSelectItem = (item: string) => {
    console.log("Selected item:", item);
  };
  const [alertVisible, setAlertVisible] = useState(false);
    return (
      
        <Fragment>
            <Header/>
            {alertVisible && 
            <Alert type="info" onClose={() => setAlertVisible(false)}>
              Hello World!
            </Alert>}
            <Welcome/>
            <About/>
            <ListGroup items={["Item 1", "Item 2", "Item 3"]} heading="Skills" onSelectItem={handleSelectItem} />
            <Pulse/>
            <Footer/>
        </Fragment>
    );
}

export default App;
