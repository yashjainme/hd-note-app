import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { generateOTP } from '../utils/otp';
import { sendOTPEmail } from '../services/emailService';

const createToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '30d',
    });
};

// Step 1: User provides details, we send OTP
export const requestSignUpOTP = async (req: Request, res: Response) => {
    const { email, name, dateOfBirth } = req.body;

    try {
        let user = await User.findOne({ email });
            
        if (user && user.isVerified) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }
        
        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        if (user) {
            user.name = name;
            user.dateOfBirth = dateOfBirth;
            user.otp = otp;
            user.otpExpires = otpExpires;
            user.isVerified = false;
        } else {
            user = new User({ name, email, dateOfBirth, otp, otpExpires, isVerified: false });
        }

        await user.save();
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Step 2: User sends back OTP to verify and complete signup
export const verifySignUpOTP = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    
    try {
        const user = await User.findOne({
            email,
            otp,
            otpExpires: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = createToken(user._id.toString()); 

        res.status(201).json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Step 1 for Login: Request OTP
export const requestLoginOTP = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email, isVerified: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found or not verified.' });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();
        
        await sendOTPEmail(email, otp);

        res.status(200).json({ message: 'OTP sent to your email.' });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Step 2 for Login: Verify OTP
export const verifyLoginOTP = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({
            email,
            otp,
            otpExpires: { $gt: new Date() },
        });

        if (!user || !user.isVerified) {
            return res.status(400).json({ message: 'Invalid OTP or user not verified.' });
        }

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = createToken(user._id.toString()); 

        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to get current user details
export const getMe = async (req: any, res: Response) => {
    try {
      const user = await User.findById(req.user.id).select('-otp -otpExpires');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
};