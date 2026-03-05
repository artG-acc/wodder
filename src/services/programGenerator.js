const Wod = require("../models/Wod");
const { getTemplateForDay } = require("./programTemplate");

async function getWodForDay(dayNumber) {
  const template = getTemplateForDay(dayNumber);

  // Off day
  if (template.length === 1 && template[0] === "off") {
    return { dayNumber, type: "off", template };
  }

  // Find exact tag order match. Prefer least recently used / least used.
  const wod = await Wod.findOne({ tagsOrdered: template }).sort({
    lastUsedAt: 1,
    timesUsed: 1,
  });

  if (!wod) {
    return {
      dayNumber,
      type: "missing",
      template,
      message: "No WOD found in DB for this template yet.",
    };
  }

  // Update usage tracking (optional)
  wod.timesUsed += 1;
  wod.lastUsedAt = new Date();
  await wod.save();

  return { dayNumber, type: "wod", template, wod };
}

module.exports = { getWodForDay };