import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const { signin, errors: signinErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(()=>{
    if (isAuthenticated) navigate("/rsvps");
  }, [isAuthenticated]);

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-white max-w-md w-full p-10 rounded-md'>
      {
        signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
            {error}
          </div>
        ))
      }
        <h1 className='text-2xl font-bold text-center'>Iniciar sesión</h1>

        <form onSubmit={onSubmit}>

          <input type="email" {...register('email', { required: true })}
            className="w-full bg-gray-200 text-black px-4 py-2 rounded-md my-2"
            placeholder="Correo"
          />
          {errors.email && (<p className="text-red-500" >Correo requerido</p>)}

          <input type="password" {...register('password', { required: true })}
            className="w-full bg-gray-200 text-black px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (<p className="text-red-500" >Contraseña requerida</p>)}

          <button type="submit" className="w-full py-2 mt-3 mb-10 bg-green-600 text-white font-semibold rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">Entrar</button>

        </form>
        <p className=" flex gap-x-2 justify-between">
          ¿No te has registrado aún? <Link to="/register"
          className="text-sky-500" > Registrate</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
