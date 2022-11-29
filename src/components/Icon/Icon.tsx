import React, { FC } from 'react';
import { IconProps } from './Icon.props';
import { IconSvgs } from './icons/icon-data';

const Icon: FC<IconProps> = ({ name, className, onClick }) => {
  return IconSvgs[name](className, onClick);
};

export default Icon;
