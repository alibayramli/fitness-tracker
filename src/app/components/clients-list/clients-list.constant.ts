export const DISPLAYED_COLUMNS = [
  'id',
  'firstName',
  'lastName',
  // 'email',
  // 'mobile',
  'bmiResult',
  // 'gender',
  // 'package',
  // 'enquiryDate',
  'action',
];

export enum ClientsListSnackBar {
  DELETE_SUCCESS = 'Deleted Successfully',
}

export enum ClientsListDialog {
  TITLE = 'Delete client',
  MESSAGE = 'Are you sure you want to delete?',
  CONFIRM_TEXT = 'Yes',
  CANCEL_TEXT = 'No',
}
