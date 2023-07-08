type exerciseOutput = {
  numberOfDays: number;
  numberOfTraningDays: number;
  targetValue: number;
  calculatedAverageTime: number;
  targetReached: boolean;
  rating: "1 | 2 | 3";
  ratingExplanation: string;
};

const getRating = (avg: number, target: number): number => {
  if (avg > target) return 3;
  if (avg === target) return 2;
  return 1;
};
const getRatingExp = (rating: number): string => {
  if (rating === 1) return "Did not meet the goal.";
  if (rating === 2) return "Met the goal.";
  if (rating === 3) return "Exceeded the goal.";
};

const calculateExercises = (dailyExercises: number[], target: number) => {
  const total = dailyExercises.reduce((a, total) => (total += a));
  const avg = total / dailyExercises.length;
  const rating = getRating(avg, target);
  const ratingExp = getRatingExp(rating);

  return {
    numberOfDays: dailyExercises.length,
    numberOfTraningDays: dailyExercises.filter((num) => num != 0).length,
    targetValue: target,
    calculatedAverageTime: avg,
    targetReached: avg === target,
    rating: rating,
    ratingExplanation: ratingExp,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
