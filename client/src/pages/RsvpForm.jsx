import { useForm } from "react-hook-form";
import { useRsvps } from "../context/RsvpContext";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const RsvpForm = () => {

  const { register, handleSubmit, setValue } = useForm();
  const { createRsvp, getRsvp, updateRsvp } = useRsvps();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadRsvp() {
      if (params.id) {
        const rsvp = await getRsvp(params.id)
        console.log(rsvp)
        setValue('title', rsvp.title)
        setValue('description', rsvp.description)
      }
    }
    loadRsvp()
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateRsvp(params.id, {
        ...data,
        date: dayjs.utc(data.date).format()
      });
    } else {
      createRsvp({
        ...data,
        date: dayjs.utc(data.date).format()
      });
    }
    navigate('/rsvps');
  })

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h1 className="text-2xl font-bold text-center"> Reservación </h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Titulo</label>
        <input type="text" placeholder='Asistencia'
          {...register('title')}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        <label htmlFor="description">Descripción</label>
        <textarea rows='3' placeholder='Descripción'
          {...register('description')}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <label htmlFor="date">Fecha</label>
        <input type="date" {...register("date")}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" />

        <button className="w-full py-2 mt-3 mb-10 bg-green-600 text-white font-semibold rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600">Reservar</button>
      </form>
    </div>
  )
}

export default RsvpForm
