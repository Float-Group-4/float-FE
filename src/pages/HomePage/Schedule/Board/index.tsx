import { ScheduleContextWrapper } from '../ScheduleContext';
import { BoardContainer } from './components/BoardContainer';
import { ScrollWrapper } from './components/ScrollWrapper';

export default function Board() {
  return (
    <ScheduleContextWrapper>
      <ScrollWrapper>
        <BoardContainer />
      </ScrollWrapper>
    </ScheduleContextWrapper>
  );
}
