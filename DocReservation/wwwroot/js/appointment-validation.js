document.addEventListener('DOMContentLoaded', function () {
    const appointmentDate = document.getElementById('AppointmentDate');
    const appointmentTime = document.getElementById('AppointmentTime');
    const bookingForm = document.querySelector('form');

    // Populate available time slots
    function populateTimes() {
        appointmentTime.innerHTML = '<option value="">Select time</option>';
        const startHour = 8;   // Start at 8:00 AM
        const endHour = 18;    // End at 6:00 PM

        for (let hour = startHour; hour <= endHour; hour++) {
            for (const min of [0, 30]) {
                if (hour === endHour && min > 0) continue;

                const period = hour >= 12 ? 'PM' : 'AM';
                const displayHour = hour % 12 || 12;
                const displayMin = String(min).padStart(2, '0');
                const valueHour = String(hour).padStart(2, '0');
                const valueMin = String(min).padStart(2, '0');

                const option = document.createElement('option');
                option.value = `${valueHour}:${valueMin}`;
                option.textContent = `${displayHour}:${displayMin} ${period}`;
                appointmentTime.appendChild(option);
            }
        }
    }

    // Initialize date picker
    if (appointmentDate) {
        flatpickr(appointmentDate, {
            dateFormat: 'Y-m-d',
            minDate: 'today',
            disable: [
                date => date.getDay() === 5 || date.getDay() === 6 // Disable Friday & Saturday
            ],
            disableMobile: true
        });
    }

    // Populate times on load
    if (appointmentTime) {
        populateTimes();
    }

    // Form submission with notification
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            const doctorName = document.getElementById('DoctorName')?.value;
            const patientName = document.getElementById('PatientName')?.value;
            const dateValue = appointmentDate?.value;
            const timeValue = appointmentTime?.value;

            if (!doctorName || !patientName || !dateValue || !timeValue) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }

            // Allow form submission, but show a success toast after server redirect
            sessionStorage.setItem('appointmentSuccess', 'true');
        });
    }

    // Show success notification if redirected after booking
    if (sessionStorage.getItem('appointmentSuccess') === 'true') {
        sessionStorage.removeItem('appointmentSuccess');
        setTimeout(() => {
            // Simple notification (replace with Toast library if needed)
            alert('✅ Appointment booked successfully!');
        }, 300);
    }
});
