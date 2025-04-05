import { Component } from '@angular/core';
import { Goal, GoalService } from '../../../services/goal.service';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goal-form',
  standalone: false,
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css']
})
export class GoalFormComponent {
  goal: Goal = {
    name: '',
    goalType: '',
    target: '',
    deadline: '',
    progress: 0,
    achieved: false,
    createdAt: '',
    userId: 0
  };
  userId: number;

  constructor(private goalService: GoalService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
    this.goal.userId = this.userId; // Ensure userId is defined
  }

  createGoal(): void {
    // Ensure all required fields are set
    if (this.goal.name && this.goal.target && this.goal.userId) {
      console.log('Creating goal with data:', this.goal); // Log the goal data
      this.goalService.createGoal(this.userId, this.goal).subscribe({
        next: (newGoal) => {
          console.log('Goal created:', newGoal);
          Swal.fire({
            title: 'Success!',
            text: 'Your goal has been created successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.resetForm();
        },
        error:(error) => {
          console.error('Error creating goal:', error);
          Swal.fire({
            title: 'Error!',
            text: 'There was an error creating your goal. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
      );
    } else {
      console.error('Missing required fields: userId, name, or target');
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill in all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }

  resetForm(): void {
    this.goal = {
      name: '',
      goalType: '',
      target: '',
      deadline: '',
      progress: 0,
      achieved: false,
      createdAt: '',
      userId: this.userId
    };
  }
}
