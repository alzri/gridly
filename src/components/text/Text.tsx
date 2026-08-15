import { ITextProps } from './Text.types';
import clsx from 'clsx';
import styles from './Text.module.scss';

export const Text = ({
  component = 'p',
  size,
  color = 'primary',
  weight = '400',
  children,
  className,
  ...rest
}: ITextProps) => {
  const TagName = component;
  const classNames = clsx('text', className, styles[size], styles[color], styles[weight]);
  return (
    <TagName className={classNames} {...rest}>
      {children}
    </TagName>
  );
};
