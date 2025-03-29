export class GoalDTO{
    name: string;
    target: number;
    deadline?: string; //(format: YYYY-MM-DD)
    progress?: number;
    achieved?: boolean; 
    createdAt?: string;
}



