import { useAppSelector } from '@hooks/reduxHooks';
import { memo } from 'react';

export const NonWorkItem = memo(({ x }: { x: number }) => {
  const cellWidth = useAppSelector((state) => state.scheduleMeasurement.cellWidth);
  return (
    <div
      className='absolute h-full'
      style={{
        width: `${cellWidth - 1}px`,
        left: `${x * cellWidth + 1}px`,
        background: `linear-gradient(-45deg, #9ca3af 5%, transparent 5%, transparent 50%, #9ca3af 50%, #9ca3af 55%, transparent 55%, transparent) 0% 0% / 5px 5px`,
      }}
    ></div>
  );
});
