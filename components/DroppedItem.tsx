import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';
import { NextPage } from 'next';

const DropItem = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -150vh);
  }

  10% {
    opacity: 1;
  }
`;

type DropType = 'file' | 'paper';

const TrashItem = styled.img<{ left: number; duration: number; type: DropType }>`
  position: absolute;
  width: ${(props) => (props.type === 'file' ? '280px' : '210px')};
  opacity: 1;

  top: 230px;
  left: ${(props) => `${props.left}%`};
  transform: translate(-50%, 0);

  animation: ${DropItem} infinite linear normal;
  animation-duration: ${(props) => `${props.duration}s`};

  @media all and (max-width: 768px) {
    width: ${(props) => (props.type === 'file' ? '80px' : '60px')};
  }
`;

interface Props {
  type: DropType;
}

const DroppedItem = ({ type }: Props) => {
  const getRandomPos = () => {
    return Math.floor(Math.random() * 40) + 30;
  };

  const getRandomDuration = () => {
    return Math.random() * 5 + 1;
  };

  const [randomPos, setRandomPos] = useState<number>(getRandomPos());
  const [duration, setDuration] = useState<number>(getRandomDuration());

  const onDropEnd = () => {
    const pos = getRandomPos();
    setRandomPos(pos);
  };

  return (
    <>
      <TrashItem
        src={`/images/${type}.png`}
        left={randomPos}
        duration={duration}
        type={type}
        onAnimationIteration={onDropEnd}
      />
    </>
  );
};

export default DroppedItem;
