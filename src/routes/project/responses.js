const ProductResponse = {
    CREATED             : 'product successfully created',
    ERROR               : 'error creating product',
    ALREADYEXISTS       : 'product already exists',

    UPDATED : 'product succesfully updated',
    NOT_UPDATED : 'unable to update product',

    FOUND: 'product succesfull found',
    NOT_FOUND: 'unable to find product',


    DELETE : 'product succesfully deleted',
    ERROR_DELETE : 'error deleting this product'
}


const UploadImage = {
    FILE_REQ : 'file required',
    ERROR    : 'error uploading image',
    UPLOADED : 'image successfully uploaded',
}

module.exports = {
    ProductResponse,
    UploadImage
}