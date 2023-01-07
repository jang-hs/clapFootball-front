import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Stadium from "../componenets/Stadium";
import MatchContextAPI from "../contextAPI/MatchContext"

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [match, setMatch] = useState({});
  const getMatch = async () => {
    console.log("getMatch")
    const matchInfo = await (
      await fetch(`${process.env.REACT_APP_SERVER_PATH || 'http://localhost:8001'}/match/${id}`)
    ).json();
    setMatch(prevMatch => ({ ...prevMatch, ...matchInfo.match }));
    console.log(match)
    setLoading(false);
  };
  useEffect(() => {
    getMatch();
  }, []);
  const { optionEnd, optionLevel, optionSex, optionSize, optionMatch, scheduleDate, scheduleInfo, scheduleTime, stadiumId } = match;

  return (
    <>
      {(loading || !match) ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <Stadium key={id}
            matchId={id}
            optionEnd={optionEnd}
            optionLevel={optionLevel}
            optionSex={optionSex}
            optionSize={optionSize}
            optionMatch={optionMatch}
            scheduleDate={scheduleDate}
            scheduleInfo={scheduleInfo}
            scheduleTime={scheduleTime}
            stadiumId={stadiumId}
          ></Stadium>
        </div>
      )}
    </>
  )
}
export default Detail;
