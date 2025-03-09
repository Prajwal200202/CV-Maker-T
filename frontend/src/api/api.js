import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/profile`);
      return response.data; 
    } catch (error) {
      console.error("Error fetching profiles:", error);
      return []; 
    }
  };
export const createProfile = async (profile) => {
    await axios.post(`${API_URL}/profile`, profile);
}
export const updateProfile = async (id, profile) => {
    await axios.put(`${API_URL}/profile/${id}`, profile);
}


export const fetchSkills = async () => {
    try {
        const response = await axios.get(`${API_URL}/skill`);
        return response.data;
    } catch (error) {
        console.error("Error fetching skills data:", error);
        return [];
    }
}
export const createSkill = async (skill) => {
    await axios.post(`${API_URL}/skill`, skill);
}
export const updateSkill = async (id, skill) => {
    await axios.put(`${API_URL}/skill/${id}`, skill);
}
export const deleteSkill = async (id) => {
    await axios.delete(`${API_URL}/skill/${id}`);
}


export const fetchExperiences = async () => {
    const exp = await axios.get(`${API_URL}/experience`);
    return exp.data;
}
export const createExperience = async (experience) => {
    await axios.post(`${API_URL}/experience`, experience);
}
export const updateExperience = async (id, experience) => {
    await axios.put(`${API_URL}/experience/${id}`, experience);
}
export const deleteExperience = async (id) => {
    await axios.delete(`${API_URL}/experience/${id}`);
}


export const fetchEducations = async () => {
    try {
        const response = await axios.get(`${API_URL}/education`);
        return response.data;
    } catch (error) {
        console.error("Error fetching education data:", error);
        return [];
    }
}
export const createEducation = async (education) => {
    await axios.post(`${API_URL}/education`, education);
}
export const updateEducation = async (id, education) => {
    await axios.put(`${API_URL}/education/${id}`, education);
}
export const deleteEducation = async (id) => {
    await axios.delete(`${API_URL}/education/${id}`);
}

