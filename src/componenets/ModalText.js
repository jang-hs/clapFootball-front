import styles from "./Modal.module.css"
import { useContext, useEffect } from "react";
import { MODAL_TEXT_OFF, MatchContext} from "../contextAPI/MatchContext"

const ModalText = (props) => {
  const { modalTextData, dispatch } = useContext(MatchContext);
  console.log(modalTextData)
  
  const handleKeyPress = async (event) => {
    console.log("handleKeyPress")
    if (event.key === 'Escape') {
      await onModalOff();
    }
  }
  const onModalOff = async ()=>{
    await dispatch({type: MODAL_TEXT_OFF});
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, []);
  return (
    <>
      <div className={styles['modal__container']} style={modalTextData.on ? { 'display': 'block' } : { 'display': 'none' }}>
        <div className={styles['modal--mask']} onClick={async () => { await onModalOff() }}></div>
        <div className={`${styles['modal--wrapper']} ${styles['fit_height']}`}>
          <div className={styles['modal__header']}>
            <div className={styles['modal__title']}>
              <h3>{modalTextData.title}</h3>
            </div>
            <div className={styles['modal__close']} onClick={async()=>{await onModalOff()}}>
            </div>
          </div>
          {
            modalTextData.type === 'text'? (
              <div className={styles['modal--body']} style={{'font-size':'13px'}}>
                {modalTextData.content}
              </div>
            ): modalTextData.type === 'list'? (
              <ul>
                {modalTextData.content.map(sContent => <li className={styles['list__item-disc']}>{sContent}</li>)}
              </ul>
            ) : (
              <div></div>
            )
          }
        </div>
      </div>
    </>
  );
};



export default ModalText;