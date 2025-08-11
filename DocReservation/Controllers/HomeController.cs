using System.Diagnostics;
using DocReservation.Models;
using Microsoft.AspNetCore.Mvc;


namespace DocReservation.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        // Home Page
        public IActionResult Index()
        {
            return View();
        }

       

        // Book Appointment Page
        public IActionResult CompleteAppointment()
        {
            // Sample doctor data
            var doctors = new List<Doctor>
            {
              new Doctor { Id = 1, Name = "Dr. Sarah Connor", Specialization = "Orthopedics", Img = "/images/doctors/doc1.png" },
    new Doctor { Id = 2, Name = "Dr. John Smith", Specialization = "Cardiology", Img = "/images/doctors/doc5.png" },
    new Doctor { Id = 3, Name = "Dr. Emily Davis", Specialization = "Pediatrics", Img = "/images/doctors/doc3.png" },
    new Doctor { Id = 4, Name = "Dr. Michael Lee", Specialization = "Neurology", Img = "/images/doctors/doc4.png" },
    new Doctor { Id = 5, Name = "Dr. Sophia Patel", Specialization = "Dermatology", Img = "/images/doctors/doc2.png" },
    new Doctor { Id = 6, Name = "Dr. David Chen", Specialization = "Gastroenterology", Img = "/images/doctors/doc6.png" },
    new Doctor { Id = 7, Name = "Dr. Martinez", Specialization = "Oncology", Img = "/images/doctors/doc7.png" },
    new Doctor { Id = 8, Name = "Dr. Robert Wilson", Specialization = "Endocrinology", Img = "/images/doctors/doc8.png" },
 };

            return View(doctors);
        }

        // Reservations Management Page
      
        public IActionResult ReservationsManagement()
        {
            return View();
        }

        [HttpGet]
        public IActionResult BookAppointment(string doctorName = null)
        {
            ViewData["DoctorName"] = doctorName ?? "Doctor Name";
            return View();
        }

        // Error Page
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
