import React from 'react'

const Persons = ({persons, filter, remove}) => 
    <div>
        {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
        <div key={person.id}>
            {person.name} {person.number} <button onClick={() => { if(window.confirm(`Delete ${person.name} ?`)) { remove(person.id) }}} >delete</button>
        </div>
        )}
    </div>

export default Persons