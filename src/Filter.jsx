export function Filter({filter,changeHandler}){
   return <div>Filter Contacts: <input onChange={changeHandler} value={filter} /></div>
}