import { useEffect } from 'react';
import { useRsvps } from '../context/RsvpContext';
import RsvpCard from '../components/RsvpCard';

function RsvpsPage() {
  const { getRsvps, rsvps } = useRsvps();

  useEffect(() => {
    getRsvps();
  }, []);

  if (rsvps.length === 0) return (<h1 className='text-center text-xl font-semibold mt-10'>No hay reservaciones</h1>);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold text-center mb-6'>Reservaciones</h1>
      <div className='flex flex-col gap-6'>
        {
          rsvps.map(rsvp => (
            <RsvpCard rsvp={rsvp} key={rsvp._id}></RsvpCard>
          ))
        }
      </div>
    </div>
  );
}

export default RsvpsPage
