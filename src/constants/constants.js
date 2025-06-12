export const HTTP_STATUS = Object.freeze({
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

export const VALIDATION_CONSTANTS = Object.freeze({
  MIN_NAME_LENGTH: 3,
  MAX_NAME_LENGTH: 255,
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,
  SALT_ROUNDS: 8,
});

export const url = {
  url: process.env.APP_URL
};
