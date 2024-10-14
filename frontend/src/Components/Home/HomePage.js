import { useEffect } from "react";
import "./home.css";
import { getAllUsers } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'

const HomePage = () => {

  const userlist = useSelector((state) => state.users.users?.allUsers);

  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null) 
      navigate("/login");
    if(user.token != null)
      getAllUsers(user?.token, dispatch)
  }, [])
 
  const handleDelete = () => {
     
  }

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {userlist?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={handleDelete}> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
