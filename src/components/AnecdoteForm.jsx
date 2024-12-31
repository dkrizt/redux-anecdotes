import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();
    if (content) {
      dispatch(addAnecdote(content));
      dispatch(displayNotification(`You created "${content}"`));
    }
    event.target.anecdote.value = '';
  };

  return (
    <form onSubmit={createAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
