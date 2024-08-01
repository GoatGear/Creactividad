import { useRsvps } from "../context/RsvpContext";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

function RsvpCard({ rsvp }) {
    const { deleteRsvp } = useRsvps();

    const handleDelete = () => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar esta reservación?');
        if (confirmDelete) {
            deleteRsvp(rsvp._id);
        }
    };

    return (
        <div className="bg-zinc-800 w-full p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-white">{rsvp.title}</h1>
                <div className="flex gap-2">
                    <button 
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md transition-colors duration-300"
                        onClick={handleDelete}
                    >
                        Borrar
                    </button>
                    <Link 
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors duration-300"
                        to={`/rsvp/${rsvp._id}`}
                    >
                        Editar
                    </Link>
                </div>
            </header>
            <p className="text-slate-300 mb-2">{rsvp.description}</p>
            <p className="text-slate-400">{dayjs(rsvp.date).utc().format("DD/MM/YYYY")}</p>
        </div>
    );
}

export default RsvpCard
