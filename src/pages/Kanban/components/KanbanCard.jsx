import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
// mui core
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Typography from '@mui/material/Typography';
import { deleteCard, viewCard } from '../../../redux/slices/kanban';
export default function KanbanCard({card, columnId, index}) {
    const dispatch = useDispatch()
    if (!card) return null;
    
    
    function handleDeleteTodo() {
        dispatch(deleteCard({
            cardId: card.id,
            columnId
        }))
    }

    function handleView() {
        dispatch(viewCard({
            cardId: card.id,
            columnId
        }))
    }
    
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (
                <div 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Card sx={{ minWidth: 275, mb: 2 }}>
                        <CardContent>
                        <Typography variant="body1" component="div">
                            {card.description}
                        </Typography>
                        <Typography sx={{ mb: 1.5, mt: 1 }} color="text.secondary">
                            {card.name}
                        </Typography>
                        <AvatarGroup max={4} sx={{ mb: 1.5 }}>
                            {card?.assignee.length > 0 &&
                            card.assignee.map((ele) => (
                                <Avatar key={ele.id} alt={ele.name} src={ele.avatar} />
                            ))}
                        </AvatarGroup>
                        </CardContent>
                        <CardActions>
                        <Button size="small" onClick={handleDeleteTodo}>Delete</Button>
                        {/* <Button size="small" onClick={handleEdit}>Edit</Button> */}
                        <Button size="small" onClick={handleView}>View</Button>
                        </CardActions>
                    </Card>
                </div>
            )}
        </Draggable>
    )
}