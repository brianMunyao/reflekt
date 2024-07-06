require('dotenv').config();
import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Backend service running on PORT: ${PORT}`));
