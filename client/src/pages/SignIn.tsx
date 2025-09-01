import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const SignIn = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ email: '', otp: '' });
    const [loading, setLoading] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRequestOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/auth/login-request', { email: formData.email });
            toast.success('OTP sent to your email!');
            setStep(2);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Failed to send OTP.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/auth/login-verify', {
                email: formData.email,
                otp: formData.otp,
            });
            login(data.token);
            toast.success('Signed in successfully!');
            navigate('/dashboard');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Sign in failed. Invalid OTP?');
        } finally {
            setLoading(false);
        }
    };
  
    return (
        <AuthLayout>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign in</h1>
            <p className="text-gray-500 mb-8">Please login to continue to your account.</p>

            <form onSubmit={step === 1 ? handleRequestOTP : handleSignIn} className="space-y-6">
                <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jonas_kahnwald@gmail.com"
                    disabled={step === 2} // Disable email field in step 2
                />
                
                {step === 2 && (
                    <InputField
                        label="OTP"
                        id="otp"
                        name="otp"
                        type="text"
                        value={formData.otp}
                        onChange={handleInputChange}
                        placeholder="Enter your OTP"
                        isOTP={true}
                    />
                )}

                {/* Keep me logged in and Resend OTP section */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center text-sm cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="w-4 h-4 mr-2 border-2 border-gray-600  accent-gray-700"
                            checked={keepLoggedIn}
                            onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                        />
                        <div className="relative">
                            
                        </div>
                        <span className="text-gray-600">Keep me logged in</span>
                    </label>
                    
                    {step === 2 && (
                        <button 
                            type="button" 
                            onClick={handleRequestOTP} 
                            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                            disabled={loading}
                        >
                            Resend OTP
                        </button>
                    )}
                </div>

                <button 
                    type="submit" 
                    disabled={loading || (step === 1 && !formData.email) || (step === 2 && !formData.otp)} 
                    className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : step === 1 ? 'Get OTP' : 'Sign in'}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-8">
                Need an account?{' '}
                <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                    Create one
                </Link>
            </p>
        </AuthLayout>
    );
};

export default SignIn;
