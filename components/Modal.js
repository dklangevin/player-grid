import styled, { css } from 'styled-components';

export default function Modal({ close, children }) {
  return (
    <Container onClick={close}>
      <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 999;
`;

const Content = styled.div`
  position: absolute;
  background: rgb(50, 50, 50);
  backdrop-filter: blur(18px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  border-radius: 8px;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Slider = styled.span`
  border-radius: 6px;
  width: 30px;
  height: 28px;
  background: #cccccc;
  ${({ on }) =>
    on &&
    css`
      margin-left: 30px;
    `}
`;
