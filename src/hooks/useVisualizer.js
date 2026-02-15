import { useState } from 'react';

export const useVisualizer = () => {
  const [array, setArray] = useState([]);

  const generateRandomArray = (size = 20) => {
    const newArray = Array.from({ length: size }, () => ({
      value: Math.floor(Math.random() * 400) + 20,
      status: 'default',
    }));
    setArray(newArray);
  };

  return { array, setArray, generateRandomArray }; 
};
