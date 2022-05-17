import React from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa';


const List = ({items, removeItem, editItem})=> {
    return (
        <div className='container shadow-lg p-3 mb-5 bg-white rounded' style={{padding:'15px 10px'}}>
            {items.map((item)=>{

                const {id, title}=item; 
                return (
                    <ul className='list-group list-group-flush' key={id}>
                
                        <li className="list-group-item d-flex justify-content-between align-items-center " style={{border: '1px solid orange',marginBottom:'0.5rem' }}>
                           
                            {title}

                            <div style={{float:'right'}}>
                             
                                <button type="button" className='edit-btn' onClick={()=> editItem(id)}>
                                    <FaEdit />
                                </button>

                                <button type="button" className='delete-btn' onClick={()=> removeItem(id)}>
                                    <FaTrash/>
                                </button>

                            </div>
                        </li>
                    </ul>

                );

            })}
            
        </div>
    );
}


export default List;