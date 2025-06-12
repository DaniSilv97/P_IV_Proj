import React from 'react'
import FieldCard from './MyFields/FieldCard';
import NewFieldCard from './MyFields/NewFieldCard';
import FieldsHeader from './MyFields/FieldsHeader';

function MyFields() {
  const fieldCards = [
    {
      id:"123",
      image: "", 
      name: "Field 1", 
      temperature: "hello", 
      humidity: "hello",
    },
    {
      id:"1234",
      image: "", 
      name: "Field 2", 
      temperature: "20", 
      humidity: "60",
    },
    {
      id:"1235",
      image: "", 
      name: "Field 3", 
      temperature: "hello", 
      humidity: "60",
    },
    {
      id:"1236",
      image: "", 
      name: "Field 4", 
      temperature: "20", 
      humidity: "60",
    },
    {
      id:"1237",
      image: "", 
      name: "Field 5", 
      temperature: "20", 
      humidity: "60",
    },
  ]
  return (
    <>
      <FieldsHeader/>
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-x-6 gap-y-10 p-4 w-full justify-center">
        {fieldCards.map((card) => (
          <FieldCard key={card.id} {...card} ></FieldCard>
        ))}
        <NewFieldCard key="new-field"/>
      </div>
    </>
  );
}

export default MyFields;
