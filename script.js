// ===== PART 1: EVENT HANDLING =====

// Counter functionality
document.addEventListener('DOMContentLoaded', function() {
    let count = 0;
    const counterDisplay = document.getElementById('counterValue');
    
    // Update counter display
    function updateCounter() {
        counterDisplay.textContent = count;
        // Change color based on value
        if (count > 0) {
            counterDisplay.style.color = 'green';
        } else if (count < 0) {
            counterDisplay.style.color = 'red';
        } else {
            counterDisplay.style.color = 'var(--text-color)';
        }
    }
    
    // Button event listeners
    document.getElementById('incrementBtn').addEventListener('click', function() {
        count++;
        updateCounter();
    });
    
    document.getElementById('decrementBtn').addEventListener('click', function() {
        count--;
        updateCounter();
    });
    
    document.getElementById('resetBtn').addEventListener('click', function() {
        count = 0;
        updateCounter();
    });
    
    document.getElementById('doubleBtn').addEventListener('click', function() {
        count *= 2;
        updateCounter();
    });

    // ===== PART 2: INTERACTIVE ELEMENTS =====

    // Dark/Light mode toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ Light Mode';
        } else {
            themeToggle.textContent = '🌙 Dark Mode';
        }
    });

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('span:last-child');
            
            // Toggle answer visibility
            answer.classList.toggle('open');
            
            // Change icon
            if (answer.classList.contains('open')) {
                icon.textContent = '-';
            } else {
                icon.textContent = '+';
            }
        });
    });

    // Tabbed interface functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ===== PART 3: FORM VALIDATION =====

    const form = document.getElementById('validationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const successMessage = document.getElementById('successMessage');

    // Validate name
    function validateName() {
        const nameError = document.getElementById('nameError');
        if (nameInput.value.trim().length < 2) {
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }

    // Validate email
    function validateEmail() {
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }

    // Validate password
    function validatePassword() {
        const passwordError = document.getElementById('passwordError');
        // At least 8 chars, one number, one special char
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(passwordInput.value)) {
            passwordError.style.display = 'block';
            return false;
        } else {
            passwordError.style.display = 'none';
            return true;
        }
    }

    // Validate confirm password
    function validateConfirmPassword() {
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordError.style.display = 'block';
            return false;
        } else {
            confirmPasswordError.style.display = 'none';
            return true;
        }
    }

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        
        // If all valid, show success message
        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            successMessage.style.display = 'block';
            form.reset();
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
});