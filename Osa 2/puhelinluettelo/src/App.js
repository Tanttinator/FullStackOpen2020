import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'
import PersonsList from './components/Persons'
import Notification from './components/Notification'
import Persons from './services/Persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [statusMessage, setStatusMessage] = useState(null)

  useEffect(() => {
    Persons.getAll().then(data => setPersons(data))
  }, [])
  
  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const showStatusMessage = (text, type) => {
    setStatusMessage({text, type})
    setTimeout(() => {
      setStatusMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
      event.preventDefault()
      //if(newName.length === 0 || newNumber.length === 0) return

      const index = persons.findIndex(x => x.name === newName)

      if(index === -1) {
        Persons.create({ name: newName, number: newNumber }).then(data => {
          setPersons(persons.concat(data))
          showStatusMessage(`Added ${data.name}`, 'success')
        }).catch(error => {
          console.log(error.response.data)
          showStatusMessage(error.response.data.error, 'error')
        })
      } else {
        const oldPerson = persons[index]
        if(window.confirm(`${oldPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
          Persons.update(oldPerson.id, {...oldPerson, number: newNumber}).then(data => {
            setPersons(persons.map(person => person.id !== data.id ? person : data))
            showStatusMessage(`Updated ${data.name}`, 'success')
          }).catch(error => {
            setPersons(persons.filter(person => person.id !== oldPerson.id))
            showStatusMessage(`${oldPerson.name} doesn't exist on the server anymore`, 'error')
          })
        }
      }
      setNewName('')
      setNewNumber('')
  }

  const removePerson = id => {
    Persons.remove(id).then(response => {
      setPersons(persons.filter(person => person.id !== id))
      showStatusMessage(`Removed ${persons.find(person => person.id === id).name}`, 'success')
    })
  }

  const changeFilter = (event) => {
      setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage} />
      <Filter value={filter} callback={changeFilter} />
      <h2>Add new person</h2>
      <NewPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonsList persons={persons} filter={filter} remove={removePerson} />
    </div>
  )

}

export default App