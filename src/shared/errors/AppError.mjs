export class AppError extends Error {
    constructor(statusCode,message){
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
    }
}

export class ValidationError extends AppError{
    constructor(message){
        super(400,  message)
        
    }
}

export class PropertyError extends ValidationError {
    constructor(property){
        super("Нет свойства:" + property)
        this.property = property
    }
}

export class NotFoundError extends AppError {
    constructor(message){
        super(404, message)
    }
}

export class UnauthorizedError extends AppError {
    constructor(message){
        super(401,message)
    }
}

