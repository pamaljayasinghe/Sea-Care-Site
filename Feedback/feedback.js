// Get references to the form and feedback list elements
const feedbackForm = document.querySelector('.feedbackform');
const nameInput = feedbackForm.querySelector('input[type="text"]');
const emailInput = feedbackForm.querySelector('input[type="email"]');
const feedbackTextarea = feedbackForm.querySelector('textarea');
const feedbackList = document.getElementById('feedbacksList');

// Initialize rating value
let rating = 0;
let editingIndex = -1; // Track the index of the feedback item being edited

// Function to set the rating value
function setRating(value) {
  rating = value;
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    if (index < value) {
      star.classList.add('checked');
    } else {
      star.classList.remove('checked');
    }
  });
}


// Function to reset the rating
function resetRating() {
  rating = 0;
  const stars = document.querySelectorAll('.star');
  stars.forEach(star => star.classList.remove('checked'));
}

// Function to validate the form
function validateForm() {
  let isValid = true;

  if (nameInput.value.trim() === '') {
    isValid = false;
    nameInput.classList.add('invalid');
  } else {
    nameInput.classList.remove('invalid');
  }

  if (emailInput.value.trim() === '') {
    isValid = false;
    emailInput.classList.add('invalid');
  } else {
    emailInput.classList.remove('invalid');
  }

  if (feedbackTextarea.value.trim() === '') {
    isValid = false;
    feedbackTextarea.classList.add('invalid');
  } else {
    feedbackTextarea.classList.remove('invalid');
  }

  return isValid;
}

// Function to submit the form
function submitForm() {
  if (!validateForm()) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const feedback = feedbackTextarea.value.trim();
  const subscribeYes = feedbackForm.querySelector('#subscribe-yes').checked;
  const subscribeNo = feedbackForm.querySelector('#subscribe-no').checked;

  // Create a feedback object
  const feedbackData = {
    name,
    email,
    feedback,
    rating,
    subscribe: subscribeYes ? 'Yes' : subscribeNo ? 'No' : 'Not selected'
  };

  if (editingIndex === -1) {
    // Add the feedback to the list
    addFeedbackToList(feedbackData);

    // Save the feedback data to the browser's localStorage
    saveToLocalStorage(feedbackData);
  } else {
    // Update the existing feedback item
    updateFeedbackItem(editingIndex, feedbackData);
    editingIndex = -1;
  }

  // Reset the form
  feedbackForm.reset();
  resetRating();
}

// Function to add a feedback item to the list
function addFeedbackToList(feedback) {
  const feedbackItem = document.createElement('div');
  feedbackItem.classList.add('feedback-item');
  feedbackItem.innerHTML = `
    <h4>${feedback.name}</h4>
    <p>Email: ${feedback.email}</p>
    <p>Feedback: ${feedback.feedback}</p>
    <p>Rating: ${feedback.rating}/5</p>
    <p>Subscribe: ${feedback.subscribe}</p>
    <button onclick="editFeedback(this)">Edit</button>
    <button onclick="deleteFeedback(this)">Delete</button>
  `;
  feedbackList.appendChild(feedbackItem);
}

// Function to update an existing feedback item
function updateFeedbackItem(index, feedback) {
  const feedbackItems = feedbackList.children;
  const feedbackItem = feedbackItems[index];

  feedbackItem.innerHTML = `
    <h4>${feedback.name}</h4>
    <p>Email: ${feedback.email}</p>
    <p>Feedback: ${feedback.feedback}</p>
    <p>Rating: ${feedback.rating}/5</p>
    <p>Subscribe: ${feedback.subscribe}</p>
    <button onclick="editFeedback(this)">Edit</button>
    <button onclick="deleteFeedback(this)">Delete</button>
  `;

  // Update the feedback data in localStorage
  let feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
  feedbackData[index] = feedback;
  localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
}

// Function to save feedback data to localStorage
function saveToLocalStorage(feedback) {
  let feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
  feedbackData.push(feedback);
  localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
}

// Function to edit a feedback item
function editFeedback(button) {
  const feedbackItem = button.parentNode;
  const index = Array.from(feedbackList.children).indexOf(feedbackItem);

  // Populate the form with the existing feedback data
  const feedbackData = JSON.parse(localStorage.getItem('feedbackData'))[index];
  nameInput.value = feedbackData.name;
  emailInput.value = feedbackData.email;
  feedbackTextarea.value = feedbackData.feedback;
  setRating(feedbackData.rating);

  const subscribeYes = feedbackForm.querySelector('#subscribe-yes');
  const subscribeNo = feedbackForm.querySelector('#subscribe-no');

  if (feedbackData.subscribe === 'Yes') {
    subscribeYes.checked = true;
    subscribeNo.checked = false;
  } else if (feedbackData.subscribe === 'No') {
    subscribeYes.checked = false;
    subscribeNo.checked = true;
  } else {
    subscribeYes.checked = false;
    subscribeNo.checked = false;
  }

  editingIndex = index;
}

// Function to delete a feedback item
function deleteFeedback(button) {
  const feedbackItem = button.parentNode;
  feedbackList.removeChild(feedbackItem);

  // Remove the feedback data from localStorage
  let feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
  const index = Array.from(feedbackList.children).indexOf(feedbackItem);
  feedbackData.splice(index, 1);
  localStorage.setItem('feedbackData', JSON.stringify(feedbackData));
}

// Load feedback data from localStorage on page load
window.addEventListener('load', () => {
  const feedbackData = JSON.parse(localStorage.getItem('feedbackData')) || [];
  feedbackData.forEach(feedback => addFeedbackToList(feedback));
});

// Add event listener to the form submit button
feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  submitForm();
});

// Add event listeners to the star rating elements
const stars = document.querySelectorAll('.star');
stars.forEach((star, index) => {
  star.addEventListener('click', () => setRating(index + 1));
});

// Mobile menu functionality
function toggleMobileMenu(icon) {
  const mobileMenu = document.querySelector('.mobile-menu');
  icon.classList.toggle('open');
  mobileMenu.classList.toggle('open');
}

// Add scroll event listener to change header background color
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.pageYOffset > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});