

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    otp: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.email) {
      toast.error('Please fill all fields.');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/signup-request', {
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dob,
      });
      toast.success('OTP sent to your email!');
      setStep(2);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/signup-verify', {
        email: formData.email,
        otp: formData.otp,
      });
      login(data.token);
      toast.success('Signed up successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Sign up failed. Invalid OTP?');
    } finally {
      setLoading(false);
    }
  };

  const isStep1Valid = formData.name && formData.dob && formData.email;
  const isStep2Valid = formData.otp;

  return (
    <AuthLayout>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign up</h1>
      <p className="text-gray-500 mb-8">Sign up to enjoy the feature of HD</p>

      <form
        onSubmit={step === 1 ? handleGetOTP : handleSignUp}
        className="space-y-6"
      >
        {step === 1 && (
          <>
            <InputField
              label="Your Name"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Jonas Kahnwald"
            />
            <InputField
              label="Date of Birth"
              id="dob"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleInputChange}
              iconSrc="src/assets/calendar-icon.svg" // 👈 custom left-side calendar icon
              placeholder="11 December 1997"
            />
            <InputField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="jonas_kahnwald@gmail.com"
            />
          </>
        )}

        {step === 2 && (
          <>
            <InputField
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="jonas_kahnwald@gmail.com"
              disabled={true}
            />
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

            <div className="flex justify-start">
              <button
                type="button"
                onClick={handleGetOTP}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                disabled={loading}
              >
                Resend OTP
              </button>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={
            loading || (step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)
          }
          className="w-full cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : step === 1 ? 'Get OTP' : 'Sign up'}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-8">
        Already have an account?{' '}
        <Link
          to="/signin"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
