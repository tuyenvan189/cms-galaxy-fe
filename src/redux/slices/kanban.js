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
      const { payload } = action;
      // add id card into column
      state.board.columns[payload.columnId].cardIds.push(payload.cards.id);
      // add informatino card into cards
      state.board.cards = {
        ...state.board.cards,
        [payload.cards.id]: payload.cards
      }
    },
    deleteCard: (state, action) => {
      const { cardId, columnId } = action.payload;
      // remove card id in columns
      const cardIndex = state.board.columns[columnId].cardIds.findIndex(idElement => idElement === cardId);
      state.board.columns[columnId].cardIds.splice(cardIndex, 1);

      // remove information card in cards;
      delete state.board.cards[cardId]

      console.log('deelete: ', JSON.parse(JSON.stringify(state.board)))
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
} = kanbanSlices.actions;

export default kanbanSlices.reducer