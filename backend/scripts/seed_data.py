import os
import sys
import django

# Set up Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from django.contrib.auth import get_user_model
from modules.departments.models import Department
from modules.complaints.models import Complaint

User = get_user_model()


def seed():
    print("Clearing database...")
    # Delete existing data to prevent integrity/unique constraints issues
    Complaint.objects.all().delete()
    User.objects.all().delete()
    Department.objects.all().delete()

    print("Seeding departments...")
    transport = Department.objects.create(
        name="Transport",
        description="Handles roads, streetlights, and transit systems"
    )
    water = Department.objects.create(
        name="Water & Sanitation",
        description="Handles water leaks, drainage, and waste management"
    )

    print("Seeding users...")
    # Create Super Admin
    admin = User.objects.create_superuser(
        email="admin@gmail.com",
        password="adminpassword"
    )
    # Create Citizens
    ali = User.objects.create_user(
        email="ali@gmail.com",
        password="password123",
        first_name="Ali",
        last_name="Citizen",
        role="CITIZEN"
    )
    bob = User.objects.create_user(
        email="bob@gmail.com",
        password="password123",
        first_name="Bob",
        last_name="Citizen",
        role="CITIZEN"
    )
    # Create Officers
    ravi = User.objects.create_user(
        email="ravi@gmail.com",
        password="password123",
        first_name="Ravi",
        last_name="Officer",
        role="OFFICER",
        department=transport
    )
    mahesh = User.objects.create_user(
        email="mahesh@gmail.com",
        password="password123",
        first_name="Mahesh",
        last_name="Officer",
        role="OFFICER",
        department=water
    )
    # Create Department Head
    priya = User.objects.create_user(
        email="priya@gmail.com",
        password="password123",
        first_name="Priya",
        last_name="Head",
        role="DEPARTMENT_HEAD",
        department=transport
    )

    print("Seeding complaints...")
    c1 = Complaint.objects.create(
        title="Traffic Signal broken",
        description="The traffic light at the main crossing is blinking red.",
        category="Traffic",
        user=ali,
        department=transport,
        priority="MEDIUM",
        status="PENDING"
    )
    c2 = Complaint.objects.create(
        title="Water leak on 5th avenue",
        description="Water is gushing out from a broken pipe near the park entrance.",
        category="Water",
        user=bob,
        department=water,
        priority="HIGH",
        status="PENDING"
    )

    print("\nDatabase seeded successfully!")
    print("--------------------------------------------------------------------------------")
    print(f"Super Admin:     admin@gmail.com     / adminpassword")
    print(f"Citizen Ali:     ali@gmail.com       / password123")
    print(f"Citizen Bob:     bob@gmail.com       / password123")
    print(f"Officer Ravi:    ravi@gmail.com      / password123 (Transport)")
    print(f"Officer Mahesh:  mahesh@gmail.com    / password123 (Water & Sanitation)")
    print(f"Dept Head Priya: priya@gmail.com     / password123 (Transport)")
    print("--------------------------------------------------------------------------------")
    print(f"Transport Department UUID:   {transport.id}")
    print(f"Water Department UUID:       {water.id}")
    print(f"Traffic Complaint UUID:      {c1.id}")
    print(f"Water Leak Complaint UUID:   {c2.id}")
    print("--------------------------------------------------------------------------------")


if __name__ == "__main__":
    seed()
