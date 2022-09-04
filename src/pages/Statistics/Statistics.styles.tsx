import styled from 'styled-components/macro';
import bottomLeft from '../../assets/bottom-left.png';
import topRight from '../../assets/top-right.png';
import level from '../../assets/ico-level.svg';
import audiocall from '../../assets/audition-plus.svg';
import savannah from '../../assets/savannah-card-bg.svg';
import sprint from '../../assets/leo-sprint.svg';

export const Wrapper = styled.div`
  width: 100%;
  padding: 32px 0;
  // height: calc(100vh - 203px);
  background-color: #f4fbff;
  background-image: url(${bottomLeft}), url(${topRight});
  background-repeat: no-repeat;
  background-size: 50% auto, 50% auto;
  background-position: 0px calc(100% - 0px), right top;
  box-sizing: border-box;
`;

export const TotalCard = styled.div`
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%), 0 0 1px 0 rgb(0 0 0 / 12%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 72px;
  padding: 14px 18px 10px;
  width: 150px;
`;

export const TotalScoreImg = styled.div`
  background-image: url(${level});
  background-position: 50%;
  background-repeat: no-repeat;
  height: 42px;
  position: relative;
  width: 42px;
`;

export const TotalScoreValue = styled.div`
  color: #fff;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -1.2px;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const TotalScoreText = styled.div`
  color: #28c38a;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

export const WordsCard = styled.div`
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%), 0 0 1px 0 rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  height: 72px;
  padding: 14px 18px 10px;
  position: relative;
  width: 574px;
`;

export const Progress = styled.div`
  background-color: #37383c1f;
  border-radius: 3.6px;
  height: 6px;
  margin-top: 15px;
  width: calc(100% - 70px);
  box-sizing: border-box;
`;
export const FilledProgress = styled.div`
  height: 100%;
`;
export const FilledProgressSpan = styled.span`
  -webkit-animation: progressBar 2.5s ease-in-out;
  animation: progressBar 2.5s ease-in-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  background-color: #ffc900;
  border-radius: 3.6px;
  display: block;
  height: 100%;
  width: 100%;
`;

export const WordsImg = styled.div`
  background-color: #ffc900;
  background-position: 50%;
  background-repeat: no-repeat;
  border-radius: 50%;
  height: 42px;
  position: absolute;
  right: 18px;
  width: 42px;
`;
export const WordsValue = styled.div`
  color: #fff;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 700;
  letter-spacing: -1.2px;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const WordsText = styled.div`
  color: #ffc900;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

export const GameCard = styled.div`
  height: 240px;
  width: 236px;
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%), 0 0 1px 0 rgb(0 0 0 / 12%);
  padding: 16px;
  transition: all 0.3s;
`;

export const GameCardSprint = styled(GameCard)`
  background-image: url(${sprint});
  background-color: rgb(244, 135, 109);
`;
export const GameCardAudiocall = styled(GameCard)`
  background-color: rgb(112, 217, 178);
  background-image: url(${audiocall});
`;

export const GameCardSavannah = styled(GameCard)`
  background-color: #2582e7;
  background-image: url(${savannah});
`;
export const GameStatsRows = styled.div`
  background: rgb(0 0 0 / 50%);
  border-radius: 6px;
  padding: 6px;
  margin-top: 16px;
`;

export const Today = styled.div`
  background-color: #fff;
  border: 2px solid transparent;
  border-radius: 6px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%), 0 0 1px 0 rgb(0 0 0 / 12%);
  display: flex;
  flex-direction: column;
  height: 72px;
  padding: 14px 18px 10px;
  position: relative;
  width: 740px;
`;

export const TodayText = styled.div`
  color: rgb(244, 135, 109);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

export const TodayTable = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const TodayItem = styled.div`
  display: flex;
  flex-basis: auto;
  gap: 10px;
  align-items: flex-end;
`;

export const TodayItemName = styled.p`
  margin-top: 10px;

  opacity: 0.9;
  color: #000;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 400;
  line-height: 1.43;
  margin-bottom: 10px;
`;

export const TodayItemValue = styled.p`
  margin-top: 10px;

  opacity: 0.9;
  color: #000;
  font-size: 16px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 800;
  line-height: 1.3;
  margin-bottom: 10px;
`;
