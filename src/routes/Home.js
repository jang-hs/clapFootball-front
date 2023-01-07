import { useEffect, useState, useContext } from "react";
import Match from "../componenets/Match";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import ModalBottom from "../componenets/ModalBottom";
import MainFilter from "../componenets/MainFilter";
import { LOGOUT_USER, MatchContext } from "../contextAPI/MatchContext"
import DateFilter from "../componenets/DateFilter";
import MainHeader from "../componenets/MainHeader";

export const filterItem = {
  // "지역": ["모든 지역", "서울", "경기/강원", "인천", "대전/세종/충청", "대구/경북", "부산/울산/경남", "광주/전라", "제주", ],
  "성별": ["남자", "여자",],
  "레벨": ["비기너3 이하", "아마추어2 이상", "일반",]
}

function Home(state) {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const { dispatch } = useContext(MatchContext);
  const { user, modalBottomData, modalBottomSelectedItem, selectDate } = state.state;

  const getMatches = async () => {
    console.log("getMatches")
    console.log(state)
    let matchData = await (
      await fetch(`${process.env.REACT_APP_SERVER_PATH || 'http://localhost:8001'}/match`)
    ).json();
    matchData.forEach(match => {
      // 경기 마감 여부
      if (match.Players.length < match.optionSize - 3) {
        match.isHurry = false;
        match.isEnded = false;
      }
      else if ((match.optionSize - 3 <= match.Players.length) && (match.Players.length < match.optionSize)) {
        match.isHurry = true;
        match.isEnded = false;
      }
      else if (match.optionSize === match.Players.length) {
        match.isHurry = false;
        match.isEnded = true;
      }
    })
    // 성별 필터
    if (modalBottomSelectedItem['성별'].length === 1 && modalBottomSelectedItem['성별'].includes('남자')) {
      matchData = matchData.filter(match => match.optionSex === 'isMen');
    }
    if (modalBottomSelectedItem['성별'].length === 1 && modalBottomSelectedItem['성별'].includes('여자')) {
      matchData = matchData.filter(match => match.optionSex === 'isWomen');
    }
    // 레벨 필터
    if (modalBottomSelectedItem['레벨'].length !== 0) {
      let matchCondition = modalBottomSelectedItem['레벨'];
      if (matchCondition.includes('일반')) {
        matchCondition.push('모든 레벨');
      }
      matchData = matchData.filter(match => matchCondition.includes(match.optionLevel));
    }
    // 날짜 필터
    if (selectDate !== '') {
      matchData = matchData.filter(match => match.scheduleDate === selectDate);
    }
    setMatches(matchData);
    setLoading(false);
  };

  useEffect(() => {
    getMatches();
  }, [modalBottomSelectedItem, selectDate, user]);
  return (
    loading ? (
      <div className={styles.container}>
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      </div>
    ) : (
      <div className={styles.container}>
          <MainHeader></MainHeader>
          <div id="dateNav" className={styles['sub-header']} >
            <DateFilter></DateFilter>
            <MainFilter></MainFilter>
          </div>
          <div className={styles['list__match_schedule__container']}>
            {matches.map((match) => (
              <Match
                key={match.id}
                id={match.id}
                scheduleTime={match.scheduleTime}
                scheduleInfo={match.scheduleInfo}
                optionSex={match.optionSex}
                optionSize={match.optionSize}
                optionMatch={match.optionMatch}
                optionLevel={match.optionLevel}
                isHurry={match.isHurry}
                isEnded={match.isEnded}
              />
            ))}
          </div>
          {
            modalBottomData.on ?
              (<ModalBottom></ModalBottom>) :
              (<></>)
          }
      </div>
    )
  );
}
export default Home;
