document.addEventListener('DOMContentLoaded', function () {
    const appointmentDate = document.getElementById('appointmentDate');
    const appointmentTime = document.getElementById('appointmentTime');
    const appointmentForm = document.getElementById('appointmentForm');
    const successModalEl = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (!appointmentDate || !appointmentTime || !appointmentForm || !successModalEl || !closeModalBtn) {
        console.warn('One or more required elements are missing.');
        return;
    }

    // 1️⃣ Initialize flatpickr with disabled Fridays, Saturdays, and past dates
    flatpickr(appointmentDate, {
        dateFormat: "Y-m-d",
        minDate: "today",
        disable: [
            (date) => date.getDay() === 5 || date.getDay() === 6  // Disable Friday (5) and Saturday (6)
        ],
        disableMobile: true
    });

    // 2️⃣ Populate appointmentTime select with 30-min increments from 8 AM to 6 PM
    function populateTimes() {
        appointmentTime.innerHTML = ""; // Clear existing options
        const startHour = 8;
        const endHour = 18;

        for (let hour = startHour; hour <= endHour; hour++) {
            for (let min of [0, 30]) {
                if (hour === endHour && min > 0) continue; // no time after 6:00 PM

                const period = hour >= 12 ? "PM" : "AM";
                const displayHour = hour % 12 || 12;
                const displayMin = String(min).padStart(2, '0');
                const valueHour = String(hour).padStart(2, '0');
                const valueMin = String(min).padStart(2, '0');

                const option = document.createElement("option");
                option.value = `${valueHour}:${valueMin}`;
                option.textContent = `${displayHour}:${displayMin} ${period}`;

                appointmentTime.appendChild(option);
            }
        }
    }
    populateTimes();

    // 3️⃣ Show Bootstrap modal on form submit
    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const dateValue = appointmentDate.value.trim();
        const timeValue = appointmentTime.value.trim();
        const patientName = document.getElementById('patientName').value.trim();

        if (!patientName || !dateValue || !timeValue) {
            // Optionally add user feedback here (e.g. alert or inline message)
            return;
        }

        // Show modal
        const modal = new bootstrap.Modal(successModalEl, {
            backdrop: 'static',
            keyboard: false
        });
        modal.show();

        // Reset form after showing modal
        appointmentForm.reset();

        // Refresh time options (optional)
        populateTimes();
    });

    // 4️⃣ Close modal button handler
    closeModalBtn.addEventListener('click', function () {
        const modalInstance = bootstrap.Modal.getInstance(successModalEl);
        if (modalInstance) {
            modalInstance.hide();
        }
    });
});
