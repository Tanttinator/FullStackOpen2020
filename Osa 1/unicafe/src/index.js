import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Increment = (value, func) => () => {
  func(value + 1)
}

const Button = ({name, value, func}) => <button onClick={Increment(value, func)} >{name}</button>

const StatisticLine = ({name, value}) => <tr><td>{name}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {

  const Sum = () => good + neutral + bad
  const Avg = () => (good - bad) / Sum()
  const Positive = () => good * 100 / Sum()

  if(Sum() === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine name="Good" value={good} />
          <StatisticLine name="Neutral" value={neutral} />
          <StatisticLine name="Bad" value={bad} />
          <StatisticLine name="All" value={Sum()} />
          <StatisticLine name="Average" value={Avg()} />
          <StatisticLine name="Positive" value={Positive() + "%"} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="Good" value={good} func={setGood} />
      <Button name="Neutral" value={neutral} func={setNeutral} />
      <Button name="Bad" value={bad} func={setBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
