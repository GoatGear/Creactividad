import { useRsvps } from "../context/RsvpContext"
import { Link } from 'react-router-dom'
import days from 'dayjs'
import utc from 'dayjs/plugin/utc'
days.extend(utc)


function RsvpCard({ rsvp }) {

    const { deleteRsvp } = useRsvps();

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{rsvp.title}</h1>
                <div className="flex gap-x-2 items-center">
                    <button 
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        deleteRsvp(rsvp._id);
                    }
                    }>Borrar</button>
                    <Link 
                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    to={`/rsvp/${rsvp._id}`}>Editar</Link>
                </div>
            </header>
            <p className="text-slate-300">{rsvp.description}</p>
            <p>{days(rsvp.date).utc().format("DD/MM/YYYY")}</p>
        </div>
    )
}

export default RsvpCard