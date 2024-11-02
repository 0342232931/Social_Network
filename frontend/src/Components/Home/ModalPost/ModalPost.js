import { useDispatch, useSelector } from 'react-redux';
import styles from './ModalPost.module.css';
import { useEffect, useMemo, useState } from 'react';
import { loginSuccess } from '../../../redux/authSlice';
import { createAxios } from '../../../createInstance';

function ModalPost() {

    const data = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    let axiosJwt = createAxios(data, dispatch, loginSuccess);

    const user = useSelector((state) => state.auth.login?.currentUser?.result.userResponse);
    const [avatar, setAvatar] = useState('/img/game-controller.png');
    
    const [content, setContent] = useState('');
    const [imgs, setImgs] = useState([]);


    const getAvatarUser = async (userId, axiosJwt) => {
        try {
            const res = await axiosJwt.get("http://localhost:8080/avatar/get-by-user-id/" + userId);
            
            const img = res.data?.result.data;

            setAvatar(`data:image/png;base64,${img}`)
        } catch (error) {
            console.log("error: " + error);
            
        }

    }

    function handleOnclikFile(e) {
        setImgs(e.target.files);     
        console.log(e.target.files);
        
    }

    const handleUploadImgs = useMemo(() => {
        return [...imgs].map( (img) => (
            <div key={Math.random()}>
                <img src={URL.createObjectURL(img)} alt='...' className={styles.img_style} />
            </div>
        ))
    }, [imgs]);

    useEffect(() => {
        getAvatarUser(user?.id, axiosJwt);
    }, [avatar])

    const handleSubmitForm = async (e) => {

        e.preventDefault();
        try {

            const postCreationRequest = {
                content: content,
                userId: user?.id
            }

            const res = await axiosJwt.post('http://localhost:8080/posts', postCreationRequest);
            if(res.status === 200) {
                console.log('Success');
            } else {
                console.log('Fail');
            }

            
            
            // Save imges of post
            console.log("imgs: ");
            
            console.log(imgs);
            
            for (let img of imgs){
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64data = reader.result.split(',')[1];
                    const payload = {
                        fileName: img.name,
                        fileType: img.type,
                        data: base64data
                    };

                    try {
                        const resopnse = await axiosJwt.post('http://localhost:8080/images/' + res.data?.result.id, payload)
                        if(resopnse != null) {
                            console.log("Save image success");
                            console.log(resopnse.data);
                        } else {
                            console.log('SaveIamge Fail');
                        }
                    } catch (error) {
                        console.log(error);
                    }
                };
                reader.readAsDataURL(img);
            }

            

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className={`modal fade`} id="modal_post" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className={`modal-dialog`}>
                <div className={`modal-content ${styles.container}`}>
                    <form onSubmit={handleSubmitForm}>
                        <div className="modal-header">
                            <h5 className={`modal-title ${styles.title}`} id="exampleModalLabel">Tạo bài viết</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className={styles.user_info}>
                                <img src={avatar} alt='...' className={styles.avatar}/>
                                <p className={styles.username}>{`   ${user?.firstName} ${user?.lastName}`}</p>
                            </div>
                            <textarea placeholder='Bạn đang nghĩ gì?' className={styles.textarea_style} onChange={e => setContent(e.target.value)}></textarea>
                            <div className='d-flex'>
                                {handleUploadImgs}
                            </div>
                            <div className={styles.add_imgs}>
                                <p>Thêm vào bài viết của bạn</p>
                                <label htmlFor='uploadImgs'>
                                    <img src='/img/post/gallery.png' alt='...' className={styles.icon} />
                                </label>
                                <input type="file" id='uploadImgs' name="photo" className={styles.display_none} multiple accept="image/*" onChange={handleOnclikFile} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className={`btn btn-secondary ${styles.btn_upload}`} data-bs-dismiss="modal">Đăng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalPost;