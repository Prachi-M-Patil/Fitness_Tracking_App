export class GoalDTO{
    name: string;
    goalType: string; //e.g. weight loss
    target: number;
    deadline?: string; //(format: YYYY-MM-DD)
    progress?: number;
    achieved?: boolean; 
    createdAt?: string;
}



