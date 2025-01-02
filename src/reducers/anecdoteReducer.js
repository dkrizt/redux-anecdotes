import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

export const fetchAnecdotes = createAsyncThunk(
  'anecdotes/fetchAnecdotes',
  async () => {
    const anecdotes = await anecdoteService.getAll();
    return anecdotes;
  }
);

export const addNewAnecdote = createAsyncThunk(
  'anecdotes/addNewAnecdote',
  async (content) => {
    const newAnecdote = await anecdoteService.createNew(content);
    return newAnecdote;
  }
);

export const voteAnecdoteThunk = createAsyncThunk(
  'anecdotes/voteAnecdote',
  async ({ id, anecdote }) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    return await anecdoteService.update(id, updatedAnecdote);
  }
);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnecdotes.fulfilled, (state, action) => action.payload)
      .addCase(addNewAnecdote.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(voteAnecdoteThunk.fulfilled, (state, action) => {
        const updatedAnecdote = action.payload;
        const index = state.findIndex((a) => a.id === updatedAnecdote.id);
        if (index !== -1) state[index] = updatedAnecdote;
      });
  },
});

export default anecdoteSlice.reducer;
