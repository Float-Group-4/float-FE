import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ItemActivity = {
  itemId: number | null;
  rowId: number | null;
  isRightMenuShow: boolean;
};
interface ActivityState {
  itemActivity: ItemActivity | null;
  jumpSearchActivity: { id: string } | null;
}
export const initialActivityState: ActivityState = {
  itemActivity: null,
  jumpSearchActivity: null,
};

const activitySlice = createSlice({
  name: 'activity',
  initialState: initialActivityState,
  reducers: {
    setItemActivity: (state, action: PayloadAction<ItemActivity | null>) => {
      if (action.payload === null) {
        state.itemActivity = null;
        return;
      }
      state.itemActivity = { ...state.itemActivity, ...action.payload };
    },
    setJumpSearchActivity: (state, action: PayloadAction<{ id: string } | null>) => {
      if (action.payload) {
        state.jumpSearchActivity = { id: action.payload.id };
      } else {
        state.jumpSearchActivity = null;
      }
    },
  },
});

export const { setItemActivity, setJumpSearchActivity } = activitySlice.actions;
export default activitySlice;
