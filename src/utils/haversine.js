/**
 * Calculates the great-circle distance between two coordinates
 * using the Haversine formula.
 *
 * @param {number} startLatitude
 * @param {number} startLongitude
 * @param {number} endLatitude
 * @param {number} endLongitude
 * @returns {number} Distance in kilometers
 */
module.exports = function calculateDistanceInKilometers(
  startLatitude,
  startLongitude,
  endLatitude,
  endLongitude
) {
  const earthRadiusInKilometers = 6371;

  const latitudeDifferenceInRadians =
    (endLatitude - startLatitude) * (Math.PI / 180);

  const longitudeDifferenceInRadians =
    (endLongitude - startLongitude) * (Math.PI / 180);

  const startLatitudeInRadians = startLatitude * (Math.PI / 180);
  const endLatitudeInRadians = endLatitude * (Math.PI / 180);

  const haversineValue =
    Math.sin(latitudeDifferenceInRadians / 2) ** 2 +
    Math.cos(startLatitudeInRadians) *
      Math.cos(endLatitudeInRadians) *
      Math.sin(longitudeDifferenceInRadians / 2) ** 2;

  const centralAngle =
    2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));

  return earthRadiusInKilometers * centralAngle;
};
