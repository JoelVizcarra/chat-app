import { config } from 'dotenv';
config();

import fastify from 'fastify';
import cors from '@fastify/cors';

const app = fastify();
app.register(cors, { origin: process.env.CLIENT_URL });

app.listen({ port: parseInt(process.env.PORT!) });