import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from '../Components/Home/Home';
import LoginPage from '../Components/Login/LoginPage';
import RegisterPage from '../Components/Register/Register';
import MyInfo from '../Components/User/MyInfo/MyInfo';
import FriendInfo from '../Components/User/FriendInfo/FriendInfo';

function AppRoutes() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path="/login" element={ <LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path='/my-info' element={<MyInfo />} />
                <Route path='/friend-info' element={<FriendInfo />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;