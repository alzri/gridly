import { IButtonProps } from './Button.types';
import styles from './Button.module.scss';
import clsx from 'clsx';

export const Button = ({ variant, onClick, children, ...rest }: IButtonProps) => {
  const className = clsx(styles.button, variant && styles[variant]);

  return (
    <button className={className} onClick={onClick} type="button" {...rest}>
      {children}
    </button>
  );
};
