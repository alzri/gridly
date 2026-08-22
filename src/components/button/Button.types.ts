export type ButtonVariant = 'submit' | 'delete' | 'edit' | 'export' | 'import';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
}
