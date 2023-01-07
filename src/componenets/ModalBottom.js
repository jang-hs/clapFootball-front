import styles from "./Modal.module.css"
import { useContext, useEffect } from "react";
import { filterItem } from "../routes/Home";
import { MODAL_BOTTOM_OFF, SET_MODAL_BOTTOM_SELECTED_ITEM, MatchContext} from "../contextAPI/MatchContext"

const ModalBottom = (props) => {
  const { modalBottomData, modalBottomSelectedItem, dispatch } = useContext(MatchContext);
  const modalItem = filterItem[modalBottomData.title]
  
  const handleKeyPress = async (event) => {
    console.log("handleKeyPress")
    if (event.key === 'Escape') {
      await onModalOff();
    }
  }
  const onModalOff = async ()=>{
    await dispatch({type: MODAL_BOTTOM_OFF});
  }
  const onSelectItem = async (event, selectedIndex) => {
    console.log("onSelectItem")
    if (modalBottomData.checkbox) {
      let ul = event.target.parentElement.parentElement;
      let selected = Array.from(ul.children)
        .filter(li => li.getElementsByTagName('input')[0].checked)
        .map(li => li.getElementsByTagName('input')[0].value);
      await dispatch({ type: SET_MODAL_BOTTOM_SELECTED_ITEM, modalBottomSelectedItem: selected})
    }
    else {
      await dispatch({ type: SET_MODAL_BOTTOM_SELECTED_ITEM, modalBottomSelectedItem: modalItem[selectedIndex]})
      await dispatch({ type: MODAL_BOTTOM_OFF})
    }
  }
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    Array.from(document.getElementsByTagName('input'))
      .forEach(inputElem => {
        if (modalBottomSelectedItem[modalBottomData.title].includes(inputElem.value)) {
          inputElem.checked = true;
        }
        else {
          inputElem.checked = false;
        }
      })
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, []);

  return (
    <div className="modal-container" style={modalBottomData.on ? { 'display': 'block' } : { 'display': 'none' }} >
      <div className={styles["modal--mask"]} onClick={async()=>{await onModalOff()}}></div>
      <div className={`${styles["modal--wrapper"]} ${styles["isBottom"]}`}>
        <div className={styles["modal--header"]}>
          <p className={styles["modal--title"]}>{modalBottomData.title}</p>
          <p className={styles["modal--close"]} onClick={async()=>{await onModalOff()}}>X</p>
        </div>
        <div className={styles["modal--body"]} style={{ "padding": "0px 25px" }}>
          {
            modalBottomData.checkbox ? (
              <ul className={styles["checkbox-wrap"]}>
                {modalItem.map((checkItem, index) => (
                  <li key={index} className={styles["checkbox-item"]} >
                    <input type="checkbox" id={checkItem} value={checkItem} onClick={(e) => onSelectItem(e, index)} />
                    <label htmlFor={checkItem} className={styles["checkLabel"]}>
                      <span className={styles["checkbox"]}></span>
                      <p>{checkItem}</p>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles["filter--list"]}>
                {modalItem.map((item, index) => (
                  <li key={index} onClick={(e) => onSelectItem(e, index)}>
                    {item}
                  </li>
                ))}
              </ul>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default ModalBottom;