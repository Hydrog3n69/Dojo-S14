import './App.css';
import { useEffect, useState} from 'react';
import axios from 'axios'

import { useForm } from 'react-hook-form';

function App() {
  const [search, setSearch] = useState('')
  const {register, handleSubmit} = useForm()
  const [getName, setGetName] =useState([])

  const handleSearchValue = (event) => {
    setSearch(event.target.value)
  }

  useEffect(()=> {
      axios.get('http://localhost:5000')
      .then((res)=> 
      setGetName(res.data)
  )},[])

const onSubmit =(form) => {
  axios.post('http://localhost:5000', form)
  .then((res) =>console.log(res.data)
  )}

  const deleteMoi = (id) => {
    axios.delete(`http://localhost:5000/${id}`)
    .then(() => {
      setGetName((name) => name.filter((n) => n.id !==id))
    }
    )}
  return (
    <div className="App">
      <img src="./unknown.png" alt="thomas-torvalds" className="App-logo" />
      <form className='App-header' onSubmit={handleSubmit(onSubmit)}
        method="POST"
        action="send">
      <ul>
        {getName
        .map((student) => (    
          <div key={student.id}>
          <li>{student.prenom} {student.nom} {student.promo}</li>
          <button type="button" onClick={() => deleteMoi(student.id)}>Delete</button>
          </div>       
        ))}
       
      </ul>
        <input
        type="text"
        placeholder='Prénom'
        {...register("prenom")}
        >
        </input>
        <input
        type='text'
        placeholder='Nom'
        {...register("nom")}
        >
        </input>
        <input
        type="text"
        placeholder='Promo'
        {...register("promo")}
        >
        </input>
        <button
        type='submit'
        >
          Post
        </button> 
      </form>
      <input
      type='text'
      placeholder='Search'
      value={setSearch}
      onChange={handleSearchValue}
      >
      </input>
    </div>
  );
}

export default App;
