// all the main data in one list: muscle groups + each muscle's specific exercises
const exerciseList = [
  {
    muscle: "Chest",
    id: 1,
    exercises: [
      { id: 101, exercise: "Cable Flys" },
      { id: 102, exercise: "Incline Bench Press" },
      { id: 103, exercise: "Cable Crossovers" },
      { id: 104, exercise: "Dumbell Bench Press" },
      { id: 105, exercise: "Dumbell Flys" },
      { id: 106, exercise: "Push Ups" },
      { id: 107, exercise: "Barbell bench press" },
    ],
  },
  {
    muscle: "Back",
    id: 2,
    exercises: [
      { id: 201, exercise: "Pull Ups" },
      { id: 202, exercise: "Bent Over Row" },
      { id: 203, exercise: "Back Extension" },
      { id: 204, exercise: "Deadlift" },
      { id: 205, exercise: "Lateral Pulldown" },
      { id: 206, exercise: "Seated Cable Row" },
      { id: 207, exercise: "Single Arm Dumbell Row" },
      { id: 208, exercise: "Incline Dumbbell Row" },
      { id: 209, exercise: "Chin Ups" },
      { id: 210, exercise: "Face Pulls" },
    ],
  },
  {
    muscle: "Biceps",
    id: 3,
    exercises: [
      { id: 301, exercise: "Hammer Curls" },
      { id: 302, exercise: "Dumbell Bicep Curls" },
      { id: 303, exercise: "Barbell Bicep Curls" },
      { id: 304, exercise: "Cable Curls" },
      { id: 305, exercise: "Machine Bicep Curls" },
      { id: 306, exercise: "Preacher Curls" },
    ],
  },
]

// const muscles = [
//    "Abs",
//    "Biceps",
//    "Back",
//    "Chest",
//    "Glutes",
//    "Hamstrings",
//    "Quads",
//    "Shoulders",
//    "Triceps",
//  ]

export { exerciseList }
