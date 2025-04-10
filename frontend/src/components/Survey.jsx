import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/c_logo.png'; // Assuming you have a logo image
// Rating emoji and text configurations - keeping original structure
const ratingConfig = [
  { emoji: '😄', text: 'Excellent / उत्कृष्ट', value: 5 },
  { emoji: '🙂', text: 'Good / अच्छा', value: 4 },
  { emoji: '😐', text: 'Average / औसत', value: 3 },
  { emoji: '🙁', text: 'Below Average / औसत से कम', value: 2 },
  { emoji: '😞', text: 'Poor / खराब', value: 1 }
];

const SurveyForm = () => {
  // Keeping the original state structure
  const [formState, setFormState] = useState({
    question1: null,
    question2: null,
    question3: null,
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Keeping the original handlers
  const handleRatingChange = (name, value) => {
    setFormState(prevState => ({
      ...prevState,
      [name]: value.toString() // Convert to string to match your mongoose model
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Keeping the original submit handler and backend logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all questions are answered
    if (!formState.question1 || !formState.question2 || !formState.question3) {
      alert('Please rate all questions before submitting.');
      return;
    }

    // Check if phone is provided (required by your backend model)
    if (!formState.phone) {
      alert('WhatsApp number is required.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Connect to your backend API endpoint - keeping original URL
      const apiUrl = 'https://double-rigging-451512-r5.el.r.appspot.com/api/survey/submit';
      
      // Send data to your backend API - keeping original implementation
      const response = await axios.post(apiUrl, formState);
      
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormState({
        question1: null,
        question2: null,
        question3: null,
        email: '',
        phone: ''
      });

      alert('Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      const errorMessage = error.response?.data?.message || 'There was an error submitting your feedback. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updated Rating Component - keeping original function signature and logic
  const RatingSelector = ({ question, name, selectedValue, onRatingChange }) => (
    <div className="mb-2 bg-white p-2 rounded-lg shadow-md">
      {/* English question with Hindi translation below */}
      <p className="text-lg font-semibold text-[#003444] mb-1">{question}</p>
      <p className="text-lg font-medium text-[#1e7295] mb-3">
        {name === "question1" && "1. चार्जअप द्वारा दिए गए Products(बैटरी, चार्जर आदि) का अपना अनुभव share करें?"}
        {name === "question2" && "2. आपका Service अनुभव कैसा था?"}
        {name === "question3" && "3. आपका EMI जमा अनुभव (नकद/UPI) कैसा था?"}
      </p>
      
      {/* Mobile-responsive rating buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 sm:space-x-2">
        {ratingConfig.map((rating) => (
          <button
            key={rating.value}
            type="button"
            onClick={() => onRatingChange(name, rating.value)}
            className={`flex items-center justify-between sm:flex-col sm:justify-center w-full p-2 rounded-lg transition-all duration-300 
              ${selectedValue === rating.value.toString() 
                ? 'bg-[#003444] text-white scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-[#1e7295] hover:text-white'}`}
          >
            <span className="text-2xl sm:text-3xl sm:mb-1">{rating.emoji}</span>
            <span className="text-xs font-medium">{rating.text}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e6f0f3] to-[#d0e6ed] flex items-center justify-center px-3 py-3 sm:px-4 sm:py-4">
      <div className="bg-white shadow-2xl rounded-2xl p-4 w-full max-w-md">
        
        {/* Company logo */}
        <div className="flex justify-center mb-4">
          <img 
            src={logo}
            alt="Company Logo" 
            className="h-16 sm:h-16 object-contain" 
          />
        </div>
        
        {/* Title with English and Hindi */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-1 text-center text-[#003444]">
          Customer Experience Survey
        </h2>
        <p className="text-lg sm:text-xl text-center text-[#1e7295] mb-6">
          ग्राहक अनुभव सर्वेक्षण
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Maintaining the original field structure */}
          <div className="mb-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              WhatsApp Number / व्हाट्सएप नंबर *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#003444]"
              placeholder="Your WhatsApp number / आपका व्हाट्सएप नंबर"
              required
            />
          </div>

          {/* Using the original RatingSelector component with original question names */}
          <RatingSelector
            question="1. How was your product experience?"
            name="question1"
            selectedValue={formState.question1}
            onRatingChange={handleRatingChange}
          />

          <RatingSelector
            question="2. How was your service experience?"
            name="question2"
            selectedValue={formState.question2}
            onRatingChange={handleRatingChange}
          />

          <RatingSelector
            question="3. How was your EMI deposit experience (cash/UPI)?"
            name="question3"
            selectedValue={formState.question3}
            onRatingChange={handleRatingChange}
          />

          {/* Submit button with updated styling */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white py-4 rounded-lg 
              transition duration-300 ease-in-out transform hover:scale-[1.02] 
              focus:outline-none focus:ring-2 focus:ring-[#003444] focus:ring-opacity-50
              ${isSubmitting ? 'bg-[#1e7295] cursor-not-allowed' : 'bg-[#003444] hover:bg-[#278c6a]'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback / फीडबैक सबमिट करें'}
          </button>
          
          {/* Keeping original success/error messaging structure */}
          {submitStatus === 'success' && (
            <p className="text-[#278c6a] text-center mt-4">Feedback submitted successfully!</p>
          )}
          
          {submitStatus === 'error' && (
            <p className="text-red-500 text-center mt-4">Error submitting feedback. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
