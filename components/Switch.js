import styled, { css } from 'styled-components';

export default function Switch({ on, onToggle }) {
  return (
    <Container on={on} onClick={onToggle}>
      <Slider on={on} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background: #444444;
  border-radius: 6px;
  width: 60px;
  /* padding: 1px; */
  cursor: pointer;
  ${({ on }) =>
    on &&
    css`
      background: #008ad9;
    `}
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
