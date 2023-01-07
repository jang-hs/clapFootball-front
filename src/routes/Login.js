import styles from "./Login.module.css";
import React, { useContext, useState } from 'react';
import { LOGIN_USER, MatchContext } from "../contextAPI/MatchContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { dispatch } = useContext(MatchContext);
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: "",
        password: ""
      });

    const [formData, updateFormData] = useState(initialFormData);
    const handleChange = (e) => {
        updateFormData({
          ...formData,
          // Trimming any whitespace
          [e.target.name]: e.target.value.trim()
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData);
        let loginResult = await (await fetch(`${process.env.REACT_APP_SERVER_PATH || 'http://localhost:8001'}/auth/login`, {
            method: 'POST', // *GET, POST, PUT, DELETE 등
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
          })).json();
        if (loginResult.sucsess){
            console.log("로그인 완료")
            await dispatch({ type: LOGIN_USER, user: loginResult.user });
            navigate('/')
        } else {
            console.log("로그인 실패")
            alert(loginResult.message)
        }
    };

    return (
        <div className={styles['container']} id="plabContainer">
            <div className={styles['innerContainer']}>
                <div className={styles['inner']}>

                    <div className={styles['headMessage']}>
                        <h2>풋살하고 싶을 땐</h2>
                        <h2 className={styles['hlt']}>클랩풋볼</h2>
                    </div>

                    <form>
                        <fieldset>
                            <div className={styles['login_text']}>
                                <input type="text" name="email" autoFocus="" required="" id="id_username" placeholder="아이디 또는 이메일" onChange={handleChange}/>
                            </div>
                            <div className={styles['input_wrap']}>
                                <input type="password" name="password" required="" id="id_password" placeholder="비밀번호" onChange={handleChange}/>
                            </div>
                        </fieldset>
                        <div className={styles['btn_wrap']}>
                            <button type="submit" onClick={handleSubmit}>로그인</button>
                        </div>
                        <div className={styles['login_text']}>
                            <span><a href="/join">회원가입</a></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;