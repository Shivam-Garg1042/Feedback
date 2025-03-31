import express from "express";
import { SurveyUser } from "../models/SurveyUser.js";

const router = express.Router();

// Get all survey responses
router.get("/", async (req, res) => {
  try {
    const surveys = await SurveyUser.find({}).sort({ createdAt: -1 });
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ message: "Error fetching survey data", error: error.message });
  }
});

// Submit a new survey response
router.post("/submit", async (req, res) => {
  try {
    const { email, phone, question1, question2, question3 } = req.body;
    
    if (!phone) {
        
      return res.status(400).json({ message: "WhatsApp number is required" });
    }
    
    const newSurvey = new SurveyUser({
      email,
      phone,
      question1,
      question2,
      question3
    });
    
    const savedSurvey = await newSurvey.save();
    console.log("Received Data:", req.body); // Debug log
    res.status(201).json({ message: "Survey submitted successfully", survey: savedSurvey });
  } catch (error) {
    res.status(500).json({ message: "Error submitting survey", error: error.message });
  }
});

// Get a specific survey response by ID
router.get("/:id", async (req, res) => {
  try {
    const survey = await SurveyUser.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ message: "Error fetching survey", error: error.message });
  }
});

// Update a survey response
router.put("/:id", async (req, res) => {
  try {
    const updatedSurvey = await SurveyUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSurvey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    
    res.status(200).json({ message: "Survey updated successfully", survey: updatedSurvey });
  } catch (error) {
    res.status(500).json({ message: "Error updating survey", error: error.message });
  }
});

// Delete a survey response
router.delete("/:id", async (req, res) => {
  try {
    const deletedSurvey = await ServeyUser.findByIdAndDelete(req.params.id);
    
    if (!deletedSurvey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    
    res.status(200).json({ message: "Survey deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting survey", error: error.message });
  }
});

export default router;