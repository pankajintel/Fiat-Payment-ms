const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const wrapAsync = require("../controlError/wrapAsync");
const { verifyToken } = require("../config/authentication/authJwt");
const passport = require("passport");
const { upload } = require("../helper/multer");

const { registerUser, loginUser, allUser, currentUser, checkingUserWithEmail, addPicture, resetPassword, newUserForKyc, kycForUserProcess, verifykyc, kycForCompanyProcess, newCompanyForKyc } = require("../controller/User");

require("../config/authentication/google_authentication");


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
 *         - forUser
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
 *           description: user type
 *         forUser:
 *           type: string
 *           description: for individual/company
 *         fullName:
 *           type: string
 *           description: user's nmae
 *         companyName:
 *           type: string
 *           description: user's company name
 *         selectCompany:
 *           type: string
 *           description: selectCompany
 *         emailId:
 *           type: string
 *           description: email id
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


router.post("/register", check("emailId", "Please include a valid email").isEmail(), check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }), wrapAsync(registerUser));



/**
 * @swagger
 * tags:
 *   - name: User API
 *     description: "API of User API"
 * components:
 *   schemas:
 *     loginUser:
 *       type: object
 *       required:
 *         - emailId
 *         - password
 *       properties:
 *         emailId:
 *           type: string
 *           description: email id
 *         password:
 *           type: string
 *           description: password
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *    summary: API to login user
 *    tags:
 *      - User API
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/loginUser'
 *    responses:
 *      200:
 *        description: login has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

router.post("/login", wrapAsync(loginUser));

/**
 * @swagger
 * /api/user/:
 *   get:
 *    summary: API to Fetch all user
 *    tags:
 *      - User API
 *    responses:
 *      200:
 *        description: all user has been display successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

router.get("/", wrapAsync(allUser));


/**
 * @swagger
 * /api/user/currentUser:
 *   get:
 *    summary: API to fetch a user via token
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *    responses:
 *      200:
 *        description: getowner has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

router.get("/currentUser", [verifyToken], wrapAsync(currentUser));


/**
 * @swagger
 * tags:
 *   - name: User API
 *     description: "API of User API"
 * components:
 *   schemas:
 *     emailCheck:
 *       type: object
 *       required:
 *         - emailId
 *       properties:
 *         emailId:
 *           type: string
 *           description: emailId
 */


/**
 * @swagger
 * /api/user/emailCheck:
 *   post:
 *    summary: API to check email
 *    tags:
 *      - User API
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/emailCheck'
 *    responses:
 *      200:
 *        description: email is verification has done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */


//  find user
router.post("/emailCheck", wrapAsync(checkingUserWithEmail));


/**
 * @swagger
 * tags:
 *   - name: User API
 *     description: "API of User API"
 * components:
 *   schemas:
 *     addPicture:
 *       type: object
 *       properties:
 *         image:
 *           type: string
 *           format: binary
 */


/**
 * @swagger
 * /api/user/addPicture:
 *   post:
 *    summary: API to add picture
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/addPicture'
 *    responses:
 *      200:
 *        description: picture upload has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */



// update user model with new profile picture
router.post("/addPicture", [verifyToken], upload.single("image"), wrapAsync(addPicture));



/**
 * @swagger
 * tags:
 *   - name: User API
 *     description: "API of User API"
 * components:
 *   schemas:
 *     resetPassword:
 *       type: object
 *       required:
 *         - emailId
 *         - password
 *       properties:
 *         emailId:
 *           type: string
 *           description: email id
 *         password:
 *           type: string
 *           description: password
 */

/**
 * @swagger
 * /api/user/resetPassword:
 *   post:
 *    summary: API to reset password
 *    tags:
 *      - User API
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/resetPassword'
 *    responses:
 *      200:
 *        description: password reset has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */


// route handling forget passwordd
router.post("/resetPassword", check("emailId", "Please include a valid email").isEmail(), check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }), wrapAsync(resetPassword));


/**
 * @swagger
 * /api/user/kycforuser:
 *   post:
 *    summary: API to kyc for user
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *      - in: query
 *        name: proofOfAddress
 *        type: string
 *      - in: query
 *        name: proofOfIdentity
 *        type: string
 *        required: false 
 *      - in: query
 *        name: passportsizephoto
 *        type: string
 *        required: false 
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/addPicture'
 *    responses:
 *      200:
 *        description: kyc for user has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

//aadhar or pain uploading or say kyc for user.
router.post("/kycforuser", [verifyToken], upload.single("image"), wrapAsync(kycForUserProcess));
//kyc for company.


/**
 * @swagger
 * /api/user/kycforcompany:
 *   post:
 *    summary: API to kyc for company
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *      - in: query
 *        name: proofOfIdentityforcompany
 *        type: string
 *        required: false 
 *      - in: query
 *        name: certification
 *        type: string
 *        required: false 
 *      - in: query
 *        name: moa
 *        type: string
 *        required: false 
 *      - in: query
 *        name: aoa
 *        type: string
 *        required: false 
 *      - in: query
 *        name: boardResolution
 *        type: string
 *        required: false 
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/addPicture'
 *    responses:
 *      200:
 *        description: kyc for company has been done successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */
router.post("/kycforcompany", [verifyToken], upload.single("image"), wrapAsync(kycForCompanyProcess));
// route to find all user who has applied for verification of kyc.



/**
 * @swagger
 * /api/user/newuserforkyc:
 *   get:
 *    summary: API to fetch a new user for kyc
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *    responses:
 *      200:
 *        description: new user for kyc has been display successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

router.get("/newuserforkyc", [verifyToken], wrapAsync(newUserForKyc));



/**
 * @swagger
 * /api/user/newcompanyforkyc:
 *   get:
 *    summary: API to fetch new company for kyc
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *    responses:
 *      200:
 *        description: new company for kyc has been display successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

// route to find all company who has applied for verification of kyc.
router.get("/newcompanyforkyc", [verifyToken], wrapAsync(newCompanyForKyc));


/**
 * @swagger
 * /api/user/verifykyc:
 *   get:
 *    summary: API to fetch verify kyc by aadhar and pan
 *    tags:
 *      - User API
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        schema:
 *          type: string
 *        required: true
 *        description: Authentication token
 *      - in: query
 *        name: id
 *        type: string
 *        required: true
 *      - in: query
 *        name: proofOfAddress
 *        type: string
 *        required: false
 *      - in: query
 *        name: proofOfIdentityforuser
 *        type: string
 *        required: false
 *      - in: query
 *        name: userVerified
 *        type: string
 *        required: false
 *      - in: query
 *        name: proofOfIdentityforCompany
 *        type: string
 *        required: false
 *      - in: query
 *        name: certification
 *        type: string
 *        required: false
 *      - in: query
 *        name: moa
 *        type: string
 *        required: false
 *      - in: query
 *        name: aoa
 *        type: string
 *        required: false
 *      - in: query
 *        name: boardResolution
 *        type: string
 *        required: false
 *      - in: query
 *        name: companyVerified
 *        type: string
 *        required: false
 *    responses:
 *      200:
 *        description: verify kyc by aadhar and pan has been display successfully
 *      404:
 *        description: Server not reachable
 *      500:
 *        description: Internal Server Error
 */

// verifykyc by aadhar and pan
router.get("/verifykyc", [verifyToken], wrapAsync(verifykyc));

// routes for google authentication
router.get("/googleauth", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/googleauth/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect("/");
});

module.exports = router;
