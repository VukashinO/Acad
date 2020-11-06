const courseRoutes = require('../routes/courseRoutes');

const express = require('express');
const app = express();

app.use(express.json());
app.use('/courses', courseRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });