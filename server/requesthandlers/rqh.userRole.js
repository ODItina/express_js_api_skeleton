// require('typescript-require');
const BaseResourceParams  = require("../helpers/baseResourceParams");
const PagedList = require("../helpers/pagedList.js");
const userRoleRepo = require("../models/userRole.js"),
      isNullOrWhiteSpace  =  require('../helpers/isNullOrWhiteSpace'),
      {sortDirection, sortParam} = require('../helpers/sortHelpers'),
      {mapUserRoleDto} = require('../mappers/mpr.userRole'),
      objectMapper = require('object-mapper'),
      errs = require('debug')('app:rqh'); //debugger

exports.listUserRoles = async (args, next) => {
    errs(`List userRoles function...`)
    try {
        let data = []
        //Enabling the lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO.
        const result  =  await userRoleRepo.userRole.find().lean().exec();
        if(!!result) {
         result.map(async (p, index) => {
            data.push(objectMapper.merge(p, mapUserRoleDto));
          });
        }
        return data;
      } catch (err) {
        errs(`Error - List userRoles function; ${err}`)
        err.stack;
      }
};

exports.pagedListUserRoles = async (args, next) => {
    errs(`PagedList userRoles function...`)
    try {
        let data = [];
        const brParams = new BaseResourceParams(null, null, args.searchParameter, args.pageNumber, args.pageSize, args.orderBy);
        let queryable = userRoleRepo.userRole.find();
        if (isNullOrWhiteSpace(brParams.searchParameter) == false) 
        {
            queryable = queryable.find({name: { $regex: '.*' + brParams.searchParameter + '.*' } })
        }
        const skipSize = (brParams.pageNumber - 1) * brParams.pageSize;
        let pagedQueryable = queryable
        .skip(skipSize)
        .limit(brParams.pageSize)

        const countQueryable = userRoleRepo.userRole.find().merge(pagedQueryable);
        const count = await countQueryable.count().lean();

        const sortObj = {[sortParam(brParams.orderBy)]:sortDirection(brParams.orderBy)}
  
        var result = await pagedQueryable.sort(sortObj).lean().exec();
        // console.log(count);
        if(!!result) {
         result.map(async (p, index) => {
            data.push(objectMapper.merge(p, mapUserRoleDto));
          });
        }

        const pgList = new PagedList(
          data, 
          count,
          brParams.pageNumber,
          brParams.pageSize);


        return pgList;
      } catch (err) {
        errs(`Error - PagedList userRoles function; ${err}`)
        err.stack;
      }
};

exports.detailsUserRoles = async (args, next) => {
    errs(`Details userRoles function...`)
    try {
        let data = null;
        if (isNullOrWhiteSpace(args.id) == true) 
        {
            return data;
        }
        const result  =  await userRoleRepo.userRole.findOne({_id: args.id}).lean().exec();
        // console.log(count);
        if(!!result) {
          data = objectMapper.merge(result, mapUserRoleDto);
          
        }
        return data;
      } catch (err) {
        errs(`Error - Details userRoles function; ${err}`)
        err.stack;
      }
};
