//console.log("form-validation.js is running");

const observer = new MutationObserver(() => {
    const form = document.getElementById("contact-form");
    if (form) {
        console.log("contact-form mounted");
        observer.disconnect();
        activateValidation(form);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    if (body) {
        observer.observe(body, { childList: true, subtree: true });
    } else {
        console.error("<body> not found");
    }
});

function activateValidation(form) {
    const compName = document.getElementById('company-name');
    const business = document.getElementById('business');
    const address = document.getElementById('address');
    const postcode = document.getElementById('postcode');
    const contactName = document.getElementById('contact-name');
    const contactPhone = document.getElementById('contact-phone');
    const email = document.getElementById('email');
    const linkedin = document.getElementById('linkedin');
    const description = document.getElementById('description');
    const uploadFile = document.getElementById('uploadFile');
    const nda = document.getElementById('nda');
    const newsletterEmail = document.getElementById("news-letter-email");
    const newsletterForm = document.getElementById('news-letter-form');
    const uploadNote = document.getElementById('upload-note');
    const modal = document.getElementById("terms-modal");
    const openTermsBtn = document.getElementById("open-terms");
    const closeModalBtn = document.getElementById("close-modal");
    const acceptTerms = document.getElementById("accept-terms");

    //console.log("js file loaded");

    form.addEventListener('submit', e => {
        e.preventDefault();
        validateInputs();
        const isValid = validateInputs();

        if (isValid) {
            showToast("Form submitted successfully!");
            form.reset(); // clear form fields
            termsAccepted = false; 
            uploadNote.innerText = "Attach file. File size of your documents should not exceed 10MB";
            uploadNote.style.color = "";
            // إزالة كل الكلاسات success
            form.querySelectorAll('.input-control').forEach(el => {
                el.classList.remove('success');
            });
        }
    });

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        validateNewsletter();

    });
    const setError = (element, message) => {
        const inputControl = element.closest('.input-control');
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    }

    const setSuccess = element => {
        const inputControl = element.closest('.input-control');
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    }

    let termsAccepted = false;

    // open modal
    openTermsBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // close modal
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
        termsAccepted = acceptTerms.checked;
    });
    const showToast = (message) => {
        const toast = document.getElementById("toast");
        toast.innerText = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 5000); // 3 ثوانٍ
    };

    const validateNewsletter = () => {
        const emailValue = newsletterEmail.value.trim();

        if (emailValue === '') {
            setError(newsletterEmail, 'Email is required');
        } else if (!isValidEmail(emailValue)) {
            setError(newsletterEmail, 'Invalid email format');
        } else {
            setSuccess(newsletterEmail);
        }
    }
    const isValidEmail = email => {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
        return regex.test(email);
    }

    const validateCompany = () => {
        const val = compName.value.trim();
        if (val === '') {
            setError(compName, 'Company name is required');
        } else {
            setSuccess(compName);
        }
    }

    const validateBusiness = () => {
        const val = business.value.trim();
        if (val === '') {
            setError(business, 'Nature of Business is required');
        } else {
            setSuccess(business);
        }
    }

    const validateAddress = () => {
        const val = address.value.trim();
        if (val === '') {
            setError(address, 'Address is required');
        } else if (!/^[a-zA-Z0-9\s\,\'\-]*$/.test(val)) {
            setError(address, 'Address format is invalid');
        } else {
            setSuccess(address);
        }
    }

    const validatePostcode = () => {
        const val = postcode.value.trim();
        if (val === '') {
            setError(postcode, 'Postcode is required');
        } else if (!/^\d{4,10}$/.test(val)) {
            setError(postcode, 'Postcode must be between 4–10 digits');
        } else {
            setSuccess(postcode);
        }
    }

    const validateContactName = () => {
        const val = contactName.value.trim();
        if (val === '') {
            setError(contactName, 'Contact name is required');
        } else {
            setSuccess(contactName);
        }
    }

    const validateContactPhone = () => {
        const val = contactPhone.value.trim();
        if (val === '') {
            setError(contactPhone, 'Contact Phone is required');
        } else if (!/^\d{10}$/.test(val)) {
            setError(contactPhone, 'Phone must be 10 digits');
        } else {
            setSuccess(contactPhone);
        }
    }

    const validateEmail = () => {
        const val = email.value.trim();
        if (val === '') {
            setError(email, 'Email is required');
        } else if (!isValidEmail(val)) {
            setError(email, 'Email is not valid');
        } else {
            setSuccess(email);
        }
    }

    const validateLinkedIn = () => {
        const val = linkedin.value.trim();
        if (val === '') {
            setError(linkedin, 'LinkedIn account is required');
        } else if (!/^https?:\/\/(www\.)?linkedin\.com\/.*$/.test(val)) {
            setError(linkedin, 'Enter a valid LinkedIn URL');
        } else {
            setSuccess(linkedin);
        }
    }

    const validateDescription = () => {
        const val = description.value.trim();
        if (val === '') {
            setError(description, 'Description is required');
        } else {
            setSuccess(description);
        }
    }

    const validateNDA = () => {
        if (!nda.checked) {
            setError(nda, 'You must agree to NDA');
        } else {
            setSuccess(nda);
        }
    }

    const validateFile = () => {
        const file = uploadFile.files[0];
        const uploadIcon = document.getElementById('fa-upload');
        const uploadLabel = document.getElementById('upload-label');
        const UploadBox = document.getElementById('upload-box');

        if (!file) {
            return;
        }

        const isPDF = file.type === "application/pdf";
        const isUnder10MB = file.size <= 10 * 1024 * 1024;

        if (!isPDF) {
            uploadNote.innerText = "Only PDF files are allowed.";
            uploadNote.style.color = "red";
        } else if (!isUnder10MB) {
            uploadNote.innerText = "File must be less than 10MB.";
            uploadNote.style.color = "red";
        } else {
            const sizeMB = (file.size / 1024 / 1024).toFixed(2);
            uploadNote.innerText = `Uploaded: ${file.name} (${sizeMB} MB)`;
            uploadNote.style.color = "green";
            uploadIcon.style.color = "green";
            uploadLabel.innerText = "Successfuly File Uploaded"
            uploadLabel.style.color = "green";
            UploadBox.style.border = "2px solid green"

        }
    };

    const validateTerms = () => {
        console.log("Checking terms");

        const termError = document.getElementById("terms-error");
        console.log(termsAccepted);

        if (!termsAccepted) {
            termError.innerText = "You must accept the terms to continue.";
            termError.style.color = "red";
            termError.style.fontSize = "12px";
            termError.style.marginTop = "5px";
            termError.style.display = "block";

        } else {
            termError.innerText = "";
            termError.style.display = "none";

        }
        console.log("Checking terms");

    };

    const clearFormFields = () => {

    }
    const validateInputs = () => {
        validateCompany();
        validateBusiness();
        validateAddress();
        validatePostcode();
        validateContactName();
        validateContactPhone();
        validateEmail();
        validateLinkedIn();
        validateDescription();
        validateNDA();
        validateFile();
        validateTerms();

        const errors = form.querySelectorAll('.input-control.error');
        const uploadNoteColor = uploadNote?.style.color;
        const termsError = document.getElementById("terms-error").innerText;

        return errors.length === 0 && uploadNoteColor !== "red" && termsError === "";
    }

    compName.addEventListener("input", validateCompany);
    business.addEventListener("input", validateBusiness);
    address.addEventListener("input", validateAddress);
    postcode.addEventListener("input", validatePostcode);
    contactName.addEventListener("input", validateContactName);
    contactPhone.addEventListener("input", validateContactPhone);
    email.addEventListener("input", validateEmail);
    linkedin.addEventListener("input", validateLinkedIn);
    description.addEventListener("input", validateDescription);
    nda.addEventListener("change", validateNDA);
    newsletterEmail.addEventListener("input", validateNewsletter);
    uploadFile.addEventListener("change", validateFile);


    acceptTerms.addEventListener("change", () => {
        termsAccepted = acceptTerms.checked;
        console.log(termsAccepted);
    });

}

