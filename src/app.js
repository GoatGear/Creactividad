import express from "express";
import morgan from "morgan";
// import cookieParser from 'cookie-parser';
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import rsvpRoutes from "./routes/rsvp.routes.js";
import emailRoutes from "./routes/email.routes.js";

const app = express();

app.use(cors({
    origin: ['https://eleddie.com', 'https://www.eleddie.com', 'https://someec.eleddie.com', 'https://someec.accesos.site', 'https://ancissste.accesos.site'],    
}));
app.use(morgan('dev'));
app.use(express.json());
// app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', rsvpRoutes);
app.use('/api', emailRoutes);

export default app