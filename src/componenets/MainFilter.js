import styles from "./MainFilter.module.css"
import React, { memo, useContext } from 'react';
import { filterItem } from "../routes/Home";
import { MODAL_BOTTOM_ON, SET_MODAL_BOTTOM_SELECT_TYPE, SET_MODAL_BOTTOM_TITLE, MatchContext} from "../contextAPI/MatchContext"
const MainFilter = memo(() => {
    const { dispatch } = useContext(MatchContext);
    const filterKeyList = Object.keys(filterItem);
    const itemSelected = async (item) => {
        console.log("itemSelected")
        if (item === "지역"){
            await dispatch({type: SET_MODAL_BOTTOM_SELECT_TYPE, 'modalSelectType': 'single'})
        } else {
            await dispatch({type: SET_MODAL_BOTTOM_SELECT_TYPE, 'modalSelectType': 'multiple'})
        }
        await dispatch({type: SET_MODAL_BOTTOM_TITLE, 'title': item})
        await dispatch({type: MODAL_BOTTOM_ON})
    }
    return (
        <div className={styles["main--match--filter"]}>
            <div className={styles["filter--wrapper"]}>
                <ul>
                    {
                        filterKeyList.map((filterName) => (
                            <li className="" key={filterName}>
                                <span className={styles["list"]} onClick={() => { itemSelected(filterName) }}>{filterName}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
})

export default MainFilter;