import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { MutableRefObject, useLayoutEffect, useRef } from 'react';
import { MARGIN_RIGHT } from '../../common/constant';
import { DragItem as IDragItem } from '../../common/type';

function getTransformCss(ref: MutableRefObject<{ translate3d: string }>) {
  return `translate3d(${ref.current.translate3d})`;
}

export const DragItem = ({ dragItem }: { dragItem: IDragItem }) => {
  const { setDragItem, onItemDragStart, onItemDrag, onItemDragStop } = useScheduleContext();
  const wrapperRef = useRef<any>(null);
  const transformRef = useRef({
    translate3d: '0, 0, 0',
  });

  const [props, api] = useSpring(
    () => ({
      opacity: 0,
      shadow: 8,
    }),
    [],
  );

  const bind: any = useDrag(
    async ({ tap, dragging, active, movement: [mx, my], first }) => {
      if (tap) {
        setDragItem(null);
        return;
      }

      if (first && dragging) {
        onItemDragStart(dragItem);
      }

      if (dragging) {
        api.set({ opacity: 0.8 });
        transformRef.current.translate3d = `${mx}px,${my}px, 0`;
        console.log('Dragging');
        if (wrapperRef.current) wrapperRef.current.style.transform = getTransformCss(transformRef);
        onItemDrag();
      }

      if (!active) {
        api.set({ opacity: 0 });
        onItemDragStop();
        setDragItem(null);
      }
    },
    { filterTaps: true, pointer: { mouse: true }, preventScroll: true },
  );

  useLayoutEffect(() => {
    if (!dragItem.element) return;

    const { clientX, clientY, offsetX, offsetY, width, height } = dragItem;
    if (!wrapperRef.current) return;
    wrapperRef.current.style.left = `${offsetX}px`;
    wrapperRef.current.style.top = `${offsetY}px`;
    wrapperRef.current.style.width = `${width - MARGIN_RIGHT}px`;
    wrapperRef.current.style.height = `${height}px`;
    wrapperRef.current.style['transform-origin'] = `${offsetX}px ${offsetY}px`;
    wrapperRef.current.style['z-index'] = 1000;

    const mockEvent = new MouseEvent('mousedown', {
      bubbles: true,
      clientX,
      clientY,
      buttons: 1,
    });

    if (wrapperRef.current) wrapperRef.current.dispatchEvent(mockEvent);
  }, [dragItem]);

  return (
    <animated.div
      ref={wrapperRef}
      {...bind()}
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        zIndex: 30,
        boxShadow: props.shadow.to((s) => `rgba(0, 0, 0, 0.18) 0px ${s}px ${2 * s}px 0px`),
        opacity: props.opacity,
        transform: getTransformCss(transformRef),
      }}
    >
      {dragItem.element}
    </animated.div>
  );
};
