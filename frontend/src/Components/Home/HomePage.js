import { useEffect, useState } from "react";
import "./home.css";
import { createAxios } from "../../createInstance";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { loginSuccess } from "../../redux/authSlice";

const HomePage = () => {

  const [list, setList] = useState([])

  const user = useSelector((state) => state.auth.login?.currentUser?.result);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  console.log(user);
  
  useEffect(() => {
    if (user == null) 
      navigate("/login");
  }, [])

  useEffect(()=> {
    const fetchData = async() => {
      try {
        const res = await axiosJWT.get("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setList(res.data.result)
        console.log(res.data.result);
        
      } catch (err) {
        console.log("msg: " + err);
      }
    }
    fetchData()
  }, [])
 
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {list?.map((u) => {
          return (
            <div key={u.id} className="user-container">
              <div className="home-user">{u.firstName + " " + u.lastName}</div>
              <div className="delete-user" > Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
