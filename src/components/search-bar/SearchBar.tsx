'use client';

import { type ChangeEvent, type FormEvent, type InputHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import styles from './SearchBar.module.scss';

export type SearchBarProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export const SearchBar = ({
  value: controlledValue = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  className,
  ...rest
}: SearchBarProps) => {
  const [internalValue, setInternalValue] = useState(controlledValue);

  const currentValue = onChange ? controlledValue : internalValue;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    if (onChange) {
      onChange(nextValue);
    } else {
      setInternalValue(nextValue);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.(currentValue);
  };

  return (
    <form className={clsx(styles.searchBar, className)} onSubmit={handleSubmit}>
      <span className={styles.icon} aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.4874 18.016L14.0465 12.5751C16.5108 9.33574 16.0438 4.74092 12.978 2.06363C9.91231 -0.61365 5.29645 -0.457726 2.41838 2.42034C-0.459679 5.2984 -0.615603 9.91427 2.06168 12.98C4.73896 16.0457 9.33379 16.5128 12.5732 14.0485L18.014 19.4893C18.4238 19.889 19.0776 19.889 19.4874 19.4893C19.8938 19.0823 19.8938 18.423 19.4874 18.016ZM2.29236 7.91681C2.29236 4.81021 4.81076 2.29181 7.91736 2.29181C11.024 2.29181 13.5424 4.81021 13.5424 7.91681C13.5424 11.0234 11.024 13.5418 7.91736 13.5418C4.81228 13.5381 2.29603 11.0219 2.29236 7.91681Z"
            fill="#A5A5A4"
          />
        </svg>
      </span>

      <input
        className={styles.input}
        id="search-input"
        type="search"
        value={currentValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        aria-label="Search"
        {...rest}
      />
    </form>
  );
};
