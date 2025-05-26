import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import postRoutes from './routes/post'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', authRoutes); 
app.use('/api', postRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
