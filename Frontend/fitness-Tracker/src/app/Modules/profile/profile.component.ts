import { Component, OnInit } from '@angular/core';
import { ProfileService, Profile } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: Profile = {
    name: '',
    age: 0,
    gender: '',
    weight: 0,
    height: 0,
    fitnessLevel: '',
    user: { id: 4 }, // Replace with dynamic user ID
  };

  userId: number = 4; // Replace with dynamic user ID (e.g., from login)
  message: string = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.getProfile();
  }

  // Fetch profile details
  getProfile(): void {
    this.profileService.getProfile(this.userId).subscribe({
      next: (data) => (this.profile = data),
      error: (err) => console.error('Error fetching profile:', err),
    });
  }

  // Create or update profile based on input
  saveProfile(): void {
    if (this.profile.user?.id) {
      this.profileService.updateProfile(this.userId, this.profile).subscribe({
        next: (data) => {
          this.message = 'Profile updated successfully!';
          this.profile = data;
        },
        error: (err) => console.error('Error updating profile:', err),
      });
    } else {
      this.profileService.createProfile(this.profile).subscribe({
        next: (data) => {
          this.message = 'Profile created successfully!';
          this.profile = data;
        },
        error: (err) => console.error('Error creating profile:', err),
      });
    }
  }
}
