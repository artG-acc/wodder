const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },       // bwpl, wlL, card, etc.
    movement: { type: String, required: true },  // pull-up, deadlift, row, etc.
  },
  { _id: false }
);

const wodSchema = new mongoose.Schema(
  {
    // Must match the program template EXACTLY (order matters)
    tagsOrdered: { type: [String], required: true, index: true },

    // Store movements in the same order as tagsOrdered
    slots: { type: [slotSchema], default: [] },

    // anti-repeat bookkeeping
    timesUsed: { type: Number, default: 0 },
    lastUsedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

wodSchema.index({ tagsOrdered: 1 });

module.exports = mongoose.model("Wod", wodSchema);