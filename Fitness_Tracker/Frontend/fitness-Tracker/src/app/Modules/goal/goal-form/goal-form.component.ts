import { Component } from '@angular/core';
import { Goal, GoalService } from '../../../services/goal.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-goal-form',
  standalone:false,
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
      this.goalService.createGoal(this.userId, this.goal).subscribe(
        newGoal => {
          console.log('Goal created:', newGoal);
          this.resetForm();
        },
        error => {
          console.error('Error creating goal:', error);
        }
      );
    } else {
      console.error('Missing required fields: userId, name, or target');
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