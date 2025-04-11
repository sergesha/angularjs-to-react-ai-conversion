/**
 * Checkmark utility - replaces the AngularJS checkmark filter
 * Converts boolean values to unicode checkmark or cross symbol
 */

const checkmark = (input) => {
  return input ? '\u2713' : '\u2718';
};

export default checkmark;