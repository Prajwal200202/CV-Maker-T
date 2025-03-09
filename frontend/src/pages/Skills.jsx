import React, { useEffect, useState } from "react";
import { fetchSkills, deleteSkill, updateSkill, createSkill } from "../api/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    const fetchSkillsData = async () => {
      const skillsData = await fetchSkills();
      setSkills(skillsData || []);
    };
    fetchSkillsData();
  }, []);

  const onSubmit = async (data) => {
    if (editingId) {
      await updateSkill(editingId, data);
      setEditingId(null);
    } else {
      await createSkill(data);
      setSkills([...skills, date]);

    }
    reset();
  };

  const onEdit = (skill) => {
    setEditingId(skill._id);
    setValue("name", skill.name);
    setValue("proficiency", skill.proficiency);
  };

  const onDelete = async (id) => {
    await deleteSkill(id);
    setSkills(skills.filter(skill => skill._id !== id)); // ✅ Update state instantly after delete
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Skills</h2>

      {/* Skills Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Skill Name"
            {...register("name", { required: true })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Level(e.g. Beginner,Intermediate,Expert)"
            {...register("proficiency", { required: true })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {editingId ? "Update" : "Add"} Skill
        </button>
        <button
          onClick={() => navigate('/cvdisplay')}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Next
        </button>
      </form>

      {/* Existing Skills */}
      <h3 className="text-2xl font-semibold text-gray-700 mt-8 mb-4 text-center">Existing Skills</h3>

      {skills.length > 0 ? (
        <ul className="space-y-4">
          {skills.map((skill) => (
            <li key={skill._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md">
              <div>
                <span className="font-medium text-gray-800">{skill.name}</span>
                <p className="text-gray-600">{skill.proficiency}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => onEdit(skill)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(skill._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">No skills found. Add one above.</p>
      )}
    </div>
  );
};

export default Skills;
