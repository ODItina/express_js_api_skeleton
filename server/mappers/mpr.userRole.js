var mapUserRoleDto = {
    "_id": "ID", //map src.foo to dest.bar
    "roleName": "roleName", //map src.foo to dest.bar
    "isSuperAdmin": "IsSuperAdmin", //map src.foo to dest.bar
    "dateCreated": "DateCreated", //map src.foo to dest.bar
    "description": "Description", //map src.foo to dest.bar
    // "foo": [
    //   {
    //     key: "foo",
    //     transform: function (value) { 
    //       return value + "_foo";
    //     }
    //   },
    //   {
    //     key: "baz",
    //     transform: function (value) {
    //       return value + "_baz";
    //     }
    //   }
    // ],
    "isActive": "IsActive"
  };

  module.exports = {
    mapUserRoleDto: mapUserRoleDto
  }