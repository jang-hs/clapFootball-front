import styles from "./Login.module.css";
import { useState } from "react";

function Join() {
    const initialFormData = Object.freeze({
        email: "",
        password1: "",
        password2: "",
        nick:"",
        sex: ""
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
        let joinResult = await (await fetch(`${process.env.REACT_APP_SERVER_PATH || 'http://localhost:8001'}/auth/join`, {
            method: 'POST', // *GET, POST, PUT, DELETE 등
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
          })).json();
        if (joinResult.sucsess){
            console.log("가입 완료")
        } else {
            console.log("가입 실패")
            console.log(joinResult.message)
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
                    <form id="registerForm">
                        <div className={styles['inputWrap']}>
                            <label>이메일</label>
                            <input type="text" name="email" maxLength="150" autoFocus="autofocus" required="required" id="id_username" onChange={handleChange}></input>
                        </div>
                        <div className={styles['inputDWrap']}>
                            <div className={styles['inputWrap50']}>
                                <label>비밀번호</label>
                                <input type="password" name="password1" required="required" id="id_password1" className={styles['inputFull']} onChange={handleChange}></input>
                            </div>
                            <div className={styles['inputWrap50']}>
                                <label>비밀번호 확인</label>
                                <input type="password" name="password2" required="required" id="id_password2" className={styles['inputFull']} onChange={handleChange}></input>
                            </div>
                        </div>
                    
                        <div className={styles['inputDWrap']}>
                            <div className={styles['inputWrap50']}>
                                <label>이름</label>
                                <input type="text" name="nick" required="required" id="id_name" className={styles['inputFull']} onChange={handleChange}></input>
                            </div>
                            <div className={styles['inputWrap50']}>
                                <label>성별</label>
                                <select name="sex" id="id_sex" className={styles['inputFull']} onChange={handleChange}>
                                    <option value="">선택</option>
                                    <option value="M">남성</option>
                                    <option value="W">여성</option>
                                </select>
                            </div>
                        </div> 
                        <div className={styles['btnWrap']}>
                            <button type="submit" className={`${styles['btn']} ${styles['submit']}`} onClick={handleSubmit}>회원 가입</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}
export default Join;