import { Router } from 'express';
import { requestSignUpOTP, verifySignUpOTP, requestLoginOTP, verifyLoginOTP, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup-request', requestSignUpOTP);
router.post('/signup-verify', verifySignUpOTP);
router.post('/login-request', requestLoginOTP);
router.post('/login-verify', verifyLoginOTP);
router.get('/me', protect, getMe);

export default router;