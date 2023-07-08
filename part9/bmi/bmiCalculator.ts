const BMI_RANGES = [
  { min: 0, max: 16.0, category: "Underweight (Severe thinness)" },
  { min: 16.0, max: 16.9, category: "Underweight (Moderate thinness)" },
  { min: 17.0, max: 18.4, category: "Underweight (Mild thinness)" },
  { min: 18.5, max: 24.9, category: "Normal range" },
  { min: 25, max: 29.9, category: "Overweight (Pre-obese)" },
  { min: 30, max: 34.9, category: "Obese (Class I)" },
  { min: 35, max: 39.9, category: "Obese (Class II)" },
  { min: 40, max: Number.POSITIVE_INFINITY, category: "Obese (Class III)" },
];

const calculateBmi = (height: number, mass: number): string => {
  if (isNaN(height) || isNaN(mass) || height <= 0 || mass <= 0) {
    throw new Error("Invalid arguments.");
  }

  const heightInMeters = height / 100;
  const bmi = mass / (heightInMeters * heightInMeters);

  for (const range of BMI_RANGES) {
    if (bmi >= range.min && bmi <= range.max) {
      return range.category;
    }
  }

  throw new Error("Category not found for BMI value.");
};

console.log(calculateBmi(180, 74));
