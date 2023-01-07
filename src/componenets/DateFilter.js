import styles from "./MainFilter.module.css"
import React, { memo, useCallback, useContext, useState } from 'react';
import { MatchContext, SET_SELECT_DATE } from "../contextAPI/MatchContext"

const dateList = ['2022-07-04', '2022-07-05', '2022-07-06', '2022-07-07', '2022-07-08', '2022-07-09', '2022-07-10' ]
const week = ['일', '월', '화', '수', '목', '금', '토'];
const DateFilter = memo(() => {
    const [selectDateIndex, setSelectDateIndex] = useState(undefined);
    const { dispatch }  = useContext(MatchContext);
    const onClickDate = useCallback((event, index) => {
        if (selectDateIndex === index){
            dispatch({ type: SET_SELECT_DATE, selectDate: ''})
            setSelectDateIndex(undefined)
        }
        else {
            dispatch({ type: SET_SELECT_DATE, selectDate: dateList[index]})
            setSelectDateIndex(index)
        }
    })

    return (
        <div className={styles["tabWrap"]}>
            <div className={styles["swipe-tabs"]}>
                <ul className={`${styles['swipe-tab']} ${styles['slick-initialized']} ${styles['slick-slider']}`}>
                    <div className={styles["slick-list"]}>
                        <div className={styles["slick-track"]}>
                            {
                                dateList.map((date, index) => (
                                    <li key={'datewrap' + index} 
                                        id="datewrap" 
                                        className={selectDateIndex===index? `${styles['dateWrap']} ${styles['isActive']}` : styles["dateWrap"]} 
                                        tabIndex={index} 
                                        data-slick-index={index} 
                                        aria-hidden="false"
                                        onClick={(e) => onClickDate(e, index)}
                                        >
                                    <p>{new Date(date).getDate()}</p>
                                    <span>{week[new Date(date).getDay()]}</span>
                                </li>
                                ))
                            }
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
})

export default DateFilter;