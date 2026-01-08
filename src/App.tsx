import Test from './components/Test';
import Header from './components/Header';
import Footer from './components/Footer';
import Skills from './components/Skills';
import ListGroup from './components/ListGroup';
import { Fragment}  from 'react';

function App() {
    return (
      
        <Fragment>
            <Header language="de" />
            <Test name="Leo" />
            <Skills language="en" />
            <ListGroup items={["Item 1", "Item 2", "Item 3"]} heading="Skills" />
            <Footer language="en" />
        </Fragment>
    );
}

export default App;
