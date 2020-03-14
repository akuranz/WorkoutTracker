const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        type: {
          type: String
        },
        name: {
          type: String
        },
        duration: {
          type: Number
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  {
    toObject: {
      virtuals: true
    },
    toJSON: {
      virtuals: true
    }
  }
);

// WorkoutSchema.set("toObject", { virtuals: true });
// WorkoutSchema.set("toJSON", { virtuals: true });

WorkoutSchema.virtual("totalDuration").get(function() {
  return this.exercises.reduce((total, current) => {
    return total + current.duration;
  }, 0);
});

WorkoutSchema.virtual("number_of_exercises").get(function() {
  return this.exercises.length;
});

const Workouts = mongoose.model("Workout", WorkoutSchema);

module.exports = Workouts;
