import { styled } from 'styled-components';

export const TabsStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const TabListStyle = styled.div`
  display: flex;
  gap: 8px;

  padding: 0 16px;

  border-bottom: 1px solid ${(props) => props.theme.colors.gray20};
`;

interface TabStyleProps {
  $active: boolean;
  $flex: number;
}

export const TabStyle = styled.div<TabStyleProps>`
  display: flex;
  flex: ${(props) => props.$flex};

  padding: 4px 0;

  border-bottom: 1px solid ${(props) => (props.$active ? props.theme.colors.primary : 'transparent')};

  button {
    flex: 1;

    border-radius: 8px;

    color: ${(props) => props.theme.colors.primary};

    :not(:disabled) {
      &:hover {
        background-color: ${(props) => props.theme.colors.gray20};
      }
    }
  }
`;

export const TabPanelsStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

interface TabPanelStyleProps {
  $show: boolean;
}

export const TabPanelStyle = styled.div<TabPanelStyleProps>`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  flex: 1;
`;
