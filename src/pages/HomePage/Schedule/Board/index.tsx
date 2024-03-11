import { useAppSelector } from '@hooks/reduxHooks';
import { ScheduleContextWrapper, useScheduleContext } from '../ScheduleContext';
import { BoardContainer } from './components/BoardContainer';
import { ScrollWrapper } from './components/ScrollWrapper';
import { DragItem } from './components/Items/DragItem';

export default function Board() {
  return (
    <>
      <ScrollWrapper>
        <BoardContainer />
      </ScrollWrapper>
      <NonItems />
    </>
  );
}

const NonItems = () => {
  const { dragItem } = useScheduleContext();
  console.log(dragItem);
  return <>{dragItem && <DragItem dragItem={dragItem} />}</>;
};
