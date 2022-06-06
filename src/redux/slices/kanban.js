import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  board: {}
}

export const kanbanSlices = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    getBoards: (state, action) => {
      state.board = action.payload;
    },
    updateColumnOrder: (state, action) => {
      state.board.updateColumnOrder = action.payload
    },
    updateCardOrder: (state,action) => {
      state.board.columns = action.payload;
    },
    addCard: (state, action) => {

    },
    deleteCard: (state, action) => {

    },
    updateCardInfo: (state, action) => {

    },
    updateColumnInfo: (state, action) => {

    },
    viewCard: (state, action) => {

    }
  }
})

export const {
  getBoards,
  updateColumnOrder,
  updateCardOrder,
  addCard,
  deleteCard,
  updateCardInfo,
  updateColumnInfo,
  viewCard
} =kanbanSlices.actions;

export default kanbanSlices.reducer