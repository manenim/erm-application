export enum PermissionEnum {
    // HR Module
    VIEW_EMPLOYEE_RECORDS = 'view_employee_records',
    EDIT_EMPLOYEE_RECORDS = 'edit_employee_records',
    DELETE_EMPLOYEE_RECORDS = 'delete_employee_records',
    CREATE_EMPLOYEE_RECORDS = 'create_employee_records',

    // Finance Module
    VIEW_FINANCIAL_REPORTS = 'view_financial_reports',
    EDIT_FINANCIAL_REPORTS = 'edit_financial_reports',
    DELETE_FINANCIAL_REPORTS = 'delete_financial_reports',
    CREATE_FINANCIAL_REPORTS = 'create_financial_reports',

    // Inventory Module
    VIEW_INVENTORY = 'view_inventory',
    EDIT_INVENTORY = 'edit_inventory',
    DELETE_INVENTORY = 'delete_inventory',
    CREATE_INVENTORY = 'create_inventory',

    // General Permissions
    ACCESS_DASHBOARD = 'access_dashboard',
    MANAGE_USERS = 'manage_users',
    MANAGE_ROLES = 'manage_roles',
    MANAGE_PERMISSIONS = 'manage_permissions',
}