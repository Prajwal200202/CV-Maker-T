import React, { useEffect, useState } from "react";
import { fetchEducations, deleteEducation, updateEducation, createEducation } from "../api/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Education = () => {
  const navigate = useNavigate();
  const [education, setEducation] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    const fetchEducationData = async () => {
      const educationData = await fetchEducations();
      setEducation(educationData || []);
    };
    fetchEducationData();
  }, []);

  const onSubmit = async (data) => {
    if (editingId) {
      await updateEducation(editingId, data);
      setEditingId(null);
    } else {
      await createEducation(data);
      setEducation([...education, data]);
    }
    reset();
  };

  const onEdit = (edu) => {
    setEditingId(edu._id);
    setValue("institution", edu.institution);
    setValue("degree", edu.degree);
    setValue("fieldOfStudy", edu.fieldOfStudy);
    setValue("grade", edu.grade);
    setValue("startDate", edu.startDate);
    setValue("endDate", edu.endDate);
  };

  const onDelete = async (id) => {
    await deleteEducation(id);
    setEducation(education.filter((edu) => edu._id !== id)); // Remove deleted item from UI
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Education</h2>

      {/* Education Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full p-2 border rounded-md" type="text" placeholder="Institution" {...register("institution", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="text" placeholder="Degree" {...register("degree", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="text" placeholder="Field Of Study" {...register("fieldOfStudy", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="text" placeholder="Grade" {...register("grade", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="date" {...register("startDate", { required: true })} />
        <input className="w-full p-2 border rounded-md" type="date" {...register("endDate", { required: true })} />
        
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          {editingId ? "Update" : "Add"} Education
        </button>
        <button onClick={()=>navigate('/experience')} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Next
        </button>
      </form>

      {/* Existing Education */}
      <h3 className="text-2xl font-semibold text-gray-700 mt-8 mb-4 text-center">Existing Education</h3>

      {education.length > 0 ? (
        <ul className="space-y-4">
          {education.map((edu) => (
            <li key={edu._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <div>
                <span className="font-medium text-gray-800">{edu.institution}</span> - <span className="text-gray-600">{edu.degree}</span>
              </div>
              <div className="space-x-2">
                <button onClick={() => onEdit(edu)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition">
                  Edit
                </button>
                <button onClick={() => onDelete(edu._id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No education records found. Add one above.</p>
      )}
    </div>
  );
};

export default Education;
