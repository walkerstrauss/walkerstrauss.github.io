/*
 * Lines for the clock's display. The site does not call a language model, so
 * these are written by hand to the clock's own prompt (savoring.cpp): one
 * savoring technique and one sustainable behavior drawn at random, the
 * technique never named, sustainability never mentioned, warm and quietly
 * encouraging, 150 characters at most.
 *
 * Each reading has the fields the sketch keeps from the Google Maps Weather
 * API's currentConditions reply (weather.cpp): weatherCondition.type and
 * .description.text, temperature.degrees, feelsLikeTemperature.degrees,
 * relativeHumidity and windChill.degrees. Degrees are Fahrenheit: the request
 * asks for imperial units. Types and descriptions are the API's own.
 */
const r = (type, text, temperature, feelsLike, relativeHumidity) => ({ type, text, temperature, feelsLike, relativeHumidity, windChill: feelsLike });

export const LINES = {
  sunny: [
    { reading: r('CLEAR', 'Sunny', 68, 67, 45), technique: 'Counting Blessings', behavior: 'Frugal behavior', line: 'Sun on the sill, free and warm. Open the curtains, switch off the lamp, and let the afternoon light the room for you.' },
    { reading: r('MOSTLY_CLEAR', 'Mostly sunny', 74, 75, 52), technique: 'Sharing with others', behavior: 'Pro ecological behavior', line: 'Seventy-four and bright. Hang the washing outside and call someone over to feel how quickly the sun does the work.' },
    { reading: r('CLEAR', 'Clear', 58, 56, 40), technique: 'Temporal Awareness', behavior: 'Frugal behavior', line: 'This clear light won’t last past supper. Walk the errand instead of driving it, and take the long way home.' },
  ],
  cloudy: [
    { reading: r('CLOUDY', 'Cloudy', 52, 50, 71), technique: 'Comparing', behavior: 'Frugal behavior', line: 'Softer than last week’s glare. A grey sky is kind to walkers: leave the car and let the cool air carry you there.' },
    { reading: r('MOSTLY_CLOUDY', 'Mostly cloudy', 61, 60, 66), technique: 'Sensory Perceptual Sharpening', behavior: 'Pro ecological behavior', line: 'Watch the clouds move like slow water. Crack a window, let the mild air in, and give the fan a rest.' },
    { reading: r('PARTLY_CLOUDY', 'Partly cloudy', 66, 66, 58), technique: 'Memory Building', behavior: 'Altruistic behavior', line: 'Sun and cloud are taking turns. Remember this easy light, and carry a neighbor’s groceries while it lasts.' },
  ],
  windy: [
    { reading: r('WINDY', 'Windy', 49, 43, 55), technique: 'Behavioral Expression', behavior: 'Pro ecological behavior', line: 'Lean into the wind and grin. It will dry a line of laundry before lunch, no machine required.' },
    { reading: r('WINDY', 'Windy', 53, 48, 49), technique: 'Absorption', behavior: 'Frugal behavior', line: 'Listen to the wind work through the trees. Pull on the old sweater you love and let the thermostat stay where it is.' },
    { reading: r('WIND_AND_RAIN', 'Wind and rain', 46, 40, 82), technique: 'Counting Blessings', behavior: 'Altruistic behavior', line: 'Wind and rain at the glass, and you are dry. Look in on the neighbor whose porch light is out.' },
  ],
  rainy: [
    { reading: r('LIGHT_RAIN', 'Light rain', 54, 51, 88), technique: 'Sensory Perceptual Sharpening', behavior: 'Frugal behavior', line: 'Listen to the rain tap the roof. Set a pot outside to catch some for the houseplants, and breathe in the wet earth.' },
    { reading: r('RAIN_SHOWERS', 'Rain showers', 57, 55, 90), technique: 'Self Congratulation', behavior: 'Frugal behavior', line: 'You walked out into the showers anyway. Hang your coat to drip dry and be a little proud of your damp, good legs.' },
    { reading: r('RAIN', 'Rain', 50, 46, 93), technique: 'Sharing with others', behavior: 'Equitable behavior', line: 'Rain evens the street: everyone hurries the same. Share your umbrella to the corner with whoever is beside you.' },
  ],
  snowy: [
    { reading: r('LIGHT_SNOW', 'Light snow', 28, 21, 80), technique: 'Temporal Awareness', behavior: 'Frugal behavior', line: 'The snow is falling slowly and will not stay. Wrap up in a blanket by the window before reaching for the heat.' },
    { reading: r('SNOW', 'Snow', 24, 15, 84), technique: 'Absorption', behavior: 'Altruistic behavior', line: 'Lose yourself in the scrape of the shovel, then keep going past your own walk and clear the neighbor’s steps too.' },
    { reading: r('SNOW_SHOWERS', 'Snow showers', 31, 25, 77), technique: 'Behavioral Expression', behavior: 'Pro ecological behavior', line: 'First flakes: step out, arms wide, and smile. Leave the car asleep under its white blanket today.' },
  ],
  hail: [
    { reading: r('HAIL', 'Hail', 41, 36, 76), technique: 'Counting Blessings', behavior: 'Pro ecological behavior', line: 'Hail drums the roof and you are warm inside. Draw the curtains to keep that warmth in, and listen.' },
    { reading: r('HAIL_SHOWERS', 'Hail showers', 44, 39, 72), technique: 'Comparing', behavior: 'Altruistic behavior', line: 'A few loud minutes, then quiet, gentler than it sounded. See whether the neighbor’s seedlings made it through.' },
    { reading: r('HAIL', 'Hail', 39, 33, 79), technique: 'Sensory Perceptual Sharpening', behavior: 'Frugal behavior', line: 'Hear the ice rattle and bounce. Stay put, mend the thing you meant to replace, and let the storm pass.' },
  ],
  thunder: [
    { reading: r('THUNDERSTORM', 'Thunderstorm', 72, 74, 85), technique: 'Sensory Perceptual Sharpening', behavior: 'Pro ecological behavior', line: 'Count the seconds between flash and rumble. Unplug what you aren’t using and let the storm light the room.' },
    { reading: r('THUNDERSHOWER', 'Thundershower', 70, 71, 88), technique: 'Sharing with others', behavior: 'Altruistic behavior', line: 'Thunder is better with company. Call someone to the window, and offer a dry seat to whoever is caught out.' },
    { reading: r('LIGHT_THUNDERSTORM_RAIN', 'Light thunderstorm rain', 68, 68, 83), technique: 'Temporal Awareness', behavior: 'Frugal behavior', line: 'The storm will be gone within the hour. Lights off, one candle lit, and watch it while it is here.' },
  ],
};

export const entryFor = (weather, n = 0) => (weather && LINES[weather] ? LINES[weather][((n % 3) + 3) % 3] : null);
export const lineFor = (weather, n = 0) => entryFor(weather, n)?.line || '';
