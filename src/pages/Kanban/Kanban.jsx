import React, {useState, useEffect} from 'react'
import KanbanColumn from './components/KanbanColumn'


import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

// libs
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

// mocks
import { dataBoard } from '../../mocks/dataKanban'

export default function Kanban() {
  const [todos, setTodos] = useState([]);

  console.log('board: ', dataBoard)

  function onDragEnd(result) {
    console.log('onDragEnd: ', result)
  }

  // const fetchTodos = async () => {
  //   const data = await todosApi.fetchTodos();
  //   setTodos(data.data)
  // }
  // useEffect(() => {
  //   fetchTodos()
  // }, []) 

  // function onChange(e) {
  //   const {name,value} = e.target
  //   setForms({
  //     ...forms,
  //     [name]:value
  //   })
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   const newTodo = {
  //     id: Date.now().toString(),
  //     title: forms.title,
  //     author: forms.author,
  //     description: forms.description,
  //     status: 'new',
  //   }
  //   const res = await fetch(`https://tony-json-server.herokuapp.com/api/todos`, {
  //     method: 'POST',
  //     headers: { 
  //       'Content-Type' : 'application/json'
  //     },
  //     body: JSON.stringify(newTodo)
  //   })
  //   const data = await res.json()
  //   setTodos([...todos, data.data])
  //   setOpen(false);
  // }
  

  return (
    <>
      <div className="group">
        <h2>Kanban Board</h2>
        <Button variant="contained" size="small" sx={{ bgcolor: 'secondary.main' }} >
          + ADD TASK
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableI='all-columns' direction='horizontal' type='column'>
          {(provided) => (
            <Stack
              {...provided.droppableProps}
              ref = {provided.innerRef}
              direction='row'
              alignItems='flex-start'
              spacing={3}
              sx={{ height: 'calc(100%-32px)', overflowY: 'hidden'}}
            >
              {dataBoard.columnOrder.map((columnId, index) => (
                <KanbanColumn 
                key={columnId}
                index={index}
                column={dataBoard.columns[columnId]}
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