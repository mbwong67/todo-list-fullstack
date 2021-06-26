import React, { useContext } from 'react';
import TodosContext from '../../context/TodosContext';
import { makeStyles } from '@material-ui/core/styles';
import Media from 'react-media';
import LargeTable from './tables/LargeTable'
import SmallTable from './tables/SmallTable'

const Todo = ({ todo, index, theme }) => {
    const { todosState, todosDispatch } = useContext(TodosContext);

    const useStyles = makeStyles(theme => ({
        edit: {
            backgroundColor: todosState.editTodo.id === todo.id ? '#283618' : 'dark',
        },

        classesRowEvenColor: {
            backgroundColor: todosState.editTodo.id === todo.id ? '#283618' : theme.palette.divider,
        },

    }));

    const classes = useStyles(theme);

    const handleDelete = () => {
        todosDispatch({ type: 'DELETE_TODO', payload: todo.id });
    }

    const handleEdit = () => {
        todosDispatch({ type: 'SET_EDIT_TODO', payload: todo });
    }

    const handleComplete = () => {
        todosDispatch({ type: 'COMPLETE_TODO', payload: todo.id });
    }

    const handleRowColor = (index, iaAlternateRowColor) => {
        return (index % 2 && iaAlternateRowColor ? classes.classesRowEvenColor : '');
    }

    return (
        <>
            <Media query="(max-width: 1000px)">
                {matches => {
                    return matches ?
                        (
                            <SmallTable
                                todo={todo}
                                index={index}
                                iaAlternateRowColor={todosState.isAlternateRowColor}
                                handleDelete={handleDelete}
                                handleComplete={handleComplete}
                                handleEdit={handleEdit}
                                classesEdit={classes.edit}
                                handleRowColor={handleRowColor}
                            />
                        ) :
                        (
                            <LargeTable
                                todo={todo}
                                index={index}
                                iaAlternateRowColor={todosState.isAlternateRowColor}
                                handleDelete={handleDelete}
                                handleComplete={handleComplete}
                                handleEdit={handleEdit}
                                classesEdit={classes.edit}
                                handleRowColor={handleRowColor}
                            />
                        )
                }}
            </Media>
        </>
    )
}

export default Todo
