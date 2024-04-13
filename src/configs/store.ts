import { configureStore } from '@reduxjs/toolkit';
import activitySlice from '../../src/redux/activity/activitySlice';
import generalSlice from '../../src/redux/general/generalSlice';
import peopleSlice from '../../src/redux/people/peopleSlice';
import projectSlice from '../../src/redux/project/projectSlice';
import scheduleMeasurementSlice from '../../src/redux/schedule/scheduleMeasurementSlice';
import scheduleSlice from '../../src/redux/schedule/scheduleSlice';
import settingsSlice from '../../src/redux/setting/settingSlice';

export const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    schedule: scheduleSlice.reducer,
    scheduleMeasurement: scheduleMeasurementSlice.reducer,
    settings: settingsSlice.reducer,
    activity: activitySlice.reducer,
    people: peopleSlice.reducer,
    project: projectSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
