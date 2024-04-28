import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { enTokrPosition } from './constants/translatePosition';
import { ISquad } from './types/Squad';
import { useParams } from 'react-router-dom';

const TeamSquad = () => {
  const {teamid} = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [teamSquad,setTeamSquad] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        // 프록시를 통해 API 요청
        const response = await axios.get(`/api/teams?type=team&timezone=Asia/Seoul&id=${teamid}`);
        setTeamSquad(response.data.squad);
        setIsLoading(false);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다:", error);
      }
    };

    fetchData();
  }, [teamid]);
  const translatePosition = (title:string) => {
    return enTokrPosition[title]
  }

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {teamSquad.map((squad:ISquad, idx) => (
        <SquadContainer key={idx}>
          <SquadTitle>{translatePosition(squad.title)}</SquadTitle>
          <SquadMembersContainer>
            {squad.members.map((member) => (
                <MemberContainer key={member.id}>
                <MemberImage src={`https://images.fotmob.com/image_resources/playerimages/${member.id}.png`} alt='avatar'/>
                <MemberInfo>
                    <p>{member.name}</p>
                    <p>{member.cname}</p>
                </MemberInfo>
                </MemberContainer>
            ))}
          </SquadMembersContainer>  
        </SquadContainer>
      ))}
    </>
  )
}
const SquadContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding : 10px;
  margin: 20px;
  border-radius: 10px;
  background-color: #1D1D1D;
  p,h2 {
    color : #fff;
  }
`;

const SquadTitle = styled.h2`
  margin-bottom: 10px;
`;

const SquadMembersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 1줄에 3개의 컬럼 */
  gap: 20px; /* 아이템 사이의 간격 */
  margin-bottom: 20px; /* 섹션 사이의 간격 */
`;

const MemberContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 10px; /* 아이템 사이의 간격 설정 */
  background-color: #272727;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px; /* 컨테이너 내부의 여백 */
`;

const MemberImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  
`;

export default TeamSquad