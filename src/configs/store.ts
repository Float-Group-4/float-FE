import { configureStore } from '@reduxjs/toolkit';
import scheduleSlice from '../../src/redux/schedule/scheduleSlice';
import scheduleMeasurementSlice from '../../src/redux/schedule/scheduleMeasurementSlice';
import settingsSlice from '../../src/redux/setting/settingSlice';
import generalSlice from '../../src/redux/general/generalSlice';
import activitySlice from '../../src/redux/activity/activitySlice';

export const store = configureStore({
  reducer: {
    schedule: scheduleSlice.reducer,
    scheduleMeasurement: scheduleMeasurementSlice.reducer,
    settings: settingsSlice.reducer,
    general: generalSlice.reducer,
    activity: activitySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
