import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // ✅ Import useParams
import FieldsHeader from './MyFields/FieldsHeader';
import FieldDefault from '../assets/field-default.png';
import WheatField from '../assets/field-wheat.jpg';
import CarrotField from '../assets/field-carrot.jpg';
import BasilField from '../assets/field-basil.jpg';
import SpinachField from '../assets/field-spinach.jpg';

function MyField() {
  const { id } = useParams(); // ✅ Get the dynamic ID
  const [field, setField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(FieldDefault);

  useEffect(() => {
    const fetchField = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/fields/${id}`, {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setField(data.field);

          switch (data.field.crop_id) {
            case "1":
              setImage(WheatField);
              break;
            case "2":
              setImage(CarrotField);
              break;
            case "3":
              setImage(BasilField);
              break;
            case "4":
              setImage(SpinachField);
              break;
            default:
              setImage(FieldDefault);
          }
        } else {
          console.error('Failed to fetch field');
        }
      } catch (err) {
        console.error('Error fetching field:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchField();
  }, [id]);

  return (
    <>
      <FieldsHeader>My Field</FieldsHeader>
      <div className='w-full h-full rounded-lg overflow-hidden'>
        {loading ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-gray-500'>Loading...</p>
          </div>
        ) : (
          <div className='w-full h-32'>
            <img
              src={image}
              alt="Field"
              className="object-cover w-full h-full"
            />
          </div>
        )}
        <div className="">

        </div>
      </div>
    </>
  );
}

export default MyField;
