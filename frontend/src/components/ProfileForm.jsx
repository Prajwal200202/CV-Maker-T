import { useForm } from 'react-hook-form';
import { createProfile } from '../api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [error, setError] = useState(null);

    const onSubmit = async (data) => {
        try {
            await createProfile(data);
            alert("Profile created successfully!");
            reset();
        } catch (error) {
            console.error('Error while creating Profile', error);
            setError("Failed to create profile. Please try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Profile</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <div>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        {...register('name', { required: true })} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Email */}
                <div>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        {...register('email', { required: true })} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Phone */}
                <div>
                    <input 
                        type="text" 
                        placeholder="Phone" 
                        {...register('phone', { required: true })} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                {/* Summary */}
                <div>
                    <textarea 
                        placeholder="Summary" 
                        {...register('summary', { required: true })} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32"
                    />
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
                >
                    Save Profile
                </button>
                <button 
                    onClick={() => navigate('/education')}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300"
                >
                    Next
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;
