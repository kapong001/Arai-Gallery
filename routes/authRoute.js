import express from 'express';
import {
    registerController,
    loginController,
    testController
} from '../controllers/authController.js';
import {isAdmin, requireSignIn} from '../middlewares/authMiddleware.js';

//router obj
const router = express.Router();

//routing
//REGISTER || METHOS POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//test routes
router.get('/test',requireSignIn ,isAdmin ,testController);

//protexted User route auth
router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({ ok:true });
});

//protexted Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ ok:true });
});

export default router
