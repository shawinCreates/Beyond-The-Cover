const form = document.getElementById("contactForm");
const firstName = document.getElementById("firstName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const wordCounter = document.getElementById("wordCounter");

const firstNameError = document.getElementById("firstNameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const messageError = document.getElementById("messageError");

function validateForm(event) {
  let isValid = true;

  // Validate first name (length and only alphabetic characters)
  const namePattern = /^[a-zA-Z]+$/; 
  if (firstName.value.length < 3 || firstName.value.length > 10 || !namePattern.test(firstName.value)) {
    firstNameError.textContent = "Name must be 3-10 alphabetic characters.";
    firstNameError.classList.remove("d-none");
    isValid = false;
  } else {
    firstNameError.classList.add("d-none");
  }

  // Validate email
  const validEmailDomains = ["gmail.com", "hotmail.com", "yahoo.com"];
  const emailDomain = email.value.split("@")[1];
  if (!validEmailDomains.includes(emailDomain)) {
    emailError.textContent = "Email must end with a valid domain.";
    emailError.classList.remove("d-none");
    isValid = false;
  } else {
    emailError.classList.add("d-none");
  }

  // Validate phone (if entered)
  if (phone.value && !/^\+\d{1,3}-/.test(phone.value)) {
    phoneError.textContent = "Phone must be in the format +[code]-[number].";
    phoneError.classList.remove("d-none");
    isValid = false;
  } else {
    phoneError.classList.add("d-none");
  }

  // Validate message
  const messageWords = message.value.trim().split(/\s+/);
  if (messageWords.length === 0 || messageWords.length > 100) {
    messageError.textContent =
      "Message must be between 1 and 100 words.";
    messageError.classList.remove("d-none");
    isValid = false;
  } else {
    messageError.classList.add("d-none");
  }

  // Prevent form submission if invalid
  if (!isValid) {
    event.preventDefault();
  } else {
    event.preventDefault(); 
    const thankYouModal = new bootstrap.Modal(
      document.getElementById("thankYouModal")
    );
    thankYouModal.show();

    // Submit form after modal (optional delay for effect)
    setTimeout(() => form.submit(), 5000);
  }
}

message.addEventListener("input", () => {
  const wordCount = message.value
    .trim()
    .split(/\s+/)
    .filter((word) => word).length;
  wordCounter.textContent = `${wordCount}/100 words`;
});

form.addEventListener("submit", validateForm);