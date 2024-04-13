import * as React from 'react';
import Avatar, { AvatarTypeMap } from '@mui/material/Avatar';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 32,
      height: 32,
      fontSize: 14,
      fontWeight: 500,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ').length > 1 ? name.split(' ')[1][0] : ''}`,
  };
}

interface BackgroundLetterAvatarProps {
  children: string;
}

function BackgroundLetterAvatar(props: BackgroundLetterAvatarProps) {
  const { children, ...others } = props;
  return <Avatar {...others} {...stringAvatar(children)} />;
}

export default BackgroundLetterAvatar;
