import { Component, OnInit } from '@angular/core';
import { ProfileService, Profile } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile$: Observable<Profile | null>;
  profile: Profile = {
    name: '',
    age: 0,
    gender: '',
    weight: 0,
    height: 0,
    fitnessLevel: '',
    user: { id: 0 }, // Replace with dynamic user ID
  };

  userId: number = 0; // Replace with dynamic user ID (e.g., from login)
  message: string = '';

  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {
    this.profile$ = this.profileService.profile$;
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.profile.user!.id = this.userId;
    this.getProfile();
  }

  // Fetch profile details
  getProfile(): void {
    this.profileService.getProfile(this.userId);
    this.profile$.subscribe({
      next: (data) => {
        if (data) {
          this.profile = data;
          if (!this.profile.user) {
            this.profile.user = { id: this.userId };
          }
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.message = 'Unauthorized access. Redirecting to login...';
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          console.error('Error fetching profile:', err);
        }
      },
    });
  }

  // Create or update profile based on input
  saveProfile(): void {
    if (this.profile.id) {
      // Profile exists, so update it
      this.profileService.updateProfile(this.userId, this.profile);
      this.router.navigate(['/profile-view']);

    } else {
      // New profile, so create it
      this.profileService.createProfile(this.profile);
      this.router.navigate(['/profile-view']);

    }
  }
}

// import { Component, OnInit } from '@angular/core';
// import { ProfileService, Profile } from '../../services/profile.service';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-profile',
//   standalone: false,
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.css'],
// })
// export class ProfileComponent implements OnInit {
//   profile: Profile = {
//     name: '',
//     age: 0,
//     gender: '',
//     weight: 0,
//     height: 0,
//     fitnessLevel: '',
//     user: { id: 0 }, // Replace with dynamic user ID
//   };

//   userId: number = 0; // Replace with dynamic user ID (e.g., from login)
//   message: string = '';

//   constructor(
//     private profileService: ProfileService,
//     private authService: AuthService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.userId = this.authService.getUserId();
//     this.profile.user!.id = this.userId;
//     this.getProfile();
//   }

//   // Fetch profile details
//   getProfile(): void {
//     this.profileService.getProfile(this.userId).subscribe({
//       next: (data) => {
//         this.profile = data;
//         if (!this.profile.user) {
//           this.profile.user = { id: this.userId };
//         }
//       },
//       error: (err) => {
//         if (err.status === 401) {
//           this.message = 'Unauthorized access. Redirecting to login...';
//           this.authService.logout();
//           this.router.navigate(['/login']);
//         } else {
//           console.error('Error fetching profile:', err);
//         }
//       },
//     });
//   }

//   // Create or update profile based on input
//   saveProfile(): void {
//     // Check if the profile exists already or is new
//     if (this.profile.id) {
//       // Profile exists, so update it
//       this.profileService.updateProfile(this.userId, this.profile).subscribe({
//         next: (data) => {
//           this.message = 'Profile updated successfully!';
//           this.profile = data;
//           this.router.navigate(['/profile-view']);
//         },
//         error: (err) => {
//           if (err.status === 401) {
//             this.message = 'Unauthorized access. Redirecting to login...';
//             this.authService.logout();
//             this.router.navigate(['/login']);
//           } else {
//             console.error('Error updating profile:', err);
//           }
//         },
//       });
//     } else {
//       // New profile, so create it
//       this.profileService.createProfile(this.profile).subscribe({
//         next: (data) => {
//           this.message = 'Profile created successfully!';
//           this.profile = data;
//           this.router.navigate(['/profile-view']);
//         },
//         error: (err) => {
//           if (err.status === 401) {
//             this.message = 'Unauthorized access. Redirecting to login...';
//             this.authService.logout();
//             this.router.navigate(['/login']);
//           } else {
//             console.error('Error creating profile:', err);
//           }
//         },
//       });
//     }
//   }
  
// }

// // import { Component, OnInit } from '@angular/core';
// // import { ProfileService, Profile } from '../../services/profile.service';
// // import { AuthService } from '../../services/auth.service';

// // @Component({
// //   selector: 'app-profile',
// //   standalone: false,
// //   templateUrl: './profile.component.html',
// //   styleUrls: ['./profile.component.css'],
// // })
// // export class ProfileComponent implements OnInit {
// //   profile: Profile = {
// //     name: '',
// //     age: 0,
// //     gender: '',
// //     weight: 0,
// //     height: 0,
// //     fitnessLevel: '',
// //     user: { id: 0 }, // Replace with dynamic user ID
// //   };

// //   userId: number = 0; // Replace with dynamic user ID (e.g., from login)
// //   message: string = '';

// //   constructor(private profileService: ProfileService, private authService: AuthService) {}

// //   ngOnInit(): void {
// //     this.userId = this.authService.getUserId();
// //     this.profile.user!.id = this.userId;
// //     this.getProfile();
// //   }

// //   // Fetch profile details
// //   getProfile(): void {
// //     this.profileService.getProfile(this.userId).subscribe({
// //       next: (data) => {
// //         this.profile = data;
// //         if (!this.profile.user) {
// //           this.profile.user = { id: this.userId };
// //         }
// //       },
// //       error: (err) => {
// //         if (err.status === 401) {
// //           this.message = 'Unauthorized access. Please log in again.';
// //         } else {
// //           console.error('Error fetching profile:', err);
// //         }
// //       },
// //     });
// //   }

// //   // Create or update profile based on input
// //   saveProfile(): void {
// //     if (this.profile.user?.id) {
// //       this.profileService.updateProfile(this.userId, this.profile).subscribe({
// //         next: (data) => {
// //           this.message = 'Profile updated successfully!';
// //           this.profile = data;
// //         },
// //         error: (err) => {
// //           if (err.status === 401) {
// //             this.message = 'Unauthorized access. Please log in again.';
// //           } else {
// //             console.error('Error updating profile:', err);
// //           }
// //         },
// //       });
// //     } else {
// //       this.profileService.createProfile(this.profile).subscribe({
// //         next: (data) => {
// //           this.message = 'Profile created successfully!';
// //           this.profile = data;
// //         },
// //         error: (err) => {
// //           if (err.status === 401) {
// //             this.message = 'Unauthorized access. Please log in again.';
// //           } else {
// //             console.error('Error creating profile:', err);
// //           }
// //         },
// //       });
// //     }
// //   }
// // }