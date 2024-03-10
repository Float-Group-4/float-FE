import { useAppSelector } from '@hooks/reduxHooks';
import { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';
import { TARGET_FPS } from './constant';
import { clampSpeed, getBottomSpeed, getLeftSpeed, getRightSpeed, getTopSpeed } from './helper';
import { Autoscroller } from './type';
import { Timer, cancelInterval, requestInterval } from '../../../../../utilities/timer';

export const useAutoscroller = (
  scrollRef: MutableRefObject<HTMLDivElement | null>,
): RefObject<Autoscroller> => {
  const cornerCellWidth = useAppSelector((state) => state.scheduleMeasurement.cornerCellWidth);

  const autoscroller = useRef<Autoscroller | null>(null);
  const [horizontalEnabled, setHorizontalEnabled] = useState(false);
  const [verticalEnabled, setVerticalEnabled] = useState(false);

  if (autoscroller.current === null) {
    autoscroller.current = {
      enable: () => {
        setHorizontalEnabled(true);
        setVerticalEnabled(true);
      },
      disable: () => {
        setHorizontalEnabled(false);
        setVerticalEnabled(false);
      },

      enableHorizontal: () => {
        setHorizontalEnabled(true);
      },
      disableHorizontal: () => {
        setHorizontalEnabled(false);
      },
      enableVertical(cb: any) {
        setVerticalEnabled(true);
        this.cb = cb;
      },
      disableVertical() {
        setVerticalEnabled(false);
        this.cb = undefined;
      },
    };
  }
  useEffect(() => {
    const horizontalSpeed = { current: 0 };
    const verticalSpeed = { current: 0 };
    let interval: Timer | null = null;

    const handler = (e: any) => {
      const { clientX, clientY } = e;
      const leftSpeed = getLeftSpeed(cornerCellWidth, clientX, horizontalEnabled);
      const rightSpeed = getRightSpeed(cornerCellWidth, clientX, horizontalEnabled);
      const topSpeed = getTopSpeed(clientY, verticalEnabled);
      const bottomSpeed = getBottomSpeed(clientY, verticalEnabled);
      horizontalSpeed.current = clampSpeed(leftSpeed || rightSpeed);
      verticalSpeed.current = clampSpeed(topSpeed || bottomSpeed);

      if (leftSpeed || rightSpeed || topSpeed || bottomSpeed) {
        // if already a interval is running, breakout the function
        if (interval) return;

        interval = requestInterval(() => {
          if (scrollRef && scrollRef.current) {
            scrollRef.current.scrollLeft += horizontalSpeed.current;
            scrollRef.current.scrollTop += verticalSpeed.current;
            if (autoscroller.current!.cb) {
              autoscroller.current!.cb();
            }
          } else {
            return;
          }
        }, 1000 / TARGET_FPS);
      }
    };
    if (horizontalEnabled || verticalEnabled) {
      window.addEventListener('mousemove', handler);
    }
    return () => {
      if (interval) {
        cancelInterval(interval);
        interval = null;
      }
      window.removeEventListener('mousemove', handler);
    };
  }, [scrollRef, horizontalEnabled, verticalEnabled]);

  return autoscroller;
};
