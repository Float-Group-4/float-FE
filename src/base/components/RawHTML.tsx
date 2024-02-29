import React from 'react';

interface RawHTMLProps {
  children?: string;
  nl2br?: boolean;
  tag?: string;
}
const RawHTML = (props: RawHTMLProps) => {
  const { children, tag = 'div', nl2br = true, ...rest } = props;
  return React.createElement(tag, {
    dangerouslySetInnerHTML: {
      __html: nl2br ? children && children.replace(/\n/g, '<br />') : children,
    },
    ...rest,
  });
};
export default RawHTML;
