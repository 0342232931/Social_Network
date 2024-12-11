import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from '../Components/Home/Home';
import LoginPage from '../Components/Login/LoginPage';
import RegisterPage from '../Components/Register/Register';
import MyInfo from '../Components/User/MyInfo/MyInfo';
import FriendInfo from '../Components/User/FriendInfo/FriendInfo';
import FriendPage from '../Components/Friend/FriendPage';
import FriendRequest from '../Components/Friend/FriendRequest/FriendRequest';
import Suggest from '../Components/Friend/Suggest/Suggest';
import Friends from '../Components/Friend/Friends/Friends';
import ChatRoom from '../Components/ChatRoom/ChatRoom';
import SearchComponent from '../Components/NavBar/SearchComponent/SearchComponent';
import UpdateInfo from '../Components/Register/UpdateInfo/UpdateInfo';

function AppRoutes() {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path="/login" element={ <LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path='/my-info' element={<MyInfo />} />
                <Route path='/friend-info' element={<FriendInfo />} />
                <Route path='/friend-page' element={<FriendPage />} />
                <Route path='/friend-request' element={<FriendRequest />} />
                <Route path='/suggest' element={<Suggest />} />
                <Route path='/friends' element={<Friends />} />
                <Route path='/chat' element={<ChatRoom />}/>
                <Route path='/search' element={<SearchComponent />} />
                <Route path='/update-info' element={<UpdateInfo />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes;