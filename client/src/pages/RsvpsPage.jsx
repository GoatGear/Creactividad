import { useEffect } from 'react'
import { useRsvps } from '../context/RsvpContext'

import RsvpCard from '../components/RsvpCard'

function RsvpsPage() {
  const { getRsvps, rsvps } = useRsvps()

  useEffect(() => {
    getRsvps();
  }, [])

  if (rsvps.length === 0) return (<h1>No hay reservaciones</h1>)

  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'>
      {
        rsvps.map(rsvps => (
          <RsvpCard rsvp={rsvps} key={rsvps._id}></RsvpCard>
        ))
      }
    </div>
  );

}

export default RsvpsPage