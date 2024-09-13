import axios from 'axios';
const baseUrl = '/api/persons'

async function getPersons() {
  const response = await axios.get(baseUrl)
  return response.data
}

async function addPerson(person) {
  const response = await axios.post(baseUrl,person)
  return response.data
}

async function updatePerson(person) {
  const response = await axios.put(`${baseUrl}/${person.id}`,person)
  return response.data
}

async function deletePerson(person) {
  try {
    const response = await axios.delete(`${baseUrl}/${person.id}`)
    if(response.status === 200 || response.status === 204){ 
      console.log("Response",response)
      return true
    }
  } catch (err) {
    console.log("Failed to delete person",err)
    return false;
  }
  
}

export {getPersons,addPerson,deletePerson,updatePerson}