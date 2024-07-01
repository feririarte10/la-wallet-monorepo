import React from 'react';

import { AlertIcon, CheckIcon } from '../Icons';

import { InputProps } from './types';

import { useTheme } from 'styled-components';
import { BtnLoader } from '../Loader/Loader';
import { InputBox, InputIcon, InputPrimitive } from './style';

export function Input(props: InputProps) {
  const theme = useTheme();

  const {
    placeholder,
    value,
    type = 'text',
    id = '',
    name = '',
    status,
    autoFocus = false,
    onChange,
    onFocus,
    onBlur,
    isLoading = false,
    isChecked = false,
    isError = false,
    disabled = false,
  } = props;

  return (
    <InputBox $withIcon={isLoading}>
      <InputPrimitive
        $background={theme.colors.gray20}
        $isSuccess={status && status === 'success'}
        $showValidate={!status}
        autoFocus={autoFocus}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
      />
      {(isLoading || isChecked || isError) && (
        <InputIcon>
          {isLoading && <BtnLoader />}
          {isChecked && <CheckIcon color={theme.colors.success} />}
          {isError && <AlertIcon color={theme.colors.error} />}
        </InputIcon>
      )}
    </InputBox>
  );
}
