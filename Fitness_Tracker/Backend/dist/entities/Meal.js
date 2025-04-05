"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
const typeorm_1 = require("typeorm");
const Nutrition_1 = require("./Nutrition");
const User_1 = require("./User");
let Meal = class Meal {
};
exports.Meal = Meal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Meal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Meal.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Meal.prototype, "mealtype", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Meal.prototype, "calories", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Meal.prototype, "Protein", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Meal.prototype, "carbs", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Meal.prototype, "fats", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Meal.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Meal.prototype, "liked", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Meal.prototype, "available", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Nutrition_1.Nutrition, nutrition => nutrition.meals),
    __metadata("design:type", Nutrition_1.Nutrition)
], Meal.prototype, "nutrition", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, users => users.meals, { onDelete: "CASCADE" })
    // @JoinColumn()// Creates the join table for the relationship
    ,
    __metadata("design:type", User_1.User)
], Meal.prototype, "users", void 0);
exports.Meal = Meal = __decorate([
    (0, typeorm_1.Entity)({ name: 'Meal_Ft_Tracker' })
], Meal);
