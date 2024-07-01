import { styled } from 'styled-components';

export const Default = styled.div`
  margin-top: -40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -12px;

  button {
    position: relative;
    top: 16px;

    width: 64px !important;
    height: 64px !important;

    svg {
      width: 32px !important;
      height: 32px !important;
    }
  }
`;
