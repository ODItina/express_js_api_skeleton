const isNullOrWhiteSpace  =  require('./isNullOrWhiteSpace');
class BaseResourceParams {
    /**
  * @param {string} id
  * @param {*|null} primaryKey
  * @param {string} property
  * @param {number} pageNumber
  * @param {number} pageSize
  * @param {string} orderBy
  */
	id;
	primaryKey;
	searchParameter;
	pageNumber;
    pageSize;
    orderBy;
    /**
    * @constructor
    * @param {string} id
    * @param {*|null} key
    * @param {string} q
    * @param {number} page
    * @param {number} size
    * @param {string} order
    */
      
      constructor(id, key, search, page, size, order)
      {
          this.id = id;
          this.primaryKey = key;
          this.searchParameter = search;
          this.pageNumber = page || 1;
          this.pageSize = size || 10;
          if(this.pageSize > 200)
            this.pageSize = 200;
          
          if(isNullOrWhiteSpace(order) == true)
            this.orderBy  = "id";
          else
            this.orderBy = order;
  
      }
}

module.exports = BaseResourceParams;