import React, { useEffect, useState } from 'react';
import FieldCard from './MyFields/FieldCard';
import NewFieldCard from './MyFields/NewFieldCard';
import LoadingFieldCard from './MyFields/LoadingFieldCard';
import FieldsHeader from './MyFields/FieldsHeader';

function MyFields() {
  const [fieldCards, setFieldCards] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <FieldsHeader />
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-x-6 gap-y-10 p-4 w-full justify-center">
        {loading ? (
          <LoadingFieldCard key="loading-field" />
        ) : (
          <>
            {fieldCards.map((card) => (
              <FieldCard key={card.field_id} {...card} />
            ))}
            <NewFieldCard key="new-field" />
          </>
        )}
      </div>
    </>
  );
}

export default MyFields;
