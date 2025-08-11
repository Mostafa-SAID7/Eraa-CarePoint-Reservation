// Simple mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});


// for Complete Appointment
document.addEventListener('DOMContentLoaded', function () {
    const appointmentForm = document.getElementById('appointmentForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
    });

    closeModal.addEventListener('click', function () {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
    });
});