import styled, { css } from 'styled-components';
import { IconClose } from '../icons';
import Button from './Button';
import Modal from './Modal';
import Switch from './Switch';
import { useState } from 'react';

export default function NewGame({ close, reset, options, setOptions }) {
  const [internalOptions, setInternalOptions] = useState(options);

  const startGame = () => {
    setOptions(internalOptions);
    reset();
    close();
  };

  return (
    <Modal onClick={close}>
      <Content onClick={(e) => e.stopPropagation()}>
        <Title>
          OPTIONS <CloseIcon onClick={close} />
        </Title>

        <SectionTitle>Size</SectionTitle>
        <Item>
          <ItemText>Rows</ItemText>
          <Numbers>
            {[3, 4, 5].map((i) => (
              <Number
                key={i}
                onClick={() =>
                  setInternalOptions({ ...internalOptions, rows: i })
                }
                selected={i === internalOptions.rows}
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
                onClick={() =>
                  setInternalOptions({ ...internalOptions, columns: i })
                }
                selected={i === internalOptions.columns}
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
            on={internalOptions.showPlayerCount}
            onToggle={() =>
              setInternalOptions({
                ...internalOptions,
                showPlayerCount: !internalOptions.showPlayerCount,
              })
            }
          />
        </Item>
        <Item>
          <ItemText>Player Headshots</ItemText>
          <Switch
            on={internalOptions.showPlayerHeadshots}
            onToggle={() =>
              setInternalOptions({
                ...internalOptions,
                showPlayerHeadshots: !internalOptions.showPlayerHeadshots,
              })
            }
          />
        </Item>
        <StartGameButton onClick={startGame}>Start Game</StartGameButton>
      </Content>
    </Modal>
  );
}
const Content = styled.div`
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 900;
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
`;

const Number = styled.span`
  border-radius: 4px;
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

const StartGameButton = styled(Button)`
  margin-top: 16px;
`;
