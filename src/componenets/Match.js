import React, { memo } from 'react';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./Match.module.css"
import {OPTION_SEX_DICT, MATCH_STATE_DICT} from "../contextAPI/MatchContext"

const Match = memo(({ id, scheduleTime, scheduleInfo, optionSex, optionSize, optionMatch, optionLevel, isHurry, isEnded }) => {
  const navigate = useNavigate();
  let matchStatus = 'isOpen';
  if (isHurry) {
    matchStatus = 'isHurry';
  }
  if (isEnded) {
    matchStatus = 'isFull';
  }
  return (
    <li className={styles['list--match-schedule--item']} onClick={() => { navigate(`/match/${id}`) }}>
      <div className={styles['list--match-schedule__time']}>
        <p>{scheduleTime}</p>
      </div>
      <div className={styles['list--match-schedule__info']}>
        <div className={styles['match-list__title']}>
          <h3>{scheduleInfo}</h3>
        </div>
        <div className={styles['label--match-option']}>
          <span className={`${styles['match--option']} ${styles[optionSex]}`}>{
            OPTION_SEX_DICT[optionSex]
          }</span>
          {/*<span>{optionSize}</span>*/}
          <span>{optionMatch}</span>
          <span>{optionLevel}</span>
        </div>
      </div>
      <div className={styles['list--match-schedule__status']}>
        <div className={`${styles['match-status']} ${styles[matchStatus]}`}>
          <p>{MATCH_STATE_DICT[matchStatus]}</p>
        </div>
      </div>
    </li>
  );
});

Match.propTypes = {
  id: PropTypes.number.isRequired,
  scheduleTime: PropTypes.string.isRequired,
  scheduleInfo: PropTypes.string.isRequired,
  optionSex: PropTypes.string.isRequired,
  optionSize: PropTypes.number.isRequired,
  optionMatch: PropTypes.string.isRequired,
  optionLevel: PropTypes.string.isRequired,
  isHurry: PropTypes.bool.isRequired,
};

export default Match;
