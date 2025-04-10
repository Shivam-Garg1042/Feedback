import { useState } from 'react';
import axios from 'axios';

// Rating emoji and text configurations
const ratingConfig = [
  { emoji: '😞', text: 'Poor', value: 1 },
  { emoji: '🙁', text: 'Below Average', value: 2 },
  { emoji: '😐', text: 'Average', value: 3 },
  { emoji: '🙂', text: 'Good', value: 4 },
  { emoji: '😄', text: 'Excellent', value: 5 }
];

const SurveyForm = () => {
  const [formState, setFormState] = useState({
    question1: null,
    question2: null,
    question3: null,
    // Match the backend model field names
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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
      // Connect to your backend API endpoint
      const apiUrl = 'https://double-rigging-451512-r5.el.r.appspot.com/api/survey/submit'; // Update with your actual API URL
      
      // Send data to your backend API
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

  // Reusable Rating Component
  const RatingSelector = ({ question, name, selectedValue, onRatingChange }) => (
    <div className="mb-2 bg-white p-2 rounded-lg shadow-md">
      <p className="text-lg font-semibold text-gray-800 mb-4">{question}</p>
      <div className="flex justify-between items-center space-x-2">
        {ratingConfig.map((rating) => (
          <button
            key={rating.value}
            type="button"
            onClick={() => onRatingChange(name, rating.value)}
            className={`flex flex-col items-center justify-center w-full p-2 rounded-lg transition-all duration-300 
              ${selectedValue === rating.value.toString() 
                ? 'bg-blue-500 text-white scale-105' 
                : 'bg-gray-100 text-gray-600 hover:bg-blue-100'}`}
          >
            <span className="text-3xl mb-1">{rating.emoji}</span>
            <span className="text-xs font-medium">{rating.text}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-4">
      <div className="bg-white shadow-2xl rounded-2xl p-4 w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Customer Experience Survey
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer identification fields - renamed to match backend model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your WhatsApp number"
                required
              />
            </div>
          </div>

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

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white py-3 rounded-lg 
              transition duration-300 ease-in-out transform hover:scale-[1.02] 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
          
          {submitStatus === 'success' && (
            <p className="text-green-500 text-center mt-4">Feedback submitted successfully!</p>
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
