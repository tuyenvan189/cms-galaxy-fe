import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Input} from 'reactstrap';

import '../../index.css'
import './Kanban.scss'

// libs
import { DragDropContext, Droppable} from 'react-beautiful-dnd';
// mui core
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
// mocks
import { dataBoard } from '../../mocks/dataKanban';
// sections
import KanbanColumn from './components/KanbanColumn';

// redux
import { getBoards, updateCardOrder, updateColumnOrder, addCard } from '../../redux/slices/kanban';


export default function Kanban() {
  const dispatch = useDispatch();
  const board = useSelector(state => state.kanban.board);
  const [open, setOpen] = useState(false);
  //const [boards, setBoards] = useState(board)
  const [forms, setForms] = useState({
    id:'',
    name: '',
    description: '',
    column: ''
  })
  function onChange(event) {
    const { name,value } = event.target;
    setForms(prevState => {
      return {
        ...prevState,
        [name]:value
      }
    })
  }
  function handleSubmit(e) {
    e.preventDefault();

    if(!forms.column) {
      // show validate
      return
    };

    const object = {
      columnId: forms.column,
      cards: {
        id: Date.now().toString(),
        description: forms.description,
        name:  forms.name,
        assignee: []
      }
    }
    dispatch(addCard(object));
    setOpen(false);
    // call api to save todo item into db
    // ...
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  

  // get data board
  useEffect(() => {
    dispatch(getBoards(dataBoard));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log('board: ', board)



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
    <div>
      <h2>Kanban Board</h2>
      <div className="">
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            + ADD CARD
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>ADD CARD</DialogTitle>
                <FormControl style={{padding: '20px'}}>
                  <TextField id="standard-basic" label="Name" variant="standard" name='name' value={forms.name} onChange={onChange}/>
                  <TextField id="standard-basic" label="Description" variant="standard" style={{marginTop:'20px'}} name='description' onChange={onChange} value={forms.description}/>
                  <FormLabel id="demo-row-radio-buttons-group-label" style={{marginTop:'40px'}}>Column</FormLabel>
                  <Input type="select" name="column" value={forms.column} onChange={onChange}>
                    <option value="">Please choose column</option>
                    <option value="8cd887ec-b3bc-11eb-8529-0242ac130003">Backlog</option>
                    <option value="23008a1f-ad94-4771-b85c-3566755afab7">Progress</option>
                    <option value="37a9a747-f732-4587-a866-88d51c037641">Q&A</option>
                    <option value="4ac3cd37-b3e1-466a-8e3b-d7d88f6f5d4f">Production</option>
                  </Input>
                </FormControl>
            <DialogActions>
              <Button onClick={handleClose}>CANCEL</Button>
              <Button onClick={handleSubmit}>ADD</Button>
            </DialogActions>
          </Dialog>
        </div>
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
    </div>
  );
}