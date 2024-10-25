import styles from './FriendPage.module.css';
import Navbar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';

function FriendPage () {

    return (
        <div>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.util}>
                    <h3 className={styles.header}>Bạn bè</h3>
                    <Link to='/friend-page' className={styles.item_component}>
                        <img src='/img/friend/friend.png' alt='...' className={styles.icon}/>
                        <h4 className={styles.header_style}>Trang chủ</h4>
                    </Link>
                    <Link to='/friend-request' className={styles.item_component}>
                        <img src='/img/friend/add-user.png' alt='...' className={styles.icon}/>   
                        <h4 className={styles.header_style}>Lời mời kết bạn</h4>
                    </Link>
                    <Link to='/suggest' className={styles.item_component}>
                        <img src='/img/friend/user-friendly.png' alt='...' className={styles.icon}/>
                        <h4 className={styles.header_style}>Gợi ý</h4>
                    </Link>
                    <Link to='/friends' className={styles.item_component}>
                        <img src='/img/friend/friendlist.png' alt='...' className={styles.icon}/>
                        <h4 className={styles.header_style}>Tất cả bạn bè</h4>
                    </Link>
                    <Link to='#' className={styles.item_component}>
                        <img src='/img/friend/gift.png' alt='...' className={styles.icon}/>
                        <h4 className={styles.header_style}>Sinh nhật</h4>
                    </Link>
                    <Link to='#' className={styles.item_component}>
                        <img src='/img/friend/friendlist.png' alt='...' className={styles.icon}/>
                        <h4 className={styles.header_style}>Danh sách tùy chỉnh</h4>
                    </Link>
                </div>
                <div className={styles.content}>
                    <div className={styles.friend_request_container}>
                        <div className={styles.header_friend_request}>
                            <h4 className={styles.header_title}>Lời mời kết bạn</h4>
                            <Link to='#' className={styles.see_all_request}>Xem tất cả</Link>
                        </div>
                        <div className={styles.container_friend_request}>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Xác nhận</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Xác nhận</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Xác nhận</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Xác nhận</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Xác nhận</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Xác nhận</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>      
                    </div>
                    <div className={styles.friend_request_container}>
                        <div className={styles.header_friend_request}>
                            <h4 className={styles.header_title}>Gợi ý</h4>
                            <Link to='#' className={styles.see_all_request}>Xem tất cả</Link>
                        </div>
                        <div className={styles.container_friend_request}>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                            <div className={`card ${styles.element_child}`}>
                                <img src="/img/house.png" className={`card-img-top ${styles.img_card}`} alt="..." />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.card_title}`}>User Name</h5>
                                    <div className={styles.button_card}>
                                        <button className="btn btn-primary">Thêm bạn</button>
                                        <button className="btn btn-secondary">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendPage;