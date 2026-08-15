import React from 'react';

export type TextComponent = 'h1' | 'h2' | 'p' | 'span';

export type TextSize = 'h1' | 'h2' | 'paragraph-s' | 'paragraph-m' | 'paragraph-l';

export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'active' | 'inactive';

export type TextWeight = '400' | '500' | '600' | '700' | '900';

export interface ITextProps extends React.HTMLAttributes<HTMLElement> {
  component: TextComponent;
  size: TextSize;
  color: TextColor;
  weight: TextWeight;
  children: React.ReactNode;
}
