import React from 'react';
import {useState, useEffect} from 'react';
import List from './List';
import api from '../api/list';



const App = ()=> {
  const[name, setName]= useState("");
  const[list, setList]= useState([]);
  const[isEditing,setIdEditing]= useState(false);
  const[editID,setEditID]= useState(null);


  const retrieveList = async()=>{
    const response = await api.get("/list")
    return response.data;
  }
  useEffect(()=>{
    const getAllList = async ()=>{
      const listAll = await retrieveList();
      if(listAll) setList(listAll);

    };
    getAllList();
  },[]);


  const handleSubmit= async(e) =>{
    
    e.preventDefault();
    if(!name){
      console.log('enter the value in the field');
    }else if(name && isEditing){
      setList(
        list.map((item)=>{
          if(item.id === editID){
            let temp={
              id:editID,
              title:name
            }
            api.put('list/'+editID,temp);

            return {...item, title: name};
          }
          return item; 
        })
        
    );
    setName("");
    setEditID(null);
    setIdEditing(false);
    }else {
      const newItem ={id:Math.floor(Math.random()*100000), title: name};
      const response = await api.post("/list", newItem);
      const newList =[...list, response.data];
      setList(newList);
      setName("");
    }

  };
 
  const removeItem= async(id) =>{
    await api.delete('list/'+ id);
    setList(list.filter((item)=> item.id !== id));
  };
  const editItem= async(id) =>{
    const editItem = list.find((items)=> items.id === id);
    setIdEditing(true);
    setEditID(id);
    setName(editItem.title);
    
  };
  const clearList= async() =>{
    list.map(async(item)=>{
      await api.delete('list/'+item.id);

    })
    setList([]);
  };
  
  return (
    <section className='section-center'>
      <form onSubmit={handleSubmit}>
        <h1 style={{marginBottom:'1.5rem', textAlign:'center', color:'#FF8C32', fontWeight:'bold'}}>
          Todo List -Home
        </h1>
        <div className='mb-3 form'>
          <input 
          type="text" 
          className='form-control' 
          placeholder='e.g. do assignment' 
          onChange={(e)=>setName(e.target.value)} 
          value={name}
          required
          />

          <button type="submit" className='button-green' style={{marginLeft:"5px"}}>
            {isEditing ? "Edit":"Submit"}
          </button>
        </div>

      </form>
      {list.length >0 && (
        <div style={{marginTop:"2rem"}}>
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <div className='text-center'>
            <button className='btn btn-warning btn-delete' style={{marginBottom:'40px'}} onClick={clearList}>
              Clear All Items
            </button>
          </div>
        </div>


      )}

    </section>

  );
}

export default App;
