import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { displayNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((a) =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .slice()
      .sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    const votedAnecdote = anecdotes.find((a) => a.id === id);
    dispatch(voteAnecdote(id));
    dispatch(displayNotification(`You voted for "${votedAnecdote.content}"`));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
