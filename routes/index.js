const Router = require('express');
const router = new Router();
const userRouter = require('./userRoute');
const adminRouter = require('./adminRouter')

router.use('/client', userRouter);
router.use('/admin', adminRouter);

module.exports = router;
