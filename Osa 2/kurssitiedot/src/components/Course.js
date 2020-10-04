import React from 'react'

const Course = ({course}) => {
  return(
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({course}) => {
  return (
    <h2>{course}</h2>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <p><b>Number of exercises {parts.map(part => part.exercises).reduce((a, b) => a + b)}</b></p>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

export default Course