import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// libs
import { DragDropContext, Droppable} from 'react-beautiful-dnd';
// mui core
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// mocks
import { dataBoard } from '../../mocks/dataKanban';
// sections
import KanbanColumn from './components/KanbanColumn';

// redux
import { getBoards, updateCardOrder, updateColumnOrder } from '../../redux/slices/kanban';


export default function Kanban() {
  const dispatch = useDispatch();
  const board = useSelector(state => state.kanban.board);

  // get data board
  useEffect(() => {
    dispatch(getBoards(dataBoard));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log('board: ', board)


  function onDragEnd(result) {
    console.log(result)
    const { source, destination, draggableId, type } = result;

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    // update column order
    if(type === 'column') {
      const newColumnOrder = [...board.columnOrder];
      newColumnOrder.splice(source.index, 1); // delete position current
      newColumnOrder.splice(destination.index, 0, draggableId); // add new position;
      dispatch(updateColumnOrder(newColumnOrder))
    }
    
    // update card order
    const startCard = board.columns[source.droppableId];
    const endCard = board.columns[destination.droppableId];

    // same column
    if(startCard.id === endCard.id) {
      const newCardsId = [...startCard.cardIds];
      newCardsId.splice(source.index, 1); // delete position current
      newCardsId.splice(destination.index, 0, draggableId); // add new position;

      const obj = {
        ...startCard,
        cardIds: newCardsId
      }
      dispatch(updateCardOrder({
        ...board.columns,
        [obj.id]: obj
      }))
      return;
    }

    // different column
    const startCardIds = [...startCard.cardIds];
    startCardIds.splice(source.index, 1);
    const updatedStart = {
      ...startCard,
      cardIds: startCardIds
    }

    const endCardIds = [...endCard.cardIds];
    endCardIds.splice(destination.index, 0, draggableId);
    const updatedEnd = {
      ...endCard,
      cardIds: endCardIds
    }

    dispatch(updateCardOrder({
      ...board.columns,
      [updatedStart.id]: updatedStart,
      [updatedEnd.id]: updatedEnd,
    }))

  }

  return (
    <>
      <div className="group">
        <h2>Kanban Board</h2>
        <Button variant="contained" size="small" sx={{ bgcolor: 'secondary.main' }}>
          + ADD TASK
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='all-colums' direction='horizontal' type="column">
          {(provided) => (
            <Stack
              {...provided.droppableProps}
              ref={provided.innerRef}
              direction="row"
              alignItems="flex-start"
              spacing={3}
              sx={{ height: "calc(100% - 32px)", overflowY: "hidden"}}
            >
              {board?.columnOrder?.map((columnId, index) => (
                <KanbanColumn
                  key={columnId}
                  index={index}
                  column={board.columns[columnId]}
                />
              ))}

              {provided.placeholder}
              
            </Stack>
          )}
        </Droppable>
      </DragDropContext>

      
    </>

  );
}