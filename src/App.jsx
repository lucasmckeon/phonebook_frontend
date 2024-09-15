import { useEffect, useState } from 'react'
import { Filter } from './Filter';
import { AddNewContact } from './AddNewContact';
import { Contacts } from './Contacts';
import { getPersons,addPerson,deletePerson,updatePerson } from './services/persons';

function handleChange(e,setValue){
  e.preventDefault();
  const value = e.currentTarget.value;
  setValue(value);
}

const statusStates = {
  added :'added',
  updated:'updated',
  deleted:'deleted',
  error: 'error',
  none: 'none'
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [status,setStatus] = useState(statusStates.none)
  const [error,setError] = useState(null)
  const filteredPersons = persons.filter(
    (person)=> person.name.toLowerCase().startsWith(filter.toLowerCase()));
  useEffect(()=>{
    getPersons().then(contacts => setPersons(contacts))
  },[])

  function handleSubmit(e){
    e.preventDefault()
    const newPerson= {name:newName,number:newNumber}
    const foundPerson = persons.find(person=> person.name === newPerson.name)
    if(foundPerson){
      const shouldUpdate = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if(shouldUpdate){
        const asyncUpdate = async () => {
          const person = await updatePerson({...foundPerson,...newPerson})
          const updatedPersons = (persons.filter(p=> p.name !== person.name)).push(person)
          updatePersonsAndStatusView(updatedPersons) 
        }
        asyncUpdate().catch(()=>{
          brieflyShowErrorStatusView("Update error") 
        })
      }
      return
    }

    addPerson(newPerson).then(addedPerson=>{
      updatePersonsAndStatusView(persons.concat(addedPerson))
    }).catch(error=>{
      brieflyShowErrorStatusView(error.response.data.error) 
    }) 
  }

  function updatePersonsAndStatusView(persons){
    setPersons(persons)
    resetFieldState()
    brieflyShowStatusView(statusStates.added)
  }

  /**
   * Need separate function for error status, as we need to set and reset  
   * the error state whenever there is an error. 
   */
  function brieflyShowErrorStatusView(errorMsg){
    setError(errorMsg)
    setStatus(statusStates.error) 
    setTimeout(() => {
      setError(null)
      setStatus(statusStates.none)
    }, 2000); 
  }

  function brieflyShowStatusView(status){
    setStatus(status)
    setTimeout(() => {
      setStatus(statusStates.none)
    }, 2000);
  }

  function resetFieldState(){
    setNewName('')
    setNewNumber('')
    setFilter('')
  }

  function handleDelete(person){
    deletePerson(person).then((success)=>{
      if(!success){
        brieflyShowErrorStatusView("Deletion Person failed")
      } else{
        setPersons(persons.filter(p => p.id !== person.id))
        brieflyShowStatusView(statusStates.deleted)
      }
    })
  }


  function getStatusView(){
    switch(status){
      case statusStates.added:{
        return <h2>Added!</h2>
      }
      case statusStates.updated:{
        return <h2>Updated!</h2>
      }
      case statusStates.deleted:{
        return <h2>Deleted!</h2>
      }
      case statusStates.error:{
        return <h2 style={{color:"red"}}>{error}</h2>
      }
      case statusStates.none:{
        return null;
      }
      default:return null;
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {getStatusView()}
      <Filter changeHandler={(e)=>handleChange(e,setFilter)} filter={filter}/>
      <AddNewContact handleSubmit={handleSubmit} 
      newName={newName} nameChangeHandler={(e)=>handleChange(e,setNewName)} 
      newNumber={newNumber} numberChangeHandler={(e)=>handleChange(e,setNewNumber)}
      />
      <Contacts filteredPersons={filteredPersons} deletePerson={handleDelete}/>
    </div>
  )
}

export default App