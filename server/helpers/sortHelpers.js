  /**
  * @param {string} str
  * @returns {number}
  */
const sortDirection = function sortDirectionResolver(str){
    let direction = 1;
    if(str.includes("desc") || str.includes("Desc"))
        direction = -1;
    return direction;
}

  /**
  * @param {string} str
  * @returns {string}
  */
const sortParam = function sortParamResolver(str){
    let sortString = str.replace(/desc/gi, "")
    return sortString;
}

module.exports = {
    sortParam: sortParam,
    sortDirection: sortDirection
}
