const base = require("@timely/config/tailwind-preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...base,
  content: ["./bookings/**/*.tsx"],
};
