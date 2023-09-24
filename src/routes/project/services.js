const Project   = require('../../model/project')
const User      = require('../../model/user')
const Responses = require('./responses')
const env       = require('../../_config/config')
const utils     = require('../../_utils')

const multer = require('multer'); 

const stripe = require('stripe')(env.STRIPE_SECRET_KEY);


const ProjectService = async (reqdata) => {

    reqdata.startDate = new Date(reqdata.startDate).getTime()

    const result = await Project.create({...reqdata})

    if(!result)
    throw {message: Responses.ProductResponse.ERROR}

    console.log('result', result)

    return {
        success : true,
        message : Responses.ProductResponse.CREATED,
        data    : result
    }
}


const UpdateProjectService = async (reqdata) => {

    let updates = {...reqdata}
    if(reqdata.startDate) updates.startDate = new Date(reqdata.startDate)
    delete updates._id

    // Update the product data in the database
    const result = await Project.findByIdAndUpdate(reqdata._id, {...updates}, {new: true})

    if(!result)
        throw {message: Responses.ProductResponse.NOT_UPDATED}

    return {
        success : true,
        message : Responses.ProductResponse.UPDATED,
        data    : result
    }
}


const GetProjectService = async (reqdata) => {


    console.log('reqdata ', reqdata)
    const getProjects = async () => {
        return  await Project.find({...reqdata, delete : false})
    };

    const getUsers = async () => {
        return await User.find({ delete: false });
    };

    const [users, projects] = await Promise.all([getUsers(), getProjects()]);


    console.log('users ', users);
    console.log('projects ', projects);

    let allProjects = [];


    for (const project of projects) {
        const matchingUser = await users.find((user) => project.createdBy.toString() === user._id.toString());
        if (matchingUser) {
            let projectObject = { ...project._doc};
            allProjects.push(projectObject);
        }
    }
    

    if(allProjects.length <= 0)
    throw {message: Responses.ProductResponse.NOT_FOUND}


    return {
        success : true,
        message : Responses.ProductResponse.FOUND,
        data    : allProjects
    }
}


const GetAllProductService = async () => {
    const getProducts = async () => {
        return await Product.find({ delete: false });
    };

    const getUsers = async () => {
        return await User.find({ delete: false });
    };

    const [users, products] = await Promise.all([getUsers(), getProducts()]);

    let allProducts = [];

    for (const product of products) {
        const matchingUser = await users.find((user) => product.createdBy.toString() === user._id.toString());
        if (matchingUser) {
            let productObject = { ...product._doc, storeName: matchingUser.storeName };
            console.log('product', productObject);
            allProducts.push(productObject);
        }
    }

    if (allProducts.length === 0) {
        throw { message: Responses.ProductResponse.NOT_FOUND };
    }

    return {
        success: true,
        message: Responses.ProductResponse.FOUND,
        data: allProducts,
    };
};


const DeleteProductService = async (reqdata) => {

    
    const result = await Product.findByIdAndDelete(reqdata._id);
    console.log(result);

    if(!result)
    throw {message: Responses.ProductResponse.ERROR_DELETE}


    return {
        success : true,
        message : Responses.ProductResponse.DELETE,
        data    : result
    }
}



const UploadService = async ({file, desiredPath, timestamp=true}) => {

    console.log('zee ', file);
    console.log('zee2 ', desiredPath)
    const key = timestamp ? desiredPath+'/'+Date.now() : desiredPath

    const base64Data = file.data_url.split(';base64,').pop(); // extract base64-encoded data from URL

    const buffer = Buffer.from(base64Data, 'base64');

    const params = {
        Bucket        : env.AWS_BUCKET,
        ContentType   : file.mimetype,
        Key           : key,
        Body          : buffer,
        ACL           : 'public-read'
    }

    return await new Promise(resolve => {
        s3.upload(params, (err, data) => {
            let array = data.Location.split('/');

            array.shift();
            array.shift();
            array.shift();

            let url = env.AWS_Url + array.join('/');
            console.log('url', url);
            if(err) resolve({
                success : false,
                message : Responses.UploadImage.ERROR,
                error   : err
            })
            if(data) resolve({
                success : true,
                message : Responses.UploadImage.UPLOADED,
                data    : url
            })
        })
    })

}

module.exports = {
    ProjectService,
    UploadService,
    GetProjectService,
    GetAllProductService,
    UpdateProjectService,
    DeleteProductService
}