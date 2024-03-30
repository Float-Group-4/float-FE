export enum UserType {
  users = 'users',
  admin = 'admin',
}

export enum APIVersion {
  stable = '2023-07',
  new = '2023-10',
}

export enum Loading {
  idle = 'idle',
  pending = 'pending',
  succeeded = 'succeeded',
  failed = 'failed',
}

export enum MondayInteractionEvents {
  newItems = 'new_items',
  changeColumnValues = 'change_column_values',
  boardCommunication = 'board_communication',
  newZoomMeetingStartedByMe = 'new_zoom_meeting_started_by_me',
  postResolved = 'post_resolved',
}

export enum MondayStorageKey {
  whatsNewVersion = 'TB_WHATSNEW_VERSION',
  welcome = 'WELCOME_V1',
  boardvisibilityPrefix = 'TBA_',
  teamboardAppSettingPrefix = 'TBA_AppSettings',
}
export enum LocalStorageKey {
  preferences = 'preferences',
  settings = 'settings',
  activity = 'activities',
  timeRange = 'timerange',
}
export enum Hotkey {
  search = 'search',
  fastForward = 'fastForward',
  fastPrevious = 'fastPrevious',
}
export enum ViewType {
  days = 'days',
  weeks = 'weeks',
  months = 'months',
}

export enum ViewDensity {
  compact = 'compact',
  comfortable = 'comfortable',
  spacious = 'spacious',
}

export enum AppTheme {
  light = 'light',
  dark = 'dark',
  hacker_theme = 'hacker_theme',
  night = 'black',
}

export enum IconSize {
  sm = 16,
  md = 20,
  lg = 24,
  xl = 30,
  xxl = 34,
}

export enum ColumnValueType {
  people = 'people',
  numbers = 'numbers',
  status = 'status',
  color = 'color_picker',
  subitems = 'subtasks',
  timeline = 'timeline',
}
export enum hotkeyScope {
  default = 'global',
  binding = 'bindingKey',
}

export enum AssigneesColumnEvent {
  remove = 'removed_person_or_team',
  add = 'added_person_or_team',
  removeAll = 'removed_all_person_and_team',
}

export enum SettingsObjectType {
  modal = 'settingModal',
  button = 'settingButton',
}
export enum TipseenType {
  todayButton = 'today',
  viewType = 'view',
  quickAssist = 'quickAssist',
}

export enum RowDisplayType {
  assignees = 'Assignees',
  teams = 'Teams',
}

export enum UserFilterType {
  teams = 'Teams',
  users = 'Users',
}

export enum ResizeDirection {
  left = 'L',
  right = 'R',
  bottom = 'B',
}

export enum TimeRangeMode {
  thisWeek = 'thisWeek',
  nextWeek = 'nextWeek',
  lastWeek = 'lastWeek',
  thisMonth = 'thisMonth',
  nextMonth = 'nextMonth',
  lastMonth = 'lastMonth',
  custom = 'custom',
}

export enum WorkloadViewType {
  byHour = 'hour',
  byPercent = 'percent',
}

export enum ItemColorType {
  byField = 1,
  byGroup = 2,
  byStatus = 3,
}

export enum BoardType {
  public = 'Public',
  sharing = 'Sharing',
  private = 'Private',
}

export enum MondayViewMode {
  widget = 'widget',
  board = 'board',
}

export enum MondayInstanceType {
  dashboardWidget = 'dashboard_widget',
  boardView = 'board_view',
}

export enum MapField {
  timeline = 'timeline',
  assignees = 'assignees',
  hour = 'hour',
  status = 'status',
  color = 'color',
  // subitems = string;
}

export enum ItemLevelSetting {
  main = 1,
  sub = 2,
  both = 3,
}

export enum CursorSelectMode {
  select = 1,
  multiSelect = 2,
}

export enum WorkHourFormatSetting {
  totalHours = 1,
  hoursPerDay = 0,
}

export enum DailyWorkHourSetting {
  isManual = 0,
  isSchema = 1,
}

export enum daysIndex {
  Su = '0',
  Mo = '1',
  Tu = '2',
  We = '3',
  Th = '4',
  Fr = '5',
  Sa = '6',
}

export enum TimelogFilterType {
  itemLevels = 'ItemLevels',
  boards = 'Boards',
  assignees = 'Assignees',
  groups = 'Groups',
  statuses = 'Statuses',
  categories = 'Categories',
  workspaces = 'Workspaces',
}

export enum BudgetValue {
  zero = 'No budget',
  one = 'Hours by project',
  two = 'Fee by project',
  three = 'Hourly rate',
}

export enum ProjectType {
  billable = 'Billable',
  nonBillable = 'nonBillable',
}
