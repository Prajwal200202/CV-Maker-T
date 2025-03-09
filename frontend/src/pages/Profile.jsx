import { useEffect, useState } from "react";
import { fetchProfile, updateProfile, createProfile } from "../api/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    const fetchProfileData = async () => {
      const profileData = await fetchProfile();
      setProfiles(profileData || []);
    };
    fetchProfileData();
  }, []);

  const onSubmit = async (data) => {
    if(profiles.length > 0){
      alert("Profile already exists");
      reset()
      return;
    }
    if (editingId) {
      await updateProfile(editingId, data);
      setEditingId(null);
    } else {
      await createProfile(data);
      setProfiles([...profiles, data]); 
      
    }
    reset();
  };

  const onEdit = (edu) => {
    setEditingId(edu._id);
    setValue("name", edu.name);
    setValue("email", edu.email);
    setValue("phone", edu.phone);
    setValue("summary", edu.summary);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Profile</h2>

      {/* Profile Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full p-2 border rounded-md" type="text" placeholder="Name" {...register("name", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="email" placeholder="Email" {...register("email", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="number" placeholder="Phone"{...register("phone", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="text" placeholder="Summary" {...register("summary", { required: true })} />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          {editingId ? "Update" : "Add"} Profile
        </button>
        <button onClick={()=> navigate('/education')} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Next
        </button>
      </form>

      <h3 className="text-2xl font-semibold text-gray-700 mt-8 mb-4 text-center">
        Existing Profile
      </h3>

{/* //changes //  */}
{profiles.length > 0 ? (
        <ul className="space-y-4">
          {profiles.map((edu) => (
            <li key={edu._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <div>
                <span className="font-medium text-gray-800">{edu.name}</span> - <span className="text-gray-600">{edu.email}</span>
              </div>
              <div className="space-x-2">
                <button onClick={() => onEdit(edu)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition">
                  Edit
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No profiles found. Add one above.</p>
      )}
    </div>
  );
};

export default Profile;
