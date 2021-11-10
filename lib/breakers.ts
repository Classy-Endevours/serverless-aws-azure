import CustomError from "../util/customError"

export const createUnAuthorizedError = () => {
    return new CustomError('UnAuthorized', {
        code: 401,
        message: 'You are authorized to access the resource!',
    })
}

export const UnAuthorized = () => {
    throw createUnAuthorizedError()
}
export const TokenExpired = () => {
    throw new CustomError('UnAuthorized', {
        message: 'You are authorized to access the resource!',
        code: 498
    })
}
export const NoRecordFound = () => {
    throw new CustomError('No Record Found', {
        message: 'There is no record present for the request!',
        code: 404
    })
}
export const NoDataFound = () => {
    throw new CustomError('No Data Found', {
        message: 'There is no record present for the request!',
        code: 204
    })
}
export const Forbidden = () => {
    throw new CustomError('Forbidden', {
        message: 'You are forbidden to access the resource!',
        code: 403
    })
}

export const ValidationFailed = () => {
    throw new CustomError('Validation Failed', {
        message: 'Please check your data!',
        code: 403
    })
}
export const BadRequest = (msg?: string) => {
    throw new CustomError('Bad Request', {
        message: msg || 'Please check your data!',
        code: 400
    })
}
export const OnlyJSONValid = () => {
    throw new CustomError('Validation Failed', {
        message: 'Please check you data and content type to JSON!',
        code: 403
    })
}
