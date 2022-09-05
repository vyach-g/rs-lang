import styled from 'styled-components/macro';
import bottomLeft from '../../assets/bottom-left.png';
import topRight from '../../assets/top-right.png';
import audiocall from '../../assets/audition-plus.svg';
import savannah from '../../assets/savannah-card-bg.svg';
import sprint from '../../assets/leo-sprint.svg';

export const Wrapper = styled.div`
  background-color: #f4fbff;
  background-image: url(${bottomLeft}), url(${topRight});
  background-repeat: no-repeat;
  background-size: 50% auto, 50% auto;
  background-position: 0px calc(100% - 0px), right top;
  box-sizing: border-box;
`;

export const GameButton = styled.div`
  height: 240px;
  width: 236px;
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: contain;
  cursor: pointer;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-4px);
  }
`;

export const GameButtonSprint = styled(GameButton)`
  background-image: url(${sprint});
  background-color: rgb(244, 135, 109);
`;
export const GameButtonAudiocall = styled(GameButton)`
  background-color: rgb(112, 217, 178);
  background-image: url(${audiocall});
`;

export const GameButtonSavannah = styled(GameButton)`
  background-color: #2582e7;
  background-image: url(${savannah});
`;

export const GameName = styled.p`
  color: #fff;
  font-size: 15px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 600;
  margin: 0;
  line-height: 1.25;
  margin-bottom: 4px;
`;

export const GameAction = styled.span`
  opacity: 0.9;
  color: #fff;
  font-size: 14px;
  font-stretch: normal;
  font-style: normal;
  font-weight: 400;
  line-height: 1.43;
  margin-bottom: 6px;
`;
