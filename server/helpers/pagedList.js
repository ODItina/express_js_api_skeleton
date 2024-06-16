class PagedList {
    /**
  * @param {number} currentPage
  * @param {number} totalPages
  * @param {number} pageSize
  * @param {number} totalCount
  * @param {number} visiblePages
  * @param {boolean} hasPrevious
  * @param {boolean} hasNext
  */
	currentPage;
	totalPages;
	pageSize;
	totalCount;
  visiblePages;
  hasPrevious;
  hasNext;
	value;
  /**
  * @constructor
  * @param {Array} list
  * @param {number} count
  * @param {number} pageNumber
  * @param {number} pageSize
  */
    constructor(list, count, pageNumber, pageSize)
    {
        if(!!count){
          this.totalCount = count;
        }else{
          this.totalCount = 0;
        }
        this.pageSize = pageSize || 10;
        this.currentPage = pageNumber || 1;
        this.totalPages = Math.ceil(count/pageSize);
        this.value = list || [];
        this.hasPrevious = (this.currentPage > 1);
        this.hasNext = (this.currentPage < this.totalPages);
        this.visiblePages = [];

        if(this.totalPages > 0){
          let pages = []
          for(var i = 0; i < this.totalPages; i++){
            pages.push((i + 1))
          }
          if(this.totalPages > 5) {
              if((this.currentPage + 2) >= this.totalPages)
              {
                  pages = pages.skip(this.totalPages - 5).limit(5);
              }
              else if ((this.currentPage - 2) <= 1)
              {
                  pages = pages.limit(5);
              }
              else
              {
                  pages = pages.skip(this.currentPage - 2).limit(5);
              }
          }
          this.visiblePages = pages;
        }

        

    }
    
}

function skip(c){
  return this.filter((x,i)=>{
  if(i>(c-1)){return true}
  })
}
Array.prototype.skip=skip;
function limit(c){
  return this.filter((x,i)=>{
  if(i<=(c-1)){return true}
  })
}
Array.prototype.limit=limit;

module.exports = PagedList
