import Experience from "../models/Experience.js";

// @desc Get all experiences
// @route GET /api/experiences
export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (error) {
    console.error("Error fetching experiences:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get single experience by ID
// @route GET /api/experiences/:id
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json(experience);
  } catch (error) {
    console.error("Error fetching experience:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
