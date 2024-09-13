export function AddNewContact({handleSubmit,newName,nameChangeHandler,newNumber,numberChangeHandler}){
  return (
    <>
        <h2>add a new</h2>
        <form onSubmit={handleSubmit}>
          <div>
            name: <input value={newName} onChange={nameChangeHandler} />
          </div>
          <div>number: <input value={newNumber} onChange={numberChangeHandler} /></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
  )
}