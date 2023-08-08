
/**
 * @swagger
 * tags:
 *   - name: User API
 *     description: "API of User API"
 * components:
 *   schemas:
 *     registerUser:
 *       type: object
 *       required:
 *         - userType
 *         - forAnyTypeOfUser
 *         - fullName
 *         - companyName
 *         - selectCompany
 *         - emailId
 *         - password
 *         - mobileNo
 *         - country
 *         - companysize
 *       properties:
 *         userType:
 *           type: string
 *           description: user or company
 *         forAnyTypeOfUser:
 *           type: string
 *           description: for projetOwner/trader
 *         fullName:
 *           type: string
 *           description: user's name
 *         googleId:
 *           type: string
 *           description: google id
 *         companyName:
 *           type: string
 *           description: user's company name
 *         selectCompany:
 *           type: string
 *           description: selectCompany
 *         profilePicture:
 *           type: string
 *           description: profile picture
 *         emailId:
 *           type: string
 *           description: email id
 *         isVerified:
 *           type:boolean
 *           description: is verified
 *         password:
 *           type: string
 *           description: password
 *         mobileNo:
 *           type: string
 *           description: mobile number
 *         country:
 *           type: string
 *           description: country
 *         companysize:
 *           type: string
 *           description: company size
 *
 */


/**
 * @swagger
 * /api/user/register:
 *   post:
 *    summary: API to register user
 *    tags:
 *      - User API
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/registerUser'
 *    responses:
 *      200:
 *        description: user registration has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:[id]
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The book title
 *         author:
 *           type: string
 *           description: The book author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */


// components: {
//     schemas:  {
//         Book:  {
//             type: 'object',
//             required: ['id'],
//             properties: {
//       author: {
//                   type: 'string',
//                   description:'The author of the book'
//                 },
//                 price:{
//                     type: 'string',
//                     description: 'The price of the book'
//                 },
//                 id: {
//                     type: 'string',
//                     description: 'auto-generated id'
//                 }
//             }
//         }
//     }
//  }

// *      - in: query
//  *        name: proofOfIdentityforcompany
//  *        type: string
//  *        required: false 
//  *      - in: query
//  *        name: certification
//  *        type: string
//  *        required: false 
//  *      - in: query
//  *        name: moa
//  *        type: string
//  *        required: false 
//  *      - in: query
//  *        name: aoa
//  *        type: string
//  *        required: false 
//  *      - in: query
//  *        name: boardResolution
//  *        type: string
//  *        required: false 