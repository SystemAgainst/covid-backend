require('dotenv').config();
const express = require('express');
const sequelize = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandlingMiddleware');
const router = require('./routes/index');

const PORT = process.env.PORT || 5050;

const app = express();

app
    .use(cors())
    .use(cookieParser())
    .use(express.json())
    .use("/api", router)
    .use('/uploads', express.static('uploads'))
    .use(errorHandler);

const main = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error(e);
    }
};

main();
