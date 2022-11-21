const express = require('express');
const router = require('../routes/todoRouter');
const errorMiddleware = require('../middlewares/error');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

app.use('/todos', router);
app.use(errorMiddleware);

app.listen(3000, () => console.log('server running on port: 3000\n\n\n\n\n'));
