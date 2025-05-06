// DOM Elements
const giveawayForm = document.getElementById('giveawayForm');
const successModal = document.getElementById('successModal');
const closeModal = document.querySelector('.close');

// Store form submissions
let submissions = [];

// Check if there are saved submissions in localStorage
if (localStorage.getItem('giveawaySubmissions')) {
    try {
        submissions = JSON.parse(localStorage.getItem('giveawaySubmissions'));
    } catch (e) {
        console.error('Error loading saved submissions:', e);
        submissions = [];
    }
}

// Form submission handler
giveawayForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(giveawayForm);
    const submissionData = {};
    
    formData.forEach((value, key) => {
        submissionData[key] = value;
    });
    
    // Add timestamp
    submissionData.timestamp = new Date().toISOString();
    
    // Save submission
    submissions.push(submissionData);
    saveSubmissions();
    
    // Show success modal
    successModal.style.display = 'block';
    
    // Reset form
    giveawayForm.reset();
});

// Close modal when clicking the X
closeModal.addEventListener('click', function() {
    successModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', function(e) {
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Save submissions to localStorage
function saveSubmissions() {
    localStorage.setItem('giveawaySubmissions', JSON.stringify(submissions));
}