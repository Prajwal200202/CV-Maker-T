import React, { useEffect, useState, useRef } from "react";
import { fetchProfile, fetchEducations, fetchExperiences, fetchSkills } from "../api/api";

const Resume = () => {
  const [profile, setProfile] = useState(null);
  const [educations, setEducations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  const resumeRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await fetchProfile();
      if (profileData.length > 0) {
        setProfile(profileData[0]); // ✅ Store only one profile
      } else {
        setProfile(null);
      }


      setEducations(await fetchEducations());
      setExperiences(await fetchExperiences());
      setSkills(await fetchSkills());
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <div ref={resumeRef} className="p-6 border border-gray-300 rounded-md">
        {/* Profile Section */}
        {profile ? (
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 p-5">{profile.name}</h1>
            <p className="text-lg text-gray-600">{profile.email} | {profile.phone}</p>
            <p className="text-gray-700 mt-2">{profile.summary}</p>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No profile details available.</p>
        )}

        {/* Education Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">Education</h2>
          {educations.length > 0 ? (
            <ul className="mt-4">
              {educations.map((edu) => (
                <li key={edu._id} className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">{edu.institution} - {edu.degree}</h3>
                  <p className="text-gray-500">
                    {new Date(edu.startDate).toLocaleDateString("en-GB")} - {new Date(edu.endDate).toLocaleDateString("en-GB")}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No education details available.</p>
          )}
        </div>

        {/* Experience Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">Experience</h2>
          {experiences.length > 0 ? (
            <ul className="mt-4">
              {experiences.map((exp) => (
                <li key={exp._id} className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-700">{exp.company}</h3>
                  <p className="text-gray-600">{exp.position}</p>
                  <p className="text-gray-500">
                    {new Date(exp.startDate).toLocaleDateString("en-GB")} - {new Date(exp .endDate).toLocaleDateString("en-GB")}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No experience details available.</p>
          )}
        </div>

        {/* Skills Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">Skills</h2>
          {skills.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li key={skill._id} className="bg-gray-200 px-3 py-1 rounded-full text-gray-800 text-sm">
                  {skill.name} ({skill.proficiency})
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No skills added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
