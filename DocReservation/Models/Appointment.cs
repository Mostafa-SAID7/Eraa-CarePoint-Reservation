namespace DocReservation.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string DoctorName { get; set; } = string.Empty;
        public string PatientName { get; set; } = string.Empty;
        public DateTime AppointmentDate { get; set; }  // Change to DateTime
        public string AppointmentTime { get; set; } = string.Empty;
    }
}
