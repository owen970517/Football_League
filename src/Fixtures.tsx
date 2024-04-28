import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import styled from 'styled-components';
import { IFixtures } from './types/Fixtures';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from './constants/baseUrl';
dayjs.extend(relativeTime);
dayjs.locale("ko");

const Fixtures = () => {
  const {teamid} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [teamFixtures,setTeamFixtures] = useState([]);
  const now = dayjs()
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // 프록시를 통해 API 요청
        const response = await axios.get(`${API_BASE_URL}/api/teams?type=team&timezone=Asia/Seoul&id=${teamid}`);
        setTeamFixtures(response.data.fixtures.allFixtures.fixtures);
        setIsLoading(false);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다:", error);
      }
    };

    fetchData();
  }, [teamid]);
  const remainFixtures = teamFixtures.filter((fix:IFixtures) => dayjs(fix.status.utcTime).isAfter(now))
  return (
    <>
      <FixtureContainer>
        {teamFixtures.length === 0 && <h1>Loading...</h1>}
        <h3>남은 경기 일정</h3>
        {remainFixtures.map((fixture:IFixtures,idx:number) => (
          <FixtureItem key={idx}>
            <FixtureTime>
              <div>
                <p>{dayjs(fixture.status.utcTime).format('YYYY-MM-DD HH:mm')}</p>
                <p>{dayjs(fixture.status.utcTime).fromNow()}</p>
              </div>
              <p>{fixture.tournament.name}</p>
            </FixtureTime>
            <FixtureTitle> 
              <FixtrueMain>
                <p>{fixture.home.name}</p> 
                <img src={`https://images.fotmob.com/image_resources/logo/teamlogo/${fixture.home.id}_small.png`} alt="logo" width="50" height="50"/>
              </FixtrueMain>
              <h1>VS</h1> 
              <FixtrueMain>
                <img src={`https://images.fotmob.com/image_resources/logo/teamlogo/${fixture.away.id}_small.png`} alt="logo" width="50" height="50"/>
                <p>{fixture.away.name}</p>
              </FixtrueMain> 
            </FixtureTitle>
          </FixtureItem>
        ))}
      </FixtureContainer>
    </>
  )
}

const FixtureContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin : 0 auto;
`
const FixtureItem = styled.div`
  background-color: #1d1d1d;
  color :#fff;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`

const FixtureTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const FixtrueMain = styled.div`
  flex : 1;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 24px;
    margin: 0 10px;
  }
`
const FixtureTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export default Fixtures