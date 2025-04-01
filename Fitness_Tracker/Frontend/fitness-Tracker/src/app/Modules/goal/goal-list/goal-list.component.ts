import { Component, OnInit } from '@angular/core';
import { Goal, GoalService } from '../../../services/goal.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-goal-list',
  standalone: false,
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {
  goals: Goal[] = []; // Corrected to be an array of Goal objects
  userId: number;

  constructor(private goalService: GoalService, private authService: AuthService) {
    this.userId = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.fetchGoals();
    console.log("fetching goals");
  }

  fetchGoals(): void {
    this.goalService.getGoals(this.userId).subscribe(goals => {
      this.goals = goals.map(goal => ({
        ...goal,
        userId: goal.userId || this.userId // Ensure userId is defined for each goal
      }));
    });
  }

  updateGoal(goalId: number| undefined, progress: number, achieved: boolean): void {
    if (goalId !== undefined) {
      this.goalService.updateGoal(goalId, progress, achieved).subscribe(updatedGoal => {
        const index = this.goals.findIndex(goal => goal.id === goalId);
        if (index !== -1) {
          this.goals[index] = updatedGoal;
        }
      });
    }

  }

  //for progress 
  setProgress(event: MouseEvent, goal: Goal): void {
    const progressBarContainer = event.currentTarget as HTMLElement;
    const rect = progressBarContainer.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newProgress = Math.round((offsetX / rect.width) * 100);
    goal.progress = newProgress;
  }


  deleteGoal(goalId: number | undefined): void {
    if (goalId !== undefined) {
      this.goalService.deleteGoal(goalId).subscribe(() => {
        this.goals = this.goals.filter(goal => goal.id !== goalId);
      });
    }
  }
}