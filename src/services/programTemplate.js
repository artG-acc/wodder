const PROGRAM_21 = [
  ["bwpl", "wlL", "card"], // 1
  ["bwl", "wlps"],         // 2
  ["bwps"],                // 3
  ["bwpl", "card"],        // 4
  ["bwl"],                 // 5
  ["off"],                 // 6
  ["off"],                 // 7
  ["wlL", "bwps", "card"], // 8
  ["wlps", "bwpl"],        // 9
  ["wlpl"],                // 10
  ["wlps", "card"],        // 11
  ["wlL"],                 // 12
  ["off"],                 // 13
  ["off"],                 // 14
  ["card", "wlL", "bwpl"], // 15
  ["card", "bwps"],        // 16
  ["card"],                // 17
  ["card", "wlps"],        // 18
  ["card"],                // 19
  ["off"],                 // 20
  ["off"],                 // 21
];

function getTemplateForDay(dayNumber) {
  const idx = (dayNumber - 1) % PROGRAM_21.length;
  return PROGRAM_21[idx];
}

module.exports = { PROGRAM_21, getTemplateForDay };