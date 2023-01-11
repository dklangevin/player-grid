import Button from './Button';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import { DownArrow } from '../icons';

export default function Options({ options, setOptions }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Container>
      <OptionsButton onClick={() => setIsOpen((prev) => !prev)}>
        Options
        <DownArrowIcon isOpen={isOpen} />
      </OptionsButton>
      {isOpen && (
        <Content>
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
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  padding: 32px;
  width: 340px;
`;

const OptionsButton = styled(Button)`
  background: #222222;
  padding-inline: 32px;
  width: fit-content;
`;

const Content = styled.div`
  background: #333333;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
  padding: 16px;
  font-size: 18px;
  font-weight: 900;
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

const DownArrowIcon = styled(DownArrow)`
  width: 22px;
  height: 22px;
  color: white;
  margin: 0 -16px 0 16px;
  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;
