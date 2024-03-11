import { useAppSelector } from '@hooks/reduxHooks';
import { ScheduleContextWrapper, useScheduleContext } from '../ScheduleContext';
import { BoardContainer } from './components/BoardContainer';
import { ScrollWrapper } from './components/ScrollWrapper';
import { DragItem } from './components/Items/DragItem';
import { useState } from 'react';
import AddItemModal from './components/Modals/AddItemModal';

export default function Board() {
  return (
    <>
      <ScrollWrapper>
        <BoardContainer />
      </ScrollWrapper>
      <AddItemModal
        isOpen={false}
        setIsOpen={function (isOpen: boolean): void {
          return;
        }}
      />
      <NonItems />
    </>
  );
}

const NonItems = () => {
  const { dragItem } = useScheduleContext();
  return <>{dragItem && <DragItem dragItem={dragItem} />}</>;
};
