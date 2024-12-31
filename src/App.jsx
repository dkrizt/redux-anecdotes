import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const [newAnecdote, setNewAnecdote] = useState('')

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: id
    })
  }

  const createAnecdote = (event) => {
    event.preventDefault();
    if (newAnecdote.trim() === '') return;// Check if the input is empty or consists of only spaces
    // Dispatch the action to add a new anecdote
    dispatch({
      type: 'CREATE',
      payload: newAnecdote,
    });
    setNewAnecdote(''); // Clear the input field
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .slice() // Make a copy to avoid mutating the original state
        .sort((a, b) => b.votes - a.votes) // Sort by votes in descending order
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input
            value={newAnecdote}
            onChange={(e) => setNewAnecdote(e.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App