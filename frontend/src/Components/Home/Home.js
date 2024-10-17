import styles from './Home.module.css';
import Navbar from "../NavBar/NavBar";
import Post from "../Post/PostForm";

function HomePage () {

    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.util}>

                </div>
                <div className={styles.post_content}>
                    <Post />
                    <Post />
                </div>
                <div className={styles.list_friend}>
                    
                </div>
            </div>
        </div>
    )
}

export default HomePage;