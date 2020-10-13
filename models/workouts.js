const { json } = require("body-parser");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: { type: Date, default: () => new Date() },
  exercises: [
    {
      type: { type: String },
      name: { type: String },
      duration: { type: Number },
      weight: { type: Number },
      reps: { type: Number },
      sets: { type: Number },
    },
  ],
},{toJSON:{ virtuals: true }});

workoutSchema.virtual("totalDuration").get(function () {
  let totalDuration = 0;
  for (const item of this.exercises) {
    totalDuration += item.duration;
  }
  return totalDuration;
});
const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
