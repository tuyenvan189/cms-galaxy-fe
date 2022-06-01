import React from 'react';
import { useSelector } from 'react-redux';
// mui core
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// libs
import { Draggable, Droppable } from 'react-beautiful-dnd';
// sections
import KanbanCard from './KanbanCard';

function KanbanColumn({ column, index }) {
  const board = useSelector(state => state.kanban.board);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, bgColor: 'grey.5008'}}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <Typography component="h5" variant="h5" sx={{ pt: 2 }}>
              {column.name} 
            </Typography>

            <Droppable droppableId={column.id} type="task">
              {(provided) => (
                <Stack
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  spacing={2}
                  width={280}
                >
                  {column.cardIds.map((cardId, index) => (
                    <KanbanCard 
                      key={cardId}
                      index={index}
                      card={board?.cards[cardId]}
                    />
                  ))}

                  {provided.placeholder}
                  
                </Stack>
              )}
            </Droppable>
          </Stack>
        </Paper>
      )}
    </Draggable>
  )
}

export default KanbanColumn