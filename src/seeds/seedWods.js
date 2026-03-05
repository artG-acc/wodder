require("dotenv").config();

const mongoose = require("mongoose");
const Wod = require("../models/Wod");

const seedWods = [
  {
    tagsOrdered: ["bwpl", "wlL", "card"],
    slots: [
      { key: "bwpl", movement: "pull-up" },
      { key: "wlL", movement: "deadlift" },
      { key: "card", movement: "row" }
    ]
  },
  {
    tagsOrdered: ["bwl", "wlps"],
    slots: [
      { key: "bwl", movement: "air squat" },
      { key: "wlps", movement: "bench press" }
    ]
  },
  {
    tagsOrdered: ["bwps"],
    slots: [
      { key: "bwps", movement: "push-up" }
    ]
  },
  {
    tagsOrdered: ["bwpl", "card"],
    slots: [
      { key: "bwpl", movement: "ring row" },
      { key: "card", movement: "run" }
    ]
  },
  {
    tagsOrdered: ["bwl"],
    slots: [
      { key: "bwl", movement: "walking lunges" }
    ]
  },
  {
    tagsOrdered: ["wlL", "bwps", "card"],
    slots: [
      { key: "wlL", movement: "squat" },
      { key: "bwps", movement: "dip" },
      { key: "card", movement: "row" }
    ]
  }
];

async function seedDatabase() {
  try {

    await mongoose.connect(process.env.DATABASE_URL);

    console.log("MongoDB connected");

    await Wod.deleteMany({});
    console.log("Old WODs deleted");

    await Wod.insertMany(seedWods);
    console.log("Database seeded!");

    await mongoose.disconnect();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDatabase();