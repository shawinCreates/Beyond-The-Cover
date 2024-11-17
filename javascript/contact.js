
              // Select form elements
              const form = document.getElementById("contactForm");
              const firstName = document.getElementById("firstName");
              const email = document.getElementById("email");
              const phone = document.getElementById("phone");
              const message = document.getElementById("message");
              const wordCounter = document.getElementById("wordCounter");
            
              // Error message elements
              const firstNameError = document.getElementById("firstNameError");
              const emailError = document.getElementById("emailError");
              const phoneError = document.getElementById("phoneError");
              const messageError = document.getElementById("messageError");
            
              // Form validation function
              function validateForm(event) {
                let isValid = true;
            
                // Validate first name
                if (firstName.value.length < 3 || firstName.value.length > 10) {
                  firstNameError.classList.remove("d-none");
                  isValid = false;
                } else {
                  firstNameError.classList.add("d-none");
                }
            
                // Validate email
                const validEmailDomains = ["gmail.com", "hotmail.com", "yahoo.com"];
                const emailDomain = email.value.split("@")[1];
                if (!validEmailDomains.includes(emailDomain)) {
                  emailError.classList.remove("d-none");
                  isValid = false;
                } else {
                  emailError.classList.add("d-none");
                }
            
                // Validate phone (if entered)
                if (phone.value && !/^\+\d{1,3}-/.test(phone.value)) {
                  phoneError.classList.remove("d-none");
                  isValid = false;
                } else {
                  phoneError.classList.add("d-none");
                }
            
                // Validate message
                const messageWords = message.value.trim().split(/\s+/);
                if (messageWords.length === 0 || messageWords.length > 100) {
                  messageError.classList.remove("d-none");
                  isValid = false;
                } else {
                  messageError.classList.add("d-none");
                }
            
                // Prevent form submission if invalid
                if (!isValid) {
                  event.preventDefault();
                } else {
    const thankYouModal = new bootstrap.Modal(document.getElementById("thankYouModal"));
    thankYouModal.show();
                }
              }
            
              // Word counter for the message field
              message.addEventListener("input", () => {
                const wordCount = message.value.trim().split(/\s+/).filter(word => word).length;
                wordCounter.textContent = `${wordCount}/100 words`;
              });
            
              // Attach validation to form submission
              form.addEventListener("submit", validateForm);