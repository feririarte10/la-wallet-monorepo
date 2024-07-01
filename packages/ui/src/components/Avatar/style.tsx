import { styled } from 'styled-components';

const slot = 4;

interface AvatarPrimitiveProps {
  $size: number;
  $background: string;
  $borderColor: string;
}

export const AvatarPrimitive = styled.div<AvatarPrimitiveProps>`
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  min-width: ${(props) => props.$size * slot}px;
  max-width: ${(props) => props.$size * slot}px;
  height: ${(props) => props.$size * slot}px;

  background-color: ${(props) => props.$background};
  border: 2px solid ${(props) => props.$borderColor};
  border-radius: 50%;

  img {
    width: 100%;
    height: auto;
  }
`;

interface AvatarBadgeStyleProps {
  $isSmall: boolean;
}

export const AvatarBadgeStyle = styled.div<AvatarBadgeStyleProps>`
  position: absolute;
  bottom: -2px;
  right: -2px;

  width: ${(props) => (props.$isSmall ? '16px' : '24px')};
  height: ${(props) => (props.$isSmall ? '16px' : '24px')};

  background-color: ${(props) => props.theme.colors.background};
  border: ${(props) => (props.$isSmall ? '2px' : '4px')} solid ${(props) => props.theme.colors.background};
  border-radius: 50px;
`;
