import styled, { css } from 'styled-components';
import Modal from './Modal';
import { Close } from 'react-ionicons';

export default function HowToPlay({ close, ...props }) {
  const _close = () => {
    close();
    console.log('hi');
    localStorage.setItem('firstVisit', 'false');
  };

  return (
    <Modal close={_close} {...props}>
      <Content>
        <CloseIcon color="white" onClick={_close} />
        <Header>How to Play</Header>
        <Steps>
          <Step>1. Click on a square in the grid</Step>
          <Step>
            2. Search for a player in the search bar who you think has played
            for both of the teams that correspond with the row and column for
            that square
          </Step>
          <Step>3. Choose a player from the search results</Step>
          <Step>4. Click confirm to submit your answer for that square</Step>
        </Steps>
        <Footer>
          Try to fill out the whole grid. You only have 3 incorrect guesses
          before you lose!
        </Footer>
      </Content>
    </Modal>
  );
}

const Content = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const CloseIcon = styled(Close)`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const Header = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #008ad9;
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Step = styled.div``;

const Footer = styled.div``;
