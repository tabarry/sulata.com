// JavaScript Document
// JavaScript function to obfuscate the email address
function obfuscateEmail() {
  var user = "hi";
  var domain = "sulata.com";

  // Get all elements with the specified class name
  var elements = document.querySelectorAll(".email-link");

  // Construct the mailto link
  var mailtoLink = user + "@" + domain;

  // Set the link as the content of each matching element if it exists
  elements.forEach(function (element) {
    if (element) {
      element.innerHTML = '<a href="mailto:' + mailtoLink + '">' + mailtoLink + '</a>';
    }
  });
}


//Submit form with Ajax
function submitForm(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  var formData = new FormData(document.getElementById("suForm"));

  // Create XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open("POST", "flow/api.php", true);

  // Set up the callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        document.getElementById('suForm').style.display = 'none';
        document.getElementById('form-msg').style.display = 'block';

        // Check if there is a 'message' property in the response
        if (response && response.message) {
          // Remove quotes and display the message in 'form-msg'
          document.getElementById('form-msg').innerHTML = response.message.replace(/["']/g, "");
        } else {
          document.getElementById('form-msg').innerHTML = 'Form submitted successfully!';
        }
      } else {
        alert('Sorry, there was an error submitting the form. Please try again.');
        // Handle the error as needed
      }
    }
  };

  // Send the form data
  xhr.send(formData);
}

//Smooth scroll
function smoothScroll(targetId) {
  var targetElement = document.getElementById(targetId);

  if (targetElement) {
    var offset = 150; // Offset in pixels above the target
    var navbarHeight = document.querySelector('nav').offsetHeight; // Height of the sticky navbar

    var targetPosition = targetElement.offsetTop - offset - navbarHeight;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var duration = 1000; // Duration in milliseconds
    var startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      var timeElapsed = currentTime - startTime;
      var run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }
}


//Form submit listener
document.getElementById("suForm").addEventListener("submit", function(event) {
  submitForm(event);
});


//Change class of nav on scroll
window.addEventListener("scroll", function () {
  var navbar = document.querySelector(".navbar-custom");
  if (window.scrollY >= 50) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});

// Call the obfuscateEmail function to populate the content
obfuscateEmail();