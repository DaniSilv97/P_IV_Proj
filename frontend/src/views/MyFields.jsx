import React, { useEffect, useState } from 'react';
import FieldCard from './MyFields/FieldCard';
import NewFieldCard from './MyFields/NewFieldCard';
import LoadingFieldCard from './MyFields/LoadingFieldCard';
import FieldsHeader from './MyFields/FieldsHeader';
import ModalBase from '../components/ModalBase';
import BaseButton from '../components/BaseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWheatAwn,
  faCarrot,
  faLeaf,
  faSeedling
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

function MyFields() {
  const [fieldCards, setFieldCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setDeleteModalState] = useState(false);
  const [isCreateModalOpen, setCreateModalState] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedField !== null) {
      console.log('Selected field updated:', selectedField);
    }
  }, [selectedField]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/fields', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          setFieldCards(data.fields);
        } else {
          console.error('Failed to fetch fields');
        }
      } catch (err) {
        console.error('Error fetching fields:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  const handleDeleteField = (fieldId) => {
    setSelectedField(fieldId);
    setDeleteModalState(true);
  }
  
  const handleConfirmDelete = async () => {
    if (selectedField === null) return;
      try {
        const res = await fetch(`http://localhost:5000/api/fields/${selectedField}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (res.ok) {
          setFieldCards(prev => prev.filter(field => field.field_id !== selectedField));
          setDeleteModalState(false);
        } else {
          console.error('Failed to delete field');
        }
      } catch (err) {
        console.error('Error deleting field:', err);
      }
  }

  const handleCreateField = async () => {
    const nameRegex = /^[\w\s]{3,}$/;
    const errors = {};
    if (!nameRegex.test(newField.fieldName)) {
      errors.fieldName = 'Field name must be at least 3 characters.';
    }
    const lat = parseFloat(newField.latitude);
    const lon = parseFloat(newField.longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      errors.latitude = 'Latitude must be between -90 and 90.';
    }
    if (isNaN(lon) || lon < -180 || lon > 180) {
      errors.longitude = 'Longitude must be between -180 and 180.';
    }

    if (!newField.crop_id) {
      errors.crop_id = 'Please select a crop type.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    try {
      const res = await fetch('http://localhost:5000/api/fields/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: newField.fieldName,
          crop_id: Number(newField.crop_id),
          latitude: parseFloat(newField.latitude),
          longitude: parseFloat(newField.longitude),
        }),
      });

      if (res.ok) {
        const created = await res.json();
        setFieldCards(prev => [...prev, created.field]);
        setCreateModalState(false);
        setNewField({ fieldName: '', crop_id: '', latitude: '', longitude: '' });
        setFormErrors({});
      } else {
        console.error('Failed to create field');
      }
    } catch (err) {
      console.error('Error creating field:', err);
    }
  };

  function showField(fieldId) {
    navigate(`/fields/${fieldId}`);
  }

  const [newField, setNewField] = useState({
    fieldName: '',
    crop_id: '',
    latitude: '',
    longitude: '',
  });


  return (
    <>
      <FieldsHeader />
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-x-6 gap-y-10 p-4 w-full justify-center">
        {loading ? (
          <LoadingFieldCard key="loading-field" />
        ) : (
          <>
            {fieldCards.map((card) => (
              <FieldCard key={card.field_id} {...card} onDelete={ () => handleDeleteField(card.field_id)} onInspect={()=> showField(card.field_id)}/>
            ))}
            <div onClick={() => setCreateModalState(true)}>
              <NewFieldCard key="new-field"/>
            </div>
          </>
        )}
      </div>
      {isDeleteModalOpen && (
        <ModalBase>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-slate-700 text-xl font-semibold mb-4">
              Are you sure you want to delete this field?
            </h2>
            <div className='flex gap-4 justify-center'>
              <BaseButton className="bg-red-500 hover:bg-red-700"  onClick={handleConfirmDelete}>
                <span>Delete Field</span>
              </BaseButton>
              <BaseButton onClick={() => setDeleteModalState(false)}>
                <span>Cancel</span>
              </BaseButton>
            </div>
          </div>
        </ModalBase>
      )}
      {isCreateModalOpen && (
        <ModalBase>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
            <h2 className="text-slate-700 text-xl font-semibold mb-4">
              Create a new Field:
            </h2>
            <form >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="fieldName">
                  Field Name
                </label>
                <input
                  type="text"
                  id="fieldName"
                  name="fieldName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-slate-700"
                  required
                  value={newField.fieldName}
                  onChange={(e) => setNewField({ ...newField, fieldName: e.target.value })}
                />
                {formErrors.fieldName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.fieldName}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cropType">
                  Crop Type
                </label>
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="crop_id" id="1" className="cursor-pointer" onClick={() => setNewField({ ...newField, crop_id: 1 })} /> 
                    <p className="text-slate-700">Wheat</p>
                    <FontAwesomeIcon icon={faWheatAwn} className="text-main-hover text-xl" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="crop_id" id="2" className="cursor-pointer" onClick={() => setNewField({ ...newField, crop_id: 2 })} /> 
                    <p className="text-slate-700">Carrot</p>
                    <FontAwesomeIcon icon={faCarrot} className="text-main-hover text-xl" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="crop_id" id="3" className="cursor-pointer" onClick={() => setNewField({ ...newField, crop_id: 3 })} /> 
                    <p className="text-slate-700">Basil</p>
                    <FontAwesomeIcon icon={faLeaf} className="text-main-hover text-xl" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="crop_id" id="4" className="cursor-pointer" onClick={() => setNewField({ ...newField, crop_id: 4})} /> 
                    <p className="text-slate-700">Spinach</p>
                    <FontAwesomeIcon icon={faSeedling} className="text-main-hover text-xl" />
                  </div>
                  {formErrors.crop_id && (
                    <p className="text-red-500 text-sm mt-1 text-center">{formErrors.crop_id}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="latitude">
                  Latitude
                </label>
                <input
                  type="number"
                  step="any"
                  id="latitude"
                  name="latitude"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-slate-700"
                  value={newField.latitude}
                  onChange={(e) => setNewField({ ...newField, latitude: e.target.value })}
                />
                {formErrors.latitude && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.latitude}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="longitude">
                  Longitude
                </label>
                <input
                  type="number"
                  step="any"
                  id="longitude"
                  name="longitude"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main text-slate-700"
                  value={newField.longitude}
                  onChange={(e) => setNewField({ ...newField, longitude: e.target.value })}
                />
                {formErrors.longitude && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.longitude}</p>
                )}
              </div>
            </form>
            <div className='flex gap-4 justify-center'>
              <BaseButton onClick={handleCreateField}>
                <span>Create Field</span>
              </BaseButton>

              <BaseButton onClick={() => setCreateModalState(false)}>
                <span>Cancel</span>
              </BaseButton>
            </div>
          </div>
        </ModalBase>
      )}
    </>
  );
}

export default MyFields;
