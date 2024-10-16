import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from '../Components/Login/LoginPage';
import RegisterPage from '../Components/Register/Register';


function AppRoutes() {

    return (
        <Router>
            <Routes>
                {/* <Route path='/' element={<HomePage/>} /> */}
                <Route path="/login" element={ <LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;