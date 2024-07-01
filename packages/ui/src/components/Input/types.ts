import { ReactNode, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  value?: string;
  type?: 'text' | 'password' | 'number' | 'email';
  id?: string;
  name?: string;
  status?: 'success' | 'error';
  autoFocus?: boolean;
  onChange?: (e: any) => void;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  isLoading?: boolean;
  isChecked?: boolean;
  isError?: boolean;
  disabled?: boolean;
}

export interface InputPrimitiveProps {
  $isSuccess?: boolean;
  $showValidate?: boolean;
  $background: string;
}

export interface FeedbackProps {
  children: ReactNode;
  status?: null | 'success' | 'error';
  show?: boolean;
}

export interface FeedbackPrimitiveProps {
  $isShow: boolean;
  $isSuccess: boolean;
}

export interface TextareaProps {
  placeholder: string;
  status?: 'success' | 'error';
  onChange?: (e: any) => void;
  id?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
}
