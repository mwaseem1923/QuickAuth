import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import withAuthentication from './hoc/withAuthentication';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';


const AuthenticatedDashboard = withAuthentication(Dashboard);

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<AuthenticatedDashboard />} />
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </PersistGate>
    </Provider>
);

export default App;
