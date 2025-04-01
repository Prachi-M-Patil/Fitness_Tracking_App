import { IsNumber, IsOptional, IsString, Length, Min, Max } from "class-validator";

export class MealDTO {
    @IsOptional()
    @IsString()
    @Length(1, 100) // Validate length between 1 and 100 characters for strings
    name?: string;

    
    @IsNumber()
    @Min(0) // Minimum allowed value for calories
    @Max(10000) // Maximum allowed value for calories
    calories?: number;

    @IsOptional()
    @IsNumber()
    @Min(0) // Minimum allowed value for protein
    @Max(1000) // Maximum allowed value for protein
    protein?: number;

    @IsOptional()
    @IsNumber()
    @Min(0) // Minimum allowed value for carbs
    @Max(1000) // Maximum allowed value for carbs
    carbs?: number;

    @IsOptional()
    @IsNumber()
    @Min(0) // Minimum allowed value for fats
    @Max(1000) // Maximum allowed value for fats
    fats?: number;
}
