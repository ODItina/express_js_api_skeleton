const AuditActions = Object.freeze({
    Create: Symbol('Add'),
    CreateMultiple: Symbol('Add Multiple'),
    Update: Symbol('Update'),
    UpdateMultiple: Symbol('Update Multiple'),
    Delete: Symbol('Delete'),
    DeleteMultiple: Symbol('Delete Multiple'),
    SoftDelete: Symbol('Soft Delete'),
});

const AuditActors = Object.freeze({
    User: 0,
    Sustem_Administrator: 1,
    System: 2,
});

class AuditTrailManipulationDto {

    constructor(args)
    {
        this.created_by = args.created_by,
        this.performed_by = args.performed_by
    }

};
class AuditTrailDto {

    constructor(args)
    {
        this.id = args.id;
        this.user_id = args.user_id;
        this.action = args.action;
        this.description = args.description;
        this.date_created = args.date_created;
        this.performed_by = args.performed_by;
        // this.url_home = args.url_home;
    }

};

class AuditTrailCreateDto {

    constructor(args)
    {
        this.user_id = args.user_id;
        this.action = args.action;
        this.description = args.description;
        this.performed_by = args.performed_by;
        // this.url_home = args.url_home;
        
        this.date_created = new Date();
    }

};

module.exports = {
    AuditActions: AuditActions,
    AuditActors: AuditActors,
    AuditTrailManipulationDto: AuditTrailManipulationDto,
    AuditTrailDto: AuditTrailDto,
    AuditTrailCreateDto: AuditTrailCreateDto


}

