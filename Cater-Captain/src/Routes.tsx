import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';

const Routes: React.FC = () => {

    return (
        <Router>
            
                <Route path='/Home' element={<Home />} />
                <Route path='/Signup' element={<Signup />} />
            
        </Router>
    );
};

export default Routes;