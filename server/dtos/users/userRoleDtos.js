
class UserRoleDto {

    id;
    roleName;
    description;
    constructor(args)
    {
        this.id = args.id;
        this.roleName = args.roleName;
        this.description = args.description;
        // this.url_home = args.url_home;
    }

};

class UserRoleEntryDto {

    roleName;
    description;
    constructor(args)
    {
        this.roleName = args.roleName;
        this.description = args.description;
        // this.url_home = args.url_home;
    }

};

class UserRoleCreateDto extends UserRoleEntryDto {



};
class UserRoleUpdateDto extends UserRoleEntryDto {

    constructor(args)
    {
        this.id = args.id;
    }


};
// module.exports.UserRoleDto = UserRoleDto;
// module.exports.UserRoleCreateDto = UserRoleDto;
// module.exports.UserRoleUpdateDto = UserRoleDto;
module.exports = {
    UserRoleDto: UserRoleDto,
    UserRoleCreateDto: UserRoleCreateDto,
    UserRoleUpdateDto: UserRoleUpdateDto,
}

// console.log('Testing ES6 concat: ${UserRoleDto}');