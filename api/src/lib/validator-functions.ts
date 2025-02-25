import { body, param } from 'express-validator';

export function validateTaskTitle() {
  return body('title')
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ max: 128 });
}

export function validateTaskDescription() {
  return body('description')
    .notEmpty()
    .isString()
    .trim()
    .escape()
    .isLength({ max: 512 });
}

export function validateTaskUserId() {
  return body('userId').notEmpty().isNumeric();
}

export function validateTaskStatusId() {
  return body('statusId').notEmpty().isNumeric();
}

export function validateIdParam() {
  return param('id').toInt().isInt();
}
