/**
 * Checkmark utility - React replacement for the AngularJS checkmark filter
 * Transforms a boolean value to a checkmark (✓) or cross (✘) character
 * 
 * @param {boolean} input - Boolean value to transform
 * @returns {string} Unicode checkmark or cross character
 */
const checkmark = (input) => {
  return input ? '\u2713' : '\u2718'; // ✓ : ✘
};

export default checkmark;
