using DocReservation.Data;
using DocReservation.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Linq;

namespace DocReservation.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly ApplicationDbContext _context;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        // Home page
        public IActionResult Index()
        {
            return View();
        }

        // Show list of doctors
        public IActionResult CompleteAppointment()
        {
            var doctors = _context.Doctors.ToList();
            return View(doctors);
        }

        // GET: Appointment booking form
        [HttpGet]
        public IActionResult BookAppointment()
        {
            var doctorsList = _context.Doctors
                .Select(d => d.Name)
                .Distinct()
                .OrderBy(name => name)
                .ToList();

            ViewBag.Doctors = doctorsList;
            return View();
        }

        // POST: Save appointment
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult BookAppointment(Appointment model)
        {
            if (!ModelState.IsValid)
            {
                // Reload doctors if validation fails
                ViewBag.Doctors = _context.Doctors
                    .Select(d => d.Name)
                    .Distinct()
                    .OrderBy(name => name)
                    .ToList();

                return View(model);
            }

            // Save appointment to database
            _context.Appointments.Add(model);
            _context.SaveChanges();

            // Redirect to reservations page
            return RedirectToAction("ReservationsManagement");
        }

        // List all booked appointments
        public IActionResult ReservationsManagement()
        {
            var appointments = _context.Appointments.ToList();
            return View(appointments);
        }

        // Error page
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            var requestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            _logger.LogError("Request ID {RequestId} triggered error page", requestId);

            return View(new ErrorViewModel { RequestId = requestId });
        }
    }
}
