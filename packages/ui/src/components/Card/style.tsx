import { styled } from 'styled-components';

export const CardStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  gap: 8px;
  width: 100%;

  padding: 12px;

  border-radius: 12px;
  background: ${(props) => props.theme.colors.gray15};
`;
