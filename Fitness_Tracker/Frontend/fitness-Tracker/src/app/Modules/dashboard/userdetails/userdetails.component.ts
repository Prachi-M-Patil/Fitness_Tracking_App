import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminDashboardService, User } from '../../../services/admin.service';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: number = 0;
  userData: Partial<User> = {
    username: '',
    email: '',
    mobile: 0,
    role: 'user'
  };

  constructor(
    private route: ActivatedRoute,
    private adminDashboardService: AdminDashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.adminDashboardService.searchUsers({ id: this.userId }).subscribe(
      (response) => {
        if (response.length > 0) {
          this.userData = response[0];
          console.log('User details:', this.userData);
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  saveUserDetails(): void {
    this.adminDashboardService.updateUser(this.userId, this.userData).subscribe(
      (response) => {
        console.log('User details updated:', response);
        this.router.navigate(['/admin-dashboard']);
      },
      (error) => {
        console.error('Error updating user details:', error);
      }
    );
  }
}
