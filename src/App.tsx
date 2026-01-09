import Test from './components/Test';
import Header from './components/Header';
import Footer from './components/Footer';
import Skills from './components/Skills';
import ListGroup from './components/ListGroup';
import { Fragment}  from 'react';

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
    return (
      
        <Fragment>
            <Header/>
            <Test name="Leo" />
            <Skills/>
            <ListGroup items={["Item 1", "Item 2", "Item 3"]} heading="Skills" onSelectItem={handleSelectItem} />
            <Footer/>
        </Fragment>
    );
}

export default App;
