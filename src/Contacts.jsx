
function Person({person,deletePerson}){
  function deleteClicked(){
    if(window.confirm(`Delete ${person.name} ?`))
      deletePerson(person)
  }
  return (
    <>
    {`${person.name} ${person.number}`} <button onClick={deleteClicked}>delete</button>
    </>
  )
}

export function Contacts({filteredPersons,deletePerson}){
  return (
    <>
      <h2>Contact Info</h2>
      <div>{filteredPersons.map((person)=>
        <div key={person.name}><Person person={person} deletePerson={deletePerson} /></div>)}
      </div>
    </>
  )
}