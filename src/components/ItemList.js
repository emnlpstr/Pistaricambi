import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the items!", error);
      });
  }, []);

  return (
    <div>
      <h1>Warehouse Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name} - {item.category} - {item.quantity} - {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;