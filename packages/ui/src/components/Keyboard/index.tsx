//@ts-nocheck
import React, { useEffect } from 'react';
import { Flex } from '../Flex';
import { Button } from '../Button';
import { KeyboardProps } from './types';

function ClearCharacterIcon() {
  return React.createElement(
    'svg',
    Object.assign({
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 24 24',
      fill: 'currentColor',
    }),
    React.createElement('path', {
      fillRule: 'evenodd',
      d: 'M8 5a.53.53 0 00-.431.222l-3.923 5.486a1.641 1.641 0 00-.047 1.839L7.58 18.77c.092.143.25.23.42.23h11.359c.906 0 1.641-.735 1.641-1.641V6.64C21 5.735 20.265 5 19.359 5H8zm1.646 3.146a.5.5 0 01.708 0l3.127 3.128 3.094-3.126a.5.5 0 01.71.704l-3.097 3.129 3.166 3.165a.5.5 0 01-.708.708l-3.162-3.163-3.129 3.16a.5.5 0 01-.71-.703l3.132-3.164-3.13-3.13a.5.5 0 010-.708z',
      clipRule: 'evenodd',
    }),
  );
}

const timeOut: Record<string, NodeJS.Timeout> = {};

export function Keyboard({ numpadData, disableKeydown = false }: KeyboardProps) {
  const { handleNumpad, intAmount, resetAmount, concatNumber, deleteNumber } = numpadData;

  const handleDeleteOnMouseDown = () => (timeOut.reset = setTimeout(() => resetAmount(), 500));

  const handleDeleteOnMouseUp = () => clearTimeout(timeOut?.reset);

  useEffect(() => {
    if (!disableKeydown) {
      document.addEventListener('keydown', handleKeyPress);

      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [intAmount, disableKeydown]);

  const handleKeyPress = (e: KeyboardEvent) => {
    const { key } = e;
    const keysAccepted: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    if (key == 'Backspace') deleteNumber();
    if (keysAccepted.includes(key)) concatNumber(key);
  };

  return (
    <Flex direction="column" gap={8}>
      <Flex gap={8}>
        <Button variant="borderless" onClick={() => handleNumpad('1')}>
          1
        </Button>
        <Button variant="borderless" onClick={() => handleNumpad('2')}>
          2
        </Button>
        <Button variant="borderless" onClick={() => handleNumpad('3')}>
          3
        </Button>
      </Flex>
      <Flex gap={8}>
        <Button variant="borderless" onClick={() => handleNumpad('4')}>
          4
        </Button>
        <Button variant="borderless" onClick={() => handleNumpad('5')}>
          5
        </Button>
        <Button variant="borderless" onClick={() => handleNumpad('6')}>
          6
        </Button>
      </Flex>
      <Flex gap={8}>
        <Button variant="borderless" onClick={() => handleNumpad('7')}>
          7
        </Button>
        <Button variant="borderless" onClick={() => handleNumpad('8')}>
          8
        </Button>
        <Button variant="borderless" onClick={() => handleNumpad('9')}>
          9
        </Button>
      </Flex>
      <Flex gap={8}>
        <Button variant="borderless" onClick={() => handleNumpad('00')}>
          00
        </Button>
        <Button variant="borderless" onClick={() => handleNumpad('0')}>
          0
        </Button>
        <Button
          onTouchStart={handleDeleteOnMouseDown}
          onTouchEnd={handleDeleteOnMouseUp}
          onMouseDown={handleDeleteOnMouseDown}
          onMouseUp={handleDeleteOnMouseUp}
          variant="borderless"
          color="error"
          onClick={deleteNumber}
        >
          <ClearCharacterIcon />
        </Button>
      </Flex>
    </Flex>
  );
}
