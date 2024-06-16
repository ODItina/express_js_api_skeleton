  /**
  * @param {string} str
  * @returns {boolean}
  */
module.exports = function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}
