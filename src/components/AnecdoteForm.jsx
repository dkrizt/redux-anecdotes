import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();
    if (content) {
      dispatch(addAnecdote(content));
      event.target.anecdote.value = ''; // Clear the input field
    }
  };

  return (
    <form onSubmit={createAnecdote}>
      <h2>Create New</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
