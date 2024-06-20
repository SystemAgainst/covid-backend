const Router = require('express');
const router = new Router();
const userRouter = require('./userRoute');

router.use('/client', userRouter);

module.exports = router;
