import Button from './Button';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import { IconClose } from '../icons';
import Switch from './Switch';

export default function Options({ onClose, options, setOptions }) {
  return (
    <Container onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Title>
          OPTIONS <CloseIcon onClick={onClose} />
        </Title>

        <SectionTitle>Size</SectionTitle>
        <Item>
          <ItemText>Rows</ItemText>
          <Numbers>
            {[3, 4, 5].map((i) => (
              <Number
                key={i}
                onClick={() => setOptions({ ...options, rows: i })}
                selected={i === options.rows}
              >
                {i}
              </Number>
            ))}
          </Numbers>
        </Item>
        <Item>
          <ItemText>Columns</ItemText>
          <Numbers>
            {[3, 4, 5].map((i) => (
              <Number
                key={i}
                onClick={() => setOptions({ ...options, columns: i })}
                selected={i === options.columns}
              >
                {i}
              </Number>
            ))}
          </Numbers>
        </Item>

        <Divider />

        <SectionTitle>Display Options</SectionTitle>
        <Item>
          <ItemText>Player Count</ItemText>
          <Switch
            on={options.showPlayerCount}
            onToggle={() =>
              setOptions({
                ...options,
                showPlayerCount: !options.showPlayerCount,
              })
            }
          />
        </Item>
        <Item>
          <ItemText>Player Headshots</ItemText>
          <Switch
            on={options.showPlayerHeadshots}
            onToggle={() =>
              setOptions({
                ...options,
                showPlayerHeadshots: !options.showPlayerHeadshots,
              })
            }
          />
        </Item>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
`;

const Content = styled.div`
  width: 300px;
  height: 100%;
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 900;
  background: linear-gradient(29deg, rgb(50, 50, 50), rgb(30, 30, 30));
  backdrop-filter: blur(9px);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  margin-bottom: 16px;
  color: grey;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
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
  color: grey;
`;

const Numbers = styled.div`
  display: flex;
  background: #444444;
  border-radius: 4px;
  /* padding: 3px; */
`;

const Number = styled.span`
  border-radius: 4px;
  /* margin: -1px; */
  width: 36px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  color: #aaaaaa;
  ${({ selected }) =>
    selected &&
    css`
      background: #008ad9;
      color: white;
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
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-left: auto;
`;

const Divider = styled.hr`
  width: 100%;
  border: 1px solid #343434;
`;
