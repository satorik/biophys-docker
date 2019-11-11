class ValidationError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'ValidationError'
    this.code = code
    this.message = message
  }
}
class PermissionError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'PermissionError'
    this.code = code
    this.message = message
  }
}
class DatabaseError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'DatabaseError'
    this.code = code
    this.message = message
  }
}

class UploadError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'UploadError'
    this.code = code
    this.message = message
  }
}

export {
  ValidationError,
  PermissionError,
  DatabaseError,
  UploadError
}