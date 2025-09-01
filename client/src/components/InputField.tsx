
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type InputFieldProps = {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  iconSrc?: string;
  isOTP?: boolean;
  disabled?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  iconSrc,
  isOTP = false,
  disabled = false,
}) => {
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const inputType = isOTP ? (isOtpVisible ? 'text' : 'password') : type;

  const toggleOtpVisibility = () => {
    setIsOtpVisible(!isOtpVisible);
  };

  const handleIconClick = () => {
    if (type === 'date') {
      const input = document.getElementById(id) as HTMLInputElement;
      if (input) {
        input.focus();
        input.showPicker?.(); // Modern browsers only
      }
    }
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-secondary mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required
          className={`
            w-full px-4 py-3 border border-gray-400 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-brand-blue transition-colors
            ${disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'}
            ${isOTP ? 'text-center tracking-widest' : ''}
          `}
        />
        {iconSrc && !isOTP && (
          <button
            type="button"
            onClick={handleIconClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 transition-colors"
          >
            <img src={iconSrc} alt="" className="w-5 h-5" />
          </button>
        )}
        {isOTP && (
          <button
            type="button"
            onClick={toggleOtpVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded p-1 transition-colors"
          >
            {isOtpVisible ? (
              <AiOutlineEye className="w-5 h-5 text-gray-600" />
            ) : (
              <AiOutlineEyeInvisible className="w-5 h-5 text-gray-600" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
