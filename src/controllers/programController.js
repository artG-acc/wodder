const { getWodForDay } = require("../services/programGenerator");

async function showProgramDay(req, res, next) {
  try {
    const dayNumber = Number(req.params.day);

    if (!Number.isFinite(dayNumber) || dayNumber < 1) {
      return res.status(400).send("Day must be a positive number.");
    }

    const result = await getWodForDay(dayNumber);

    if (!result) {
      return res.status(404).send("Workout not found for this program day.");
    }

    res.render("program/day", { result });

  } catch (error) {
    next(error);
  }
}

module.exports = { showProgramDay };