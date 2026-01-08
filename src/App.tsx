import Test from './components/Test';
import Header from './components/Header';
import Footer from './components/Footer';
import Skills from './components/Skills';
import { Fragment}  from 'react';

function App() {
    return (
      
        <Fragment>
            <Header language="en" />
            <Test name="Leo" />
            <Skills language="en" />
            <Footer language="en" />
        </Fragment>
    );
}

export default App;
