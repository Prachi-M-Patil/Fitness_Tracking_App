import { Component, OnInit } from '@angular/core';
import { Workout, WorkoutService } from '../../services/workout.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-workout',
  standalone : false,
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css'],
})
export class WorkoutComponent implements OnInit {
  workouts: Workout[] = [];
  newWorkout: Workout = {
    type: '',
    duration: 0,
    date: new Date(), // Format the initial date
    caloriesBurned: 0,
  };
  userId: number = 0; // Replace with dynamic user ID
  message: string = '';

  constructor(private workoutService: WorkoutService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    // this.newWorkout.id = this.userId;
    this.fetchWorkouts();
  }

  // Utility function to format dates
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Returns the date in "yyyy-MM-dd" format
  }

  fetchWorkouts(): void {
    this.workoutService.getWorkouts(this.userId).subscribe({
      next: (data: Workout[]) => {
        this.workouts = data;
      },
      error: (err: any) => {
        console.error('Error fetching workouts:', err);
        this.message = 'Failed to load workouts.';
      },
    });
  }

  logWorkout(): void {
    // Convert the date string (yyyy-MM-dd) from the input to a Date object
    const formattedDate = new Date(this.newWorkout.date);
  
    // Assign the converted Date object to newWorkout.date
    this.newWorkout.date = formattedDate;
  
    this.workoutService.logworkout(this.userId, this.newWorkout).subscribe({
      next: (data: Workout) => {
        this.message = 'Workout logged successfully!';
        this.workouts.push(data);
        this.newWorkout = {
          type: '',
          duration: 0,
          date: new Date(), // Reset date to today's date
          caloriesBurned: 0,
        };
      },
      error: (err: any) => {
        console.error('Error logging workout:', err);
        this.message = 'Failed to log workout.';
      },
    });
  }

  
}  