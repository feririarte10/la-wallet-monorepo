import { styled } from 'styled-components';

import { InputPrimitiveProps, FeedbackPrimitiveProps } from './types';

export const InputPrimitive = styled.input<InputPrimitiveProps>`
  flex: 1;
  min-height: 50px;
  width: 100%;
  /* min-width: 200px; */

  padding: 8px;
  padding-left: 12px;

  background-color: ${(props) => props.$background};
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.$showValidate
        ? props.theme.colors.gray20
        : props.$isSuccess
          ? props.theme.colors.success
          : props.theme.colors.error};

  color: ${(props) => props.theme.colors.text};
  font-size: 0.8em;
  font-family: ${(props) => props.theme.font.secondary};

  outline: none;

  transition-duration: 0.3s;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray50};
    font-family: ${(props) => props.theme.font.secondary};
  }

  &:not(:disabled) {
    &:hover {
      border-color: ${(props) => props.theme.colors.gray30};
    }

    &:focus-visible {
      border-color: ${(props) => props.theme.colors.primary};
    }

    &:active {
      border-color: ${(props) => props.theme.colors.primary};
    }
  }

  &:disabled {
    opacity: 0.35;

    cursor: not-allowed;
  }
`;

export const InputButton = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  padding-right: 10px;
`;

export const InputGroupPrimitive = styled.div`
  position: relative;

  display: flex;
  width: 100%;
  align-items: end;
  justify-content: center;

  input {
    border-radius: 8px 0 0 8px !important;
  }
`;

export const InputGroupRightPrimitive = styled.div`
  display: flex;
  align-items: center;
  min-height: 50px;

  padding: 0 4px;

  background-color: ${(props) => props.theme.colors.gray10};
  border: 1px solid ${(props) => props.theme.colors.gray20};
  border-left: 0;
  border-radius: 0 8px 8px 0;
`;

export const FeedbackPrimitive = styled.div<FeedbackPrimitiveProps>`
  opacity: ${(props) => (props.$isShow ? 1 : 0)};

  display: block;

  margin-top: 4px;

  color: ${(props) => (props.$isSuccess ? props.theme.colors.success : props.theme.colors.error)};

  /* font-size: 0.7em; */
`;

export const InputWithLabel = styled.div``;

interface InputBoxProps {
  $withIcon: boolean;
}

export const InputBox = styled.div<InputBoxProps>`
  position: relative;

  width: 100%;

  input {
    padding-right: ${(props) => (props.$withIcon ? '60px' : '8px')};
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 100%;

  span,
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const TextareaPrimitive = styled.textarea<InputPrimitiveProps>`
  width: 100%;
  min-height: 80px;

  padding: 8px;
  padding-left: 12px;

  background-color: ${(props) => props.$background};
  border-radius: 8px;
  border: 1px solid
    ${(props) =>
      props.$showValidate
        ? props.theme.colors.gray20
        : props.$isSuccess
          ? props.theme.colors.success
          : props.theme.colors.error};

  color: ${(props) => props.theme.colors.text};
  font-size: 0.8em;
  font-family: ${(props) => props.theme.font.secondary};

  outline: none;
  resize: none;

  transition-duration: 0.3s;

  &::placeholder {
    color: ${(props) => props.theme.colors.gray50};
    font-family: ${(props) => props.theme.font.secondary};
  }

  &:hover {
    border-color: ${(props) => props.theme.colors.gray30};
  }

  &:active {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:focus-visible {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;
export const Pin = styled.div`
  width: 100%;

  .vi__wrapper {
    width: 100%;
  }

  .vi__container {
    width: 100%;
  }

  .vi__character {
    width: 100%;
    flex: 1;

    background-color: ${(props) => props.theme.colors.gray15};
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.colors.gray20};

    font-size: initial;
    color: ${(props) => props.theme.colors.text};
    font-size: 0.8em;

    &.vi__character--inactive {
      opacity: 0.35;

      cursor: not-allowed;
    }
  }
`;
