import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {


  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/rsvps")
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  })

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white my-2" key={i}>
              {error}
            </div>
          ))
        }
        <h1 className='text-2xl font-bold text-center'>Registrarme</h1>
        <form onSubmit={onSubmit}>
          <input type="text" {...register('username', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre"
          />
          {errors.username && (<p className="text-red-500" >Nombre de usuario requerido</p>)}
          <input type="email" {...register('email', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo"
          />
          {errors.email && (<p className="text-red-500" >Correo requerido</p>)}
          <input type="password" {...register('password', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {errors.password && (<p className="text-red-500" >Contraseña requerida</p>)}
          <button type="submit" className="w-full py-2 mt-3 mb-10 bg-green-600 text-white font-semibold rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">Registrarme</button>
        </form>
        <p className=" flex gap-x-2 justify-between">
          ¿Ya tienes una cuenta? {" "}<Link to="/login"
            className="text-sky-500" > Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
