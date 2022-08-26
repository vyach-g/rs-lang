import styled from 'styled-components/macro';
import bgbottom from '../../../assets/bg-bottom.svg';
import bgleft from '../../../assets/bg-left.svg';
import bgright from '../../../assets/bg-right.svg';
import icosound from '../../../assets/ico-sound.svg';

export const Wrapper = styled.div`
  background-color: #0d3848;
  background-image: url(${bgbottom}), url(${bgleft}), url(${bgright});
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: 100%, auto, auto;
  background-position: bottom, 0 0, 100% 0;
  box-sizing: border-box;
  height: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Open Sans, sans-serif;
  color: #fff;
  font-size: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Levels = styled.div`
  display: flex;
  gap: 5px;
`;

export const LevelButton = styled.button<{ isActive?: boolean }>`
  background: ${(props) => (props.isActive ? '#2582e7' : 'none')};
  padding: 10px 20px;
  color: #fff;
  font-size: 14px;
  border: 1px solid rgba(37, 130, 231, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(37, 130, 231, 0.12);
  }
`;

export const SubmitButton = styled(LevelButton)`
  margin-top: 40px;
  background: rgba(37, 130, 231, 0.08);
  color: #2582e7;
  padding: 10px 42px;
  font-weight: 600;
  border-radius: 4px;
  border: none;
  min-width: 250px;
  height: 40px;
`;

export const BackButton = styled(SubmitButton)`
  background: none;
  text-decoration: underline;
  margin-top: 20px;
  &:hover {
    background-color: unset;
    text-decoration: none;
  }
`;

export const ContentResults = styled(Content)`
  align-items: center;
  background-color: #fff;
  border: 1px solid #e6e9ee;
  border-radius: 8px;
  max-width: 784px;
  min-height: 646px;
  padding: 42px 42px;
  text-align: center;
  color: #37383c;
`;

export const ContentHeader = styled.h2`
  color: #777a88;
  font-size: 34px;
  font-weight: 300;
  line-height: 0.85;
  font-family: Open Sans, sans-serif;
`;

export const ResultsHeader = styled.h3`
  color: #37383c;
  font-size: 16px;
  line-height: 1.25;
  text-align: left;
  align-self: flex-start;
`;

export const ResultsHeaderUL = styled.span`
  padding: 5px 10px;
  color: #fff;
  font-size: 20px;
  border-radius: 50px;
`;

export const ResultsHeaderULWrong = styled(ResultsHeaderUL)`
  background-color: #ed593b;
`;
export const ResultsHeaderULCorrect = styled(ResultsHeaderUL)`
  background-color: #28c38a;
`;
export const ResultsWords = styled.div`
  height: 337px;
  margin-top: 0;
  max-width: 542px;
  overflow: auto;
  position: relative;
  width: 100%;
`;

export const OneWord = styled.li`
  display: flex;
  gap: 10px;
  padding-block: 10px;
`;

export const BoldWord = styled.b`
  font-weight: 600;
`;

export const AudioIcon = styled.img`
  cursor: pointer;
`;
