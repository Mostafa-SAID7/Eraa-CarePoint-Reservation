using Microsoft.EntityFrameworkCore;
using DocReservation.Models;

namespace DocReservation.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        // Optional: configure table names & constraints
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Doctor config
            modelBuilder.Entity<Doctor>().HasData(
        new Doctor { Id = 1, Name = "Dr. Sarah Connor", Specialization = "Orthopedics", Img = "/images/doctors/doc1.png" },
        new Doctor { Id = 2, Name = "Dr. John Smith", Specialization = "Cardiology", Img = "/images/doctors/doc5.png" },
        new Doctor { Id = 3, Name = "Dr. Emily Davis", Specialization = "Pediatrics", Img = "/images/doctors/doc3.png" },
        new Doctor { Id = 4, Name = "Dr. Michael Lee", Specialization = "Neurology", Img = "/images/doctors/doc4.png" },
        new Doctor { Id = 5, Name = "Dr. Sophia Patel", Specialization = "Dermatology", Img = "/images/doctors/doc2.png" },
        new Doctor { Id = 6, Name = "Dr. David Chen", Specialization = "Gastroenterology", Img = "/images/doctors/doc6.png" },
        new Doctor { Id = 7, Name = "Dr. Martinez", Specialization = "Oncology", Img = "/images/doctors/doc7.png" },
        new Doctor { Id = 8, Name = "Dr. Robert Wilson", Specialization = "Endocrinology", Img = "/images/doctors/doc8.png" }
    );

            // Appointment config
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(a => a.Id);
                entity.Property(a => a.DoctorName).IsRequired().HasMaxLength(100);
                entity.Property(a => a.PatientName).IsRequired().HasMaxLength(100);
                entity.Property(a => a.AppointmentDate).IsRequired();
                entity.Property(a => a.AppointmentTime).IsRequired();
            });
        }
    }
}
