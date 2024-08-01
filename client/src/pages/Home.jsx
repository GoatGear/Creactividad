import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Link to={'/register'}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300">Register</button>
      </Link>
    </>
  );
}

export default Home