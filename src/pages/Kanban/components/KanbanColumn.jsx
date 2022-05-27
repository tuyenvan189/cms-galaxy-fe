import React from 'react';
import KanbanCard from './KanbanCard';
// mui core
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// libs
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { dataBoard } from '../../../mocks/dataKanban';

function KanbanColumn({ column, index }) {
  console.log(column)
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
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    spacing={2}
                    width={280}
                    >
                      {column.cardIds.map((cardId, index) => (
                          <div>
                              <KanbanCard
                                key={cardId}
                                indexn={index}
                                card={dataBoard?.cards[cardId]}
                              />
                          </div>
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