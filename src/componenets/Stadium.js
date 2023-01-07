import { useCallback, useEffect, useState, useContext } from "react";
import { MatchContext, MODAL_TEXT_ON, OPTION_SEX_DICT } from "../contextAPI/MatchContext"
import styles from "./Stadium.module.css"
import ModalText from "./ModalText"
const Stadium = ({ matchId, optionEnd, optionLevel, optionSex, optionMatch, optionSize, scheduleDate, scheduleInfo, scheduleTime, stadiumId }) => {
    console.log(matchId, optionEnd, optionLevel, optionSex, optionSize, scheduleDate, scheduleInfo, scheduleTime, stadiumId)
    const [loading, setLoading] = useState(true);
    const [stadium, setStadium] = useState({});
    const { modalTextData, user, dispatch } = useContext(MatchContext);

    const getStadium = async () => {
        console.log("getMatch")
        const stadiumInfo = await (
          await fetch(`${process.env.REACT_APP_SERVER_PATH || 'http://localhost:8001'}/stadium/${stadiumId}`)
        ).json();
        setStadium(prevStadium => ({...prevStadium, ...stadiumInfo.stadiumData}));
        console.log(stadiumInfo.stadiumData)
        setLoading(false);
    };
    const showModal = async (title, type, content) => {
        await dispatch({type: MODAL_TEXT_ON, modalTitle: title, modalType:type, modalContent:content})
    }
    useEffect(() => {
        getStadium();
    }, []);

    const onClickApplyMatch = async () => {
        let applyMatchInfo = await (await fetch(`${process.env.REACT_APP_SERVER_PATH || 'http://localhost:8001'}/player`, {
            method: 'POST', // *GET, POST, PUT, DELETE 등
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {   
                    userId: user.id,
                    matchId: matchId,
                }
            ), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
          })).json();
        if (applyMatchInfo.sucsess){
            alert('매치 신청 완료')
        } else{
            alert(applyMatchInfo.message)
        }
        console.log(applyMatchInfo)
    }

    const showmap = () => {
        console.log("showmap")
    }
    
    const getDtString = useCallback((date, time) => {
        let dt = new Date(date + ' ' +time)
        let day = `${dt.getDay()===1?'월':dt.getDay()===2?'화 ':dt.getDay()===3?'수':dt.getDay()===4?'목':dt.getDay()===5?'금':dt.getDay()===6?'토':'일'}요일`
        let dtString = `${dt.getMonth()+1}월 ${dt.getDate()}일 ${day} ${time}`
        return dtString
    },[])
    return (
    <>
        {
            (loading || !stadium) ? (
                <div>
                <span>Loading...</span>
                </div>
            ) : (
                <div className={styles['matchDetailApp']}>
                    <div className={styles['content__wrap']}>
                        <div className={styles['content__body']}>
                            <div className={styles['content-body__wrap']}>
                                <section className={styles['section-mobile']}>
                                    <div className={styles['matchTime']}>
                                        <p>{getDtString(scheduleDate,scheduleTime)}</p>
                                    </div>
                                    <div className={styles['matchPlace']}>
                                        <h1 className={`${styles['txtH']} ${styles['w700h']}`}>
                                            <a href="/stadium/26/matches/">{stadium.name}</a></h1>
                                        <div className={styles['wtgTool']}>
                                            <p className={styles['txt1']}>{stadium.address}</p>
                                            <p id="copy-url1" className={styles['txt1']} >주소 복사</p>
                                            <p id="toggleMap" onClick={showmap} className={styles['txt1']} >지도 보기</p>
                                        </div>
                                    </div>
                                    <div className={styles['match-info__fee']}>
                                        <div className={styles['matchFee']}>
                                            <div>
                                                <span className={styles['matchFee__money']}>10,000원</span>
                                                <span> / 2시간</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className={styles['section']}>
                                    <div className={styles['section__header']}>
                                        <div className={styles['section__title']}>
                                            <h3>매치 포인트</h3>
                                        </div>
                                    </div>
                                    <div id="mnRule" className={`${styles['info__list__wrapper']} ${styles['double']}`}>
                                        <ul>
                                            <li className={styles['info__list']}>
                                                <img src="/assets/image/ic_info_level.svg" alt="레벨" className={styles['icon']} />
                                                <div><p className={styles['']}>{optionLevel}</p></div>
                                            </li>
                                            <li className={styles['info__list']}>
                                                <img src="/assets/image/ic_info_gender.svg" alt="성별" className={styles['icon']} />
                                                <div><p>{OPTION_SEX_DICT[optionSex]}</p></div>
                                            </li>
                                            <li className={styles['info__list']}>
                                                <img src="/assets/image/ic_info_stadium.svg" alt="경기" className={styles['icon']} />
                                                <div><p>{optionMatch}</p></div>
                                            </li>
                                            <li className={styles['info__list']}>
                                                <img src="/assets/image/ic_info_max_player_cnt.svg" alt="인원" className={styles['icon']} />
                                                <div><p>{optionSize}명</p></div>
                                            </li>
                                            <li className={styles['info__list']}>
                                                <img src="/assets/image/ic_info_shoes.svg" alt="신발" className={styles['icon']} />
                                                <div><p>풋살화/운동화</p></div>
                                            </li>
                                        </ul>
                                    </div>
                                </section>
                                <section id="mnFeature" className={styles['section']}>
                                    <div className={styles['section__header']}>
                                        <div className={styles['section__title']}>
                                            <h3>경기장 정보</h3>
                                        </div>
                                    </div>
                                    <div className={`${styles['info__list__wrapper']} ${styles['double']}`}>
                                        <ul>
                                            <li className={styles['info__list']}>
                                                <img src="/assets/image/ic_info_stadium.svg" alt="경기" className={styles['icon']} />
                                                <div><p>{stadium.size}</p></div>
                                            </li>
                                            <li className={styles['info__list']}>
                                                <img src="/assets/image/ic_info_shower.svg" alt="샤워실" className={stadium.isShower? styles['icon']: `${styles['icon']} ${styles['no']}`} />
                                                <div><p className={stadium.isShower? '' :styles['title__line']}>샤워실</p></div>
                                            </li>
                                            <li className={styles['info__list']} >
                                                <img src="/assets/image/ic_info_car.svg" alt="주차" className={stadium.parkingOption? styles['icon']: `${styles['icon']} ${styles['no']}`} />
                                                <div><p className={stadium.parkingOption ? styles['link'] : styles['title__line']} onClick={stadium.parkingInfo ? async () => { await showModal('무료주차', 'text', stadium.parkingInfo) } : undefined}>무료주차</p></div>
                                            </li>
                                            <li className={styles['info__list']}>
                                                <img src="/assets/image/ic_info_shoes.svg" alt="신발" className={stadium.shoesInfo? styles['icon']: `${styles['icon']} ${styles['no']}`} />
                                                <div><p className={stadium.shoesInfo? '' :styles['title__line']}>풋살화 대여</p></div>
                                            </li>
                                            <li className={styles['info__list']}>
                                                <img src="/assets/image/ic_info_clothes.svg" alt="운동복" className={stadium.clothesOption? styles['icon']: `${styles['icon']} ${styles['no']}`} />
                                                <div><p className={stadium.clothesOption? '' :styles['title__line']}>운동복 대여</p></div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={styles['stadInner']}>
                                        <div className={styles['matchRule']}>
                                            <h4>구장 특이사항</h4>
                                            <pre className={styles['txt2']}> {stadium.stadiumInfo}</pre>
                                        </div>
                                    </div>
                                </section>
                                <section id="mnCaution" className={styles['section']}>
                                    <div className={styles['section__header']}>
                                        <div className={styles['section__title']}>
                                            <h3>매치 안내</h3>
                                        </div>
                                    </div>
                                    <div className={`${styles['stadInner']} ${styles['section__body']}`}>
                                        <ul className={styles['matchRule']}>
                                            <h4>일반</h4>
                                            <li>매치 시작 1시간 30분 전까지 최소 인원(10명) 미달 시 매치가 취소 됩니다. 취소 시 카카오톡을 통해 안내드리며 캐시는 전액 환급됩니다.</li>
                                        </ul>
                                        <ul className={styles['matchRule']}>
                                            <h4>특수 (우천)</h4>
                                            <li>전날 기준 기상청 날씨누리 기준 해당 지역 1mm 이상의 예보가 있는 경우 매치 당일 00시 부터 환급 기준이 변경 됩니다.</li>
                                            <li>인원이 모집되는 경우 우천 시에도 진행됩니다.</li>
                                            <li>진행이 확정되었지만 매치 진행에 변동이 있을 경우 매치 시작 1시간 전까지 안내드립니다.</li>
                                            <li>매치 시작 1시간 30분 전까지 취소하지 않고 불참하면 페어플레이 포인트가 차감되어 향후 이용에 제한이 있습니다. </li>
                                            <li>매치 중 플레이가 어려울 정도로 비가 오는 경우에는 현장에서 매니저 판단하에 종료 될 수 있으며, 진행되지 않은 시간만큼 부분 환급 처리됩니다.</li>
                                        </ul>
                                    </div>
                                </section>
                            </div>
        
                            <div className={styles['content-right-body__wrap--sticky']}>
                                <div className={styles['section-pc']}>
                                    <div className={styles['matchTime']}>
                                        <p>{getDtString(scheduleDate,scheduleTime)}</p>
                                    </div>
                                    <div className={styles['matchPlace']}>
                                        <h1 className={styles['txtH w700h']}>
                                            <a href="/stadium/149/matches/">{stadium.name}</a>
                                        </h1>
                                        <div className={styles['wtgTool']}>
                                            <p className={styles['txt1']}>{stadium.address}</p>
                                            {/* <p id="copy-url1" className={styles['txt1']} >주소 복사</p>
                                            <p id="toggleMap" onClick={() => showmap()} className={styles['txt1']} >지도 보기</p> */}
                                        </div>
                                    </div>
                                    <div className={styles['match-info__fee']}>
                                        <div className={styles['matchFee']}>
                                            <div>
                                                <span className={styles['matchFee__money']}>10,000원</span>
                                                <span> / 2시간</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['match-apply__wrap']}>
                                    <div className={styles['btnWrap']}>
                                        
                                            {
                                                optionEnd===0?
                                                ( <a onClick={onClickApplyMatch} className={`${styles['btn']} ${styles['letsplab']}`}>
                                                    <p>신청하기</p>
                                                </a>):
                                                (<a className={`${styles['btn']} ${styles['disable']}`}>
                                                    <p>마감되었습니다</p>
                                                </a>)
                                            }
                                            {/* <span>신청 마감까지 1자리 남았어요</span> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        modalTextData.on ?
                        (<ModalText></ModalText>) :
                        (<></>)
                    }
                    
                </div>
            )
        }
        {
            <div id="footer">
                <div className="footerWrap">
                    <div className="footerNav"></div> 
                    <div className="company">
                        <p>풋살하고 싶을 땐, 클랩풋볼</p> 
                    </div>
                </div>
            </div>
        }
    </>
    )
}
export default Stadium;
