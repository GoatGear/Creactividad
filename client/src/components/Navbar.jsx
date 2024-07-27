import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth();
    console.log("isAuthenticated:", isAuthenticated);

    return (
        <nav className='bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg'>
           
                <Link to={
                    isAuthenticated ? "/rsvps" : "/"
                }>
                     <h1 className='text-2xl font-bold text-white'>CreActividad</h1>
                </Link>
            <ul className='flex gap-x-4 items-center'>
                {isAuthenticated ? (
                    <>
                        <li className='text-white text-xl'>Bienvenido {user?.username || ""}</li>
                        <li>
                            <Link to='/add-rsvp' className='text-white bg-blue-500 hover:bg-blue-700 px-3 py-2 rounded'>
                                Reservación
                            </Link>
                        </li>
                        <li>
                            <button onClick={logout} className='text-white bg-red-500 hover:bg-red-700 px-3 py-2 rounded'>
                                Cerrar Sesión
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login' className='text-white bg-green-500 hover:bg-green-700 px-3 py-2 rounded'>
                                Iniciar Sesión
                            </Link>
                        </li>
                        <li>
                            <Link to='/register' className='text-white bg-yellow-500 hover:bg-yellow-700 px-3 py-2 rounded'>
                                Registrarme
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
