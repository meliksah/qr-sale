import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Beko1000RPanel from './Beko1000RPanel/Beko1000RPanel';
import AltayPanel from './AltayPanel/AltayPanel'
import { Provider } from 'react-redux';
import configureStore from "./store";

const store = configureStore();
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Route exact path='/' component={Beko1000RPanel} />
                    <Route path='/altay' component={AltayPanel} />
                </Router>
            </Provider>

        );
    }
}
export default App;