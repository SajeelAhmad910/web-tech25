const form = document.getElementById('checkoutForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;
    

    const fields = form.querySelectorAll('input, textarea');
    const today = new Date();

    fields.forEach(field => {
        const error = field.nextElementSibling;
        field.classList.remove('invalid');
        error.textContent = '';

        const value = field.value.trim();
        const name = field.name;

        // General required check
        if (!value) {
            error.textContent = 'This field is required.';
            field.classList.add('invalid');
            valid = false;
            return;
        }

        // Field-specific validation
        switch (name) {
            case 'fullName':
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    error.textContent = 'Only alphabets and spaces are allowed.';
                    field.classList.add('invalid');
                    valid = false;
                }
                break;

            case 'email':
                if (!/^\S+@\S+\.\S+$/.test(value)) {
                    error.textContent = 'Enter a valid email address.';
                    field.classList.add('invalid');
                    valid = false;
                }
                break;

            case 'phone':
                if (!/^\d{10,15}$/.test(value)) {
                    error.textContent = 'Phone must be 10–15 digits.';
                    field.classList.add('invalid');
                    valid = false;
                }
                break;

            case 'cardNumber':
                if (!/^\d{16}$/.test(value)) {
                    error.textContent = 'Card number must be 16 digits.';
                    field.classList.add('invalid');
                    valid = false;
                }
                break;

            case 'cvv':
                if (!/^\d{3}$/.test(value)) {
                    error.textContent = 'CVV must be 3 digits.';
                    field.classList.add('invalid');
                    valid = false;
                }
                break;

            case 'expiry':
                const inputDate = new Date(value);
                if (inputDate <= today) {
                    error.textContent = 'Expiry must be a future date.';
                    field.classList.add('invalid');
                    valid = false;
                }
                break;

            default:
                break;
        }
    });

    if (valid) {
        alert('Form submitted successfully!');
        form.reset();
    }
});
