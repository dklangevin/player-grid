import Button from './Button';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import { IconClose } from '../icons';

export default function Options({ onClose, options, setOptions }) {
  return (
    <Container onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={onClose} />
        <Item>
          <ItemText>Rows</ItemText>
          {[3, 4, 5].map((i) => (
            <Number
              key={i}
              onClick={() => setOptions({ ...options, rows: i })}
              selected={i === options.rows}
            >
              {i}
            </Number>
          ))}
        </Item>
        <Item>
          <ItemText>Columns</ItemText>
          {[3, 4, 5].map((i) => (
            <Number
              key={i}
              onClick={() => setOptions({ ...options, columns: i })}
              selected={i === options.columns}
            >
              {i}
            </Number>
          ))}
        </Item>
        <Item>
          <ItemText>Show Player Count</ItemText>
          <Checkbox
            type='checkbox'
            onClick={() =>
              setOptions({
                ...options,
                showPlayerCount: !options.showPlayerCount,
              })
            }
            checked={options.showPlayerCount}
          />
        </Item>
        <Item>
          <ItemText>Show Player Headshots</ItemText>
          <Checkbox
            type='checkbox'
            onClick={() =>
              setOptions({
                ...options,
                showPlayerHeadshots: !options.showPlayerHeadshots,
              })
            }
            checked={options.showPlayerHeadshots}
          />
        </Item>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
`;

const Content = styled.div`
  width: fit-content;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  font-size: 18px;
  font-weight: 900;
  background: linear-gradient(29deg, #222255, hsla(222, 77%, 22%, 1));
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 32px;
`;

const ItemText = styled.span`
  padding-right: 12px;
  margin-right: auto;
`;

const Number = styled.span`
  border-radius: 1000px;
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  ${({ selected }) =>
    selected &&
    css`
      background: white;
      color: black;
    `}
  :hover {
    /* color: #dddddd; */
  }
`;

const Checkbox = styled.input`
  width: 22px;
  height: 22px;
  border-radius: 8px;
  cursor: pointer;
`;

const CloseIcon = styled(IconClose)`
  width: 32px;
  height: 32px;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: 16px;
`;
