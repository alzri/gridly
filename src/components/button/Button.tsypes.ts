export type ButtonVariant = 'submit' | 'delete' | 'edit' | 'login' | 'register';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
}
