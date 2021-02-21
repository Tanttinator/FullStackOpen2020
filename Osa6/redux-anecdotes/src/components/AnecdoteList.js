import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = (props) => {

    const vote = async (anecdote) => {
        props.voteAnecdote(anecdote)
        props.showNotification(`you voted "${anecdote.content}"`, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {props.anecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    const anecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    anecdotes.sort((a, b) => b.votes - a.votes)
    return { anecdotes }
}

const ConnectedAnecdoteList = connect(mapStateToProps, { voteAnecdote, showNotification })(AnecdoteList)
export default ConnectedAnecdoteList