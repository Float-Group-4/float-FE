import dayjs from 'dayjs';
import moment from 'moment';
export enum ViewType {
  days = 'days',
  weeks = 'weeks',
  months = 'months',
}

export const CALENDAR_BAR_HEIGHT = 54;
export const INITIAL_WEEK_INDEX = 50;
export const STARTING_POINT = dayjs().startOf('week').subtract(INITIAL_WEEK_INDEX, 'weeks');
export const STARTING_POINT_MOMENTJS = moment()
  .startOf('week')
  .subtract(INITIAL_WEEK_INDEX, 'weeks');

export const DEFAULT_MIN_HOURS = 8;
export const GAP_BETWEEN_ITEM = 0.5;

export const MARGIN_TOP = 3;
export const MARGIN_BOTTOM = 15;
export const MARGIN_LEFT = 4;
export const MARGIN_RIGHT = MARGIN_LEFT * 2 - 1;

export const SPEED_MODIFIER = 5;
export const MAX_SPEED = 50;
export const TARGET_FPS = 60;

export const CELL_WIDTH_BY_VIEW_TYPE = {
  [ViewType.days]: 160,
  [ViewType.weeks]: 90,
  [ViewType.months]: 45,
};

export const ITEM_DATE_FORMAT = 'YYYY-MM-DD';

export const ACCIDENTAL_DRAG_DISTANCE = 1;

export const CHECK_FLOAT_REGEX = /[0-9]*.?[0-9]/;

export const ITEM_MIN_HEIGHT = 5.25;

export const MIN_DAYS_AVATAR_DISPLAY = {
  MONTH: 3,
  WEEK: 1,
};

export const WORKLOAD_ROW_HEIGHT = 80;
export const API_PREFIX = '/api/v1';
export const BOARD_ID = Number(
  new URLSearchParams(window.location.search).get('boardId') as string,
);
