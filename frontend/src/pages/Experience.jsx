import React, { useEffect, useState } from "react";
import { fetchExperiences, createExperience, updateExperience, deleteExperience } from "../api/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Experience = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    const fetchExperienceData = async () => {
      const experienceData = await fetchExperiences();
      setExperiences(experienceData || []);
    };
    fetchExperienceData();
  }, []);

  const onSubmit = async (data) => {
    if (editingId) {
      await updateExperience(editingId, data);
      setEditingId(null);
    } else {
      await createExperience(data);
      setExperiences([...experiences, data]); 
      
    }
    reset();
  };

  const onEdit = (experience) => {
    setEditingId(experience._id);
    setValue("company", experience.company);
    setValue("position", experience.position);
    setValue("startDate", experience.startDate);
    setValue("endDate", experience.endDate);
    setValue("description", experience.description);
  };

  const onDelete = async (id) => {
    await deleteExperience(id);
    setExperiences(experiences.filter((exp) => exp._id !== id)); // Update UI after deletion
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Experience</h2>

      {/* Experience Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full p-2 border rounded-md" type="text" placeholder="Company" {...register("company", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="text" placeholder="Position" {...register("position", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="date" {...register("startDate", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="date" {...register("endDate", { required: true })} />
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          {editingId ? "Update" : "Add"} Experience
        </button>
        <button onClick={()=> navigate('/skills')} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Next
        </button>
      </form>

      {/* Existing Experiences */}
      <h3 className="text-2xl font-semibold text-gray-700 mt-8 mb-4 text-center">Existing Experiences</h3>

      {experiences.length > 0 ? (
        <ul className="space-y-4">
          {experiences.map((exp) => (
            <li key={exp._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <div>
                <span className="font-medium text-gray-800">{exp.company}</span> - <span className="text-gray-600">{exp.position}</span>
              </div>
              <div className="space-x-2">
                <button onClick={() => onEdit(exp)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button onClick={() => onDelete(exp._id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No experiences found. Add one above.</p>
      )}
    </div>
  );
};

export default Experience;
