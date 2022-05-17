import React from 'react';
import {useState, useEffect} from 'react';
import List from './List';
import api from '../api/list';



const App = ()=> {
  const[name, setName]= useState("");
  const[listwork, setList]= useState([]);
  const[isEditing,setIdEditing]= useState(false);
  const[editID,setEditID]= useState(null);


  const retrieveListWork = async()=>{
    const response = await api.get("/listwork")
    return response.data;
  }
  useEffect(()=>{
    const getAllListWork = async ()=>{
      const listworkAll = await retrieveListWork();
      if(listworkAll) setList(listworkAll);

    };
    getAllListWork();
  },[]);


  const handleSubmit= async(e) =>{
    
    e.preventDefault();
    if(!name){
      console.log('enter the value in the field');
    }else if(name && isEditing){
      setList(
        listwork.map((item)=>{
          if(item.id === editID){
            let temp={
              id:editID,
              title:name
            }
            api.put('listwork/'+editID,temp);

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
      const response = await api.post("/listwork", newItem);
      const newList =[...listwork, response.data];
      setList(newList);
      setName("");
    }

  };
 
  const removeItem= async(id) =>{
    await api.delete('listwork/'+ id);
    setList(listwork.filter((item)=> item.id !== id));
  };
  const editItem= async(id) =>{
    const editItem = listwork.find((items)=> items.id === id);
    setIdEditing(true);
    setEditID(id);
    setName(editItem.title);
    
  };
  const clearList= async() =>{
    listwork.map(async(item)=>{
      await api.delete('listwork/'+item.id);

    })
    setList([]);
  };
  
  return (
    <section className='section-center'>
      <form onSubmit={handleSubmit}>
        <h1 style={{marginBottom:'1.5rem', textAlign:'center', color:'#FF8C32', fontWeight:'bold'}}>
          Todo List -Work
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
      {listwork.length >0 && (
        <div style={{marginTop:"2rem"}}>
          <List items={listwork} removeItem={removeItem} editItem={editItem} />
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
