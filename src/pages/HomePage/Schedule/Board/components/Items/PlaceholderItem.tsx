import React, { CSSProperties, MutableRefObject, memo } from 'react';

export default memo(function PlaceholderItem({
  itemRef,
  style,
  className,
}: {
  itemRef?: MutableRefObject<any>;
  style: CSSProperties;
  className?: string;
}) {
  return (
    <div ref={itemRef} className={`absolute opacity-20 bg-blue-500 ${className}`} style={style} />
  );
});
