// JavaScript
const header = document.getElementById('header');

function handleScroll() {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// Section 2 JS //
const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);
// Section 2 JS Ended//

//Mouse Effect //
document.addEventListener('mousemove', ripple);

function ripple(event) {
  const rippleEffect = document.createElement('span');
  rippleEffect.className = 'ripple';
  document.body.appendChild(rippleEffect);

  const x = event.pageX - rippleEffect.offsetWidth / 2;
  const y = event.pageY - rippleEffect.offsetHeight / 2;

  rippleEffect.style.left = `${x}px`;
  rippleEffect.style.top = `${y}px`;

  rippleEffect.addEventListener('animationend', () => {
    rippleEffect.remove();
  });
}
//Mouse Effect  End//

// Select the class bubble
time = document.getElementsByClassName('bubbles')[0];

//Newsletter//
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var firstName = document.getElementById('firstName').value;
  var lastName = document.getElementById('lastName').value;
  var email = document.getElementById('email').value;
  if (validateEmail(email)) {
      document.getElementById('successMessage').style.display = 'block';
      document.getElementById('successMessage').innerText = 'Subscription successful!';
      document.getElementById('errorMessage').style.display = 'none';
      // Here you can send the data to your server for further processing
      // For demo purposes, let's log the data to the console
      console.log('Subscribed data:', {firstName: firstName, lastName: lastName, email: email});
      // You may want to clear the input fields after successful subscription
      document.getElementById('firstName').value = '';
      document.getElementById('lastName').value = '';
      document.getElementById('email').value = '';
  } else {
      document.getElementById('successMessage').style.display = 'none';
      document.getElementById('errorMessage').style.display = 'block';
      document.getElementById('errorMessage').innerText = 'Please enter a valid email address.';
  }
});

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Select the class bubble

function toggleMobileMenu(icon) {
  const mobileMenu = document.querySelector('.mobile-menu');
  icon.classList.toggle('open');

  if (icon.classList.contains('open')) {
    mobileMenu.style.display = 'block';
  } else {
    mobileMenu.style.display = 'none';
  }
}
