import styles from "./MainHeader.module.css"
import React, { useContext } from 'react';
import { Link } from "react-router-dom";

import { LOGOUT_USER, MatchContext } from "../contextAPI/MatchContext"
const MainHeader = () => {
    const { user, dispatch } = useContext(MatchContext);
    const onClickLogout = () => {
        dispatch({type: LOGOUT_USER})
    }
    return (
        <div className={`${styles['navbar']}`} id="navbar-main">
            <div className={`${styles['navContainer']} ${styles['home']}`}>
                <div className={`${styles['newLogo']} ${styles['main']}`}>
                    <a href="/">
                        <p className={styles["main"]}>클랩풋볼!</p>
                    </a>
                </div>
                <div id="userMenu" className={styles["top--menu"]}>
                    <div className={styles["mainTab"]}> 
                    {
                        user.id? (
                            <p className={styles["btn__log"]} onClick={onClickLogout}>로그아웃</p>     
                        ):(
                            <Link to={'/login'}><p className={styles["btn__log"]}>로그인</p></Link>
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainHeader;