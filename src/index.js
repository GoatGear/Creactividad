import {PORT} from '../src/config.js'
import app from './app.js'
import { connectDB } from './db.js'

connectDB();
app.listen(PORT)
console.log('Servidor inicializado en puerto', PORT)