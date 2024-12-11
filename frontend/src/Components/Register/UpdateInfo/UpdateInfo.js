import { useState } from "react";
import styles from "./UpdateInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../../createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import { updateUserRegister } from "../../../redux/apiRequest";

const UpdateInfo = () => {
    const data = useSelector((state) => state.auth.login?.currentUser);
    const token = useSelector((state) => state.auth.login?.currentUser?.result.token);
    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const [firstname, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const request = {
            email: user?.email,
            password: user?.password, 
            firstName: firstname,
            lastName: lastName,
            dob: null,
            address: "",
            hometown: "",
            university: "",
            highSchool: "",
            phoneNumber: phoneNumber,
            job: "",
        }

        updateUserRegister(user?.id, request, dispatch, axiosJwt, navigate, token);
    }

    return (
        <div className={styles.body}>
            <form className={styles.form} onSubmit={handleSubmitForm}>
                <div className={styles.title}>Welcome</div>
                <div className={styles.subtitle}>Cùng nhau tạo tài khoản của bạn!</div>
                <div className={`${styles.input_container} ${styles.ic1}`}>
                    <input id="firstname" className={styles.input} type="text" placeholder=" " onChange={e => setFirstName(e.target.value)} />
                    <div className={styles.cut}></div>
                    <label htmlFor="firstname" className={styles.placeholder}>Họ và tên đệm</label>
                </div>
                    <div className={`${styles.input_container} ${styles.ic2}`}>
                    <input id="lastname" className={styles.input} type="text" placeholder=" " onChange={e => setLastName(e.target.value)} />
                    <div className={styles.cut}></div>
                    <label htmlFor="lastname" className={styles.placeholder}>Tên</label>
                </div>
                <div className={`${styles.input_container} ${styles.ic2}`}>
                    <input id="phone_number" className={styles.input} type="text" placeholder=" " onChange={e => setPhoneNumber(e.target.value)} />
                    <div className={`${styles.cut} ${styles.cut_short}`}></div>
                    <label htmlFor="phone_number" className={styles.placeholder}>Số điện thoại</label>
                </div>
                <button type="submit" className={styles.submit}>Xác nhận</button>
            </form>
        </div>
        
    )
}

export default UpdateInfo;