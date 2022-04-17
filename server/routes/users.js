var express = require( 'express' );
var router = express.Router();
var { User } = require( '../models/User' );
var { Product } = require( '../models/Products' );
const { ObjectId } = require( 'mongodb' );
const { Category } = require( '../models/Category' );
const { SubCategory } = require( '../models/SubCategory' );
const { Cart } = require( '../models/Cart' )
const cloud = require( '../config/Cloud' );
const upload = require( "../config/multer" );
const { Address } = require( '../models/Address' );
const { Order } = require( '../models/Order' )
const serviceSID = "VA5de00231b8644ad47a661eec84e02ce2";
const accountnSID = "AC125180260e508b024bd8826a641af775";
const authToken = "6b6767f0a04fcde983b02b5ea8e1fcb4";
const referralCodeGenerator = require( 'referral-code-generator' );
const { Coupon } = require( '../models/Coupons' );
const client = require( "twilio" )( accountnSID, authToken )
const razorpay = require( "razorpay" );
const crypto = require( "crypto" );




/* GET userhome listing. */
router.get( '/', function ( req, res, next )
{
  res.send( 'I am a USER' );
} );


/* POST register User. */
router.post( "/register", async ( req, res ) =>
{
  try
  {

    const user2 = await User.findOne( { userName: req.body.userName } );
    const user1 = await User.findOne( { mobileNumber: req.body.mobileNumber } );
    const user = await User.findOne( { email: req.body.email } );
    if ( user )
      return res.status( 409 ).send( { message: "User with given Email already exist!" } ).end();
    if ( user1 )
      return res.status( 409 ).send( { message: "User with given Mobile Number already exist!" } ).end();
    if ( user2 )
      return res.status( 409 ).send( { message: "User with given Username already exist!" } ).end();



    if ( req.body.referralcode )
    {

      let referraldata = await User.findOne( { referralcode: req.body.referralcode } );

      if ( !referraldata )
        return res.status( 409 ).send( { message: "Invaild Referral Code !" } ).end();
      if ( referraldata )
      {

        const wallet1 = 25;
        const referralCode = referralCodeGenerator.alphaNumeric( 'uppercase', 5, 5 );
        const storeUSERData = await new User( {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          userName: req.body.userName,
          email: req.body.email,
          mobileNumber: req.body.mobileNumber,
          referralcode: referralCode,
          wallet: wallet1,
        } ).save();

        const incrementwallet = referraldata.wallet + 100;
        const updatewallet = await User.updateOne( { _id: ObjectId( referraldata._id ) }, { $set: { wallet: incrementwallet } } );

        return res.status( 201 ).send( { message: "You Successfully Created Bro-Cart Account" } ).end();
      };
    } else
    {
      const referralCode = referralCodeGenerator.alphaNumeric( 'uppercase', 5, 5 );
      const wallet = 0;
      const storeUSERData = await new User( {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        mobileNumber: req.body.mobileNumber,
        referralcode: referralCode,
        wallet: wallet,
      } ).save();

      return res.status( 201 ).send( { message: "You Successfully Created Bro-Cart Account" } ).end();
    }

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Fill All Fields....." } ).end();

  }
} );


/* POST sending otp. */
router.post( '/otpsending', async ( req, res ) =>
{
  try
  {

    const user = await User.findOne( { mobileNumber: req.body.mob.value } );

    const Status = user.status;

    if ( !user )
      return res.status( 409 ).send( { message: "Please Enter a valid Mobile Number!" } ).end();
    if ( Status === "false" )
      return res.status( 409 ).send( { message: "You are Blocked By Admin!" } ).end();

    const OTP = await client.verify.services( serviceSID ).verifications.create( { to: `+91${ req.body.mob.value }`, channel: "sms" } )
      .then( ( otp ) =>
      {

        res.status( 201 ).send( { message: "Otp sent successfully to " } ).end();

      } )
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Enter Valid Mobile Number !" } ).end();

  }

} );


/* POST Verfication of otp. */
router.post( '/otpverification', async ( req, res ) =>
{
  try
  {


    const OTP_Verification = await client.verify.services( serviceSID ).verificationChecks.create( { to: `+91${ req.body.mob.value }`, code: req.body.otp.value7 } )
      .then( async ( check ) =>
      {

        if ( check.valid === true )
        {

          const user = await User.findOne( { mobileNumber: req.body.mob.value } );
          const userid = user._id;
          const usertoken = user.generateAuthToken();
          if ( usertoken )
          {

          }
          const check = 123;
          res.status( 201 ).send( { data: { usertoken, userid, check }, message: "You Successfully Verified ! " } ).end();
        } else
        {

          res.status( 409 ).send( { message: "Invalid OTP! " } ).end();
        }
      } );
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Invalid Otp....!" } ).end();

  }
} );


/* GET Product Data. */
router.get( "/fetchproductsdata", async ( req, res ) =>
{
  try
  {

    const products = await Product.find( {} );

    res.status( 201 ).send( { data: products, message: "Successfully Fetched Bro-Cart Products_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );


/* GET coupon Data. */
router.get( "/coupondata", async ( req, res ) =>
{
  try
  {

    const coupons = await Coupon.find( {} );
    res.status( 201 ).send( { data: { coupons }, message: "Successfully Fetched Bro-Cart Coupon_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );



/* GET Product Data. */
router.get( "/searchproductsdata/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id.trim();

    const products = await Product.find( { $or: [ { productname: { $regex: id, $options: "i" } } ] } );

    res.status( 201 ).send( { data: { products }, message: "Successfully Fetched Bro-Cart Products_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

/* GET Product Data. */
router.post( "/slidefilterproductsdata", async ( req, res ) =>
{
  try
  {


    const min = req.body.minfilter;
    const max = req.body.maxfilter;
    const products = await Product.find( { price: { $gte: min, $lte: max } } );

    res.status( 201 ).send( { data: { products }, message: "Successfully Fetched Bro-Cart Products_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );


/* GET product data getting. */
router.get( "/productone/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    const product = await Product.findOne( { _id: ObjectId( id ) } );

    res.status( 201 ).send( { data: { product }, message: "Successfully Fetched Bro-Cart Product_Data" } );

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );


/* GET product data getting. */
router.get( "/fectchfeaturedpro", async ( req, res ) =>
{
  try
  {

    const product = await Product.find( {} ).limit( 3 );

    res.status( 201 ).send( { data: { product }, message: "Successfully Fetched Bro-Cart Product_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );


/* GET category data getting. */
router.get( "/categorycollect", async ( req, res ) =>
{
  try
  {

    const Parent = await Category.find( {} );

    res.status( 201 ).send( { data: { Parent }, message: "Successfully Fetched Bro-Cart Category_Data" } );


  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );


/* GET category Data. */
router.get( "/fetchcategorydata", async ( req, res, next ) =>
{

  try
  {

    const mainCategory = await Category.find( {} );
    mainCategory ? console.log( 'Main Category Available' ) : console.log( 'Main Category not  Available' );

    const subCategory = await SubCategory.find( {} );
    subCategory ? console.log( 'Sub-Category Available' ) : console.log( 'Sub-Category not  Available' );

    res.status( 201 ).send( { data: { mainCategory, subCategory }, message: "You Successfully Data Fetched ! " } ).end();;

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Internel Error" } );
  }
} )


/* POST cart User. */
router.post( "/addtocart/:id", async ( req, res ) =>
{
  try
  {


    const id = req.params.id;
    const { useriid, quntity, PROTotal, Oneprice } = req.body;

    const cartalready = await Cart.findOne( { productId: id } );

    if ( !cartalready )
    {

      const productImage = await Product.findOne( { _id: ObjectId( id ) } );

      const img = productImage.imgFive[ 0 ].url;
      const newcart = await new Cart( {
        userId: useriid,
        productId: id,
        quantity: quntity,
        proTotal: PROTotal,
        mrp: Oneprice,
        imgCart: img,
      } ).save();

      res.status( 200 ).send( { message: "Product Added to Cart Successfully....." } );
    } else
    {
      const productfinding = await Cart.findOne( { userId: useriid, productId: id } );
      const proid = productfinding._id;
      const updatequantity = await Cart.updateOne( { _id: ObjectId( proid ) }, { $set: { quantity: quntity, proTotal: PROTotal } } );
      res.status( 200 ).send( { message: "Quantity Updated!" } )
    }

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Fill All Fields....." } ).end();

  }
} );


/* GET cart Data. */
router.get( "/fetchcartdata/:id", async ( req, res, next ) =>
{
  try
  {

    const id = req.params.id;

    const cartuser = await Cart.find( { userId: id } );

    res.status( 201 ).send( { data: { cartuser }, message: "You Successfully Data Fetched ! " } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Internel Error" } );
  }
} )


/* POST cart quntity increment. */
router.post( "/incrementQuantity", async ( req, res ) =>
{
  try
  {

    const { proid, useid } = req.body;

    const productfinding = await Cart.findOne( { userId: useid, productId: proid } );
    const ogpro = await Product.findOne( { _id: ObjectId( proid ) } );



    const onePrice = ogpro.price;
    const onestock = ogpro.stock;
    const max = productfinding.quantity;

    if ( onestock > max )
    {

      const i = productfinding.proTotal;

      const PROTotal = i + onePrice;

      const proiid = productfinding._id;
      const q = productfinding.quantity;
      const QUANtity = q + 1;
      const updatequantity = await Cart.updateOne( { _id: ObjectId( proiid ) }, { $set: { quantity: QUANtity, proTotal: PROTotal } } );
      res.status( 200 ).send( { message: "Quantity Updated!" } );
    }
    else
    {
      res.status( 200 ).send( { message: "Maximum Stock reached!" } );
    }

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Fill All Fields....." } ).end();

  }
} );


/* POST cart quntity decrement. */
router.post( "/decrementQuantity", async ( req, res ) =>
{
  try
  {

    const { proid, useid } = req.body;

    const productfinding = await Cart.findOne( { userId: useid, productId: proid } );
    const ogpro = await Product.findOne( { _id: ObjectId( proid ) } );


    const onePrice = ogpro.price;
    const onestock = ogpro.stock;
    const minus = productfinding.quantity;


    if ( minus > 1 )
    {

      const i = productfinding.proTotal;
      const PROTotal = i - onePrice;

      const proiid = productfinding._id;
      const q = productfinding.quantity;
      const QUANtity = q - 1;
      const updatequantity = await Cart.updateOne( { _id: ObjectId( proiid ) }, { $set: { quantity: QUANtity, proTotal: PROTotal } } );
      res.status( 200 ).send( { message: "Quantity Updated!" } );
    } else
    {
      res.status( 200 ).send( { message: "Purchase minimum 1 Quantity!" } );
    }

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Fill All Fields....." } ).end();

  }
} );


/* DELETE cart item. */
router.post( "/removecartitem", async ( req, res ) =>
{
  try
  {


    const { proid, useid } = req.body;

    const deleteitem = await Cart.deleteOne( { useId: useid, productId: proid } );
    res.status( 201 ).send( { message: "Successfully removed cart item" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
  }
} );


/* GET category Data. */
router.get( "/cartcount/:id", async ( req, res, next ) =>
{
  try
  {

    const id = req.params.id;

    const cartuser = await Cart.find( { userId: id } );
    const ount = cartuser.length;

    res.status( 201 ).send( { data: { ount }, message: "You Successfully count Fetched ! " } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Internel Error" } );
  }
} )


/* POST new Address. */
router.post( "/newaddress", async ( req, res ) =>
{
  try
  {

    const storeuserAddressdata = await new Address( req.body ).save();

    res.status( 200 ).send( { message: "You Successfully Added New Address" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Fill All Fields....." } ).end();

  }
} );

/* GET Address Data. */
router.get( "/getalladdress/:id", async ( req, res, next ) =>
{
  try
  {

    const id = req.params.id;

    const gotaddress = await Address.find( { userId: id } );

    res.status( 201 ).send( { data: { gotaddress }, message: "You Successfully address Fetched ! " } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Internel Error" } );
  }
} )


/* GET Address Data. */
router.get( "/fetchaddressdata/:iid", async ( req, res, next ) =>
{
  try
  {

    const id = req.params.iid;

    const gotaddress = await Address.findOne( { _id: ObjectId( id ) } );

    res.status( 201 ).send( { data: { gotaddress }, message: "You Successfully address Fetched ! " } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Internel Error" } );
  }
} )


/* POST new Order. */
router.post( "/neworder", async ( req, res ) =>
{
  try
  {

    const { userid, iid, GrandTotal, paymentoption, } = req.body;
    const cartitems = await Cart.find( { userId: userid } );
    const cartItems = Object.values( cartitems );
    const addressget = await Address.find( { _id: ObjectId( iid ) } );

    const product = [];

    cartItems.forEach( ( cartItem ) =>
    {
      product.push( {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        proTotal: cartItem.proTotal,
        mrp: cartItem.mrp,
        imgCart: cartItem.imgCart,
      } );
    } );

    const NewOrder = await new Order( {
      userid: userid,
      addressid: addressget,
      products: product,
      grandtotal: GrandTotal,
      statusOrder: "Placed",
      deliveredDate: null,
      paymentmethod: paymentoption,
    } ).save();

    const deleteitems = await Cart.deleteMany( { useId: userid } );
    product.map( async ( pro ) =>
    {

      const productStock = await Product.findOne( { _id: ObjectId( pro.productId ) } );
      const stockdecrese = productStock.stock;
      const quantitydecrese = pro.quantity;
      const exatdecreaasestock = stockdecrese - quantitydecrese;
      const decreasePro = await Product.updateOne( { _id: ObjectId( productStock._id ) }, { $set: { stock: exatdecreaasestock } } );

    } );

    res.status( 200 ).send( { message: " New Order Placed" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Fill All Fields....." } ).end();

  }
} );


/* POST new Paypal Order. */
router.post( "/neworderPaypal", async ( req, res ) =>
{
  try
  {

    const { userid, iid, GrandTotal, paymentoption, } = req.body;
    const cartitems = await Cart.find( { userId: userid } );
    const cartItems = Object.values( cartitems );
    const addressget = await Address.find( { _id: ObjectId( iid ) } );

    const product = [];

    cartItems.forEach( ( cartItem ) =>
    {
      product.push( {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        proTotal: cartItem.proTotal,
        mrp: cartItem.mrp,
        imgCart: cartItem.imgCart,
      } );
    } );

    const NewOrder = await new Order( {
      userid: userid,
      addressid: addressget,
      products: product,
      grandtotal: GrandTotal,
      statusOrder: "Placed",
      deliveredDate: null,
      paymentmethod: paymentoption,
    } ).save();

    const deleteitems = await Cart.deleteMany( { useId: userid } );
    product.map( async ( pro ) =>
    {

      const productStock = await Product.findOne( { _id: ObjectId( pro.productId ) } );
      const stockdecrese = productStock.stock;
      const quantitydecrese = pro.quantity;
      const exatdecreaasestock = stockdecrese - quantitydecrese;
      const decreasePro = await Product.updateOne( { _id: ObjectId( productStock._id ) }, { $set: { stock: exatdecreaasestock } } );

    } );

    res.status( 200 ).send( { message: " New Order Placed" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error....." } ).end();

  }
} );


/* POST new Order razorpay with. */
router.post( "/neworderrazorpay", async ( req, res ) =>
{
  try
  {

    const { userid, iid, GrandTotal, paymentoption, } = req.body;
    const razorpayMethod = () =>
    {
      const instance = new razorpay( {
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      } );
      const options = {
        amount: GrandTotal * 100,
        currency: "INR",
        receipt: crypto.randomBytes( 10 ).toString( "hex" ),
        payment_capture: 1,
      };

      instance.orders.create( options, ( error, order ) =>
      {
        if ( error )
        {
          console.log( error.message );
          return res.status( 400 ).send( { message: "Something Went Wrong!..." } ).end();
        }

        res.status( 200 ).send( { data: order, message: " New Order Placed" } ).end();
      } );
    };
    razorpayMethod();
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error......" } ).end();

  }
} );

/* POST verify razorpay with. */
router.post( "/verifyrazorpay", async ( req, res ) =>
{
  try
  {

    const responsee = req.body.response;
    const paymentid = responsee.razorpay_payment_id;
    const signature = responsee.razorpay_signature;
    const orderid = responsee.razorpay_order_id;
    const sign = orderid + "|" + paymentid;
    const expectedSign = crypto.createHmac( "sha256", process.env.RAZORPAY_KEY_SECRET ).update( sign.toString() ).digest( "hex" );

    if ( signature === expectedSign )
    {
      const cartitems = await Cart.find( { userId: req.body.userid } );
      const cartItems = Object.values( cartitems );
      const addressget = await Address.find( { _id: ObjectId( req.body.iid ) } );
      const product = [];

      cartItems.forEach( ( cartItem ) =>
      {
        product.push( {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          proTotal: cartItem.proTotal,
          mrp: cartItem.mrp,
          imgCart: cartItem.imgCart,
        } );
      } );

      const NewOrder = await new Order( {
        userid: req.body.userid,
        addressid: addressget,
        products: product,
        grandtotal: req.body.GrandTotal,
        statusOrder: "Placed",
        deliveredDate: null,
        paymentmethod: req.body.paymentoption,
      } ).save();

      const deleteitems = await Cart.deleteMany( { useId: req.body.userid } );
      product.map( async ( pro ) =>
      {

        const productStock = await Product.findOne( { _id: ObjectId( pro.productId ) } );
        const stockdecrese = productStock.stock;
        const quantitydecrese = pro.quantity;
        const exatdecreaasestock = stockdecrese - quantitydecrese;
        const decreasePro = await Product.updateOne( { _id: ObjectId( productStock._id ) }, { $set: { stock: exatdecreaasestock } } );

      } );

      res.status( 200 ).send( { message: " New Order Placed" } ).end();

    } else
    {

      return res.status( 400 ).json( { message: "Payment Failed" } );
    }

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Order placing failed....." } ).end();

  }
} );



/* GET user data getting. */
router.get( "/getprofiledata/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    const userdata = await User.findOne( { _id: ObjectId( id ) } );
    res.status( 201 ).send( { data: { userdata }, message: "Successfully Fetched Bro-Cart user_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );


/* GET user address getting. */
router.get( "/getaddressdata/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    const useraddressget = await Address.findOne( { userId: id } );

    res.status( 201 ).send( { data: { useraddressget }, message: "Successfully Fetched Bro-Cart user_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );


/* GET user order getting. */
router.get( "/getorderdata/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    const userOrderdata = await Order.find( { userid: id } );

    res.status( 200 ).send( { data: { userOrderdata }, message: "Successfully Fetched Bro-Cart user_order_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );


/* cancel order item. */
router.post( "/cancelorder", async ( req, res ) =>
{
  try
  {


    const { uid, orderid } = req.body;

    const cancelorder = await Order.findOne( { _id: ObjectId( orderid ) } );

    cancelorder.products.map( async ( pro ) =>
    {
      const productStock = await Product.findOne( { _id: ObjectId( pro.productId ) } );
      const stockincrese = productStock.stock;
      const quantityincrese = pro.quantity;
      const exatdecreaasestock = stockincrese + quantityincrese;
      const increasePro = await Product.updateOne( { _id: ObjectId( productStock._id ) }, { $set: { stock: exatdecreaasestock } } );

    } );

    const cancelitems = await Order.updateOne( { _id: ObjectId( orderid ) }, { $set: { statusOrder: "Cancelled" } } );
    res.status( 200 ).send( { message: "Successfully Cancelled Order!" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
  }
} );


/* POST userdata editing User. */
router.post( "/edituserdata/:id", async ( req, res ) =>
{
  try
  {



    const fn = req.body.firstName;
    const ln = req.body.lastName;
    const usn = req.body.userName;
    const mob = req.body.mobileNumber;
    const email = req.body.email;

    const id = req.params.id;
    const user = await User.updateOne( { _id: ObjectId( id ) }, { $set: { firstName: fn, lastName: ln, userName: usn, email: email, mobileNumber: mob } } );

    res.status( 201 ).send( { message: "You Successfully updated Bro-Cart Account" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Fill All Fields....." } ).end();

  }
} );


/* POST address editing. */
router.post( "/editaddress/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    const usid = req.body.userId;
    const fn = req.body.firstName;
    const ln = req.body.lastName;
    const add1 = req.body.address1;
    const add2 = req.body.address2;
    const mob = req.body.mobilenumber;
    const citi = req.body.city;
    const pin = req.body.pincode;
    const address = await Address.updateOne( { _id: ObjectId( id ) }, { $set: { userId: usid, firstName: fn, lastName: ln, address1: add1, address2: add2, mobilenumber: mob, city: citi, pincode: pin } } );

    res.status( 201 ).send( { message: "You Successfully updated Bro-Cart Account" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Fill All Fields....." } ).end();

  }
} );


/* POST rating adding. */
router.post( "/addrating", async ( req, res ) =>
{
  try
  {

    const userID = req.body.useriid;
    const rating = req.body.value;
    const productID = req.body.id;
    const productdatage = await Product.findOne( { _id: ObjectId( productID ) } );
    const ratings = await Product.updateOne( { _id: ObjectId( productID ) }, { $push: { rating: { userId: userID, rate: rating } } } );
    const productdataget = await Product.findOne( { _id: ObjectId( productID ) } );
    const lengthrate = productdataget.rating.length;

    const updatelength = await Product.updateOne( { _id: ObjectId( productID ) }, { $set: { lengthofrating: lengthrate } } );

    res.status( 201 ).send( { message: "You Successfully updated Bro-Cart Product rating" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Down....." } ).end();

  }
} );


/* POST  Coupon Apply. */
router.post( "/applycoupon/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    const Coupons = await Coupon.findOne( { code: req.body.code } );
    if ( Coupons )
    {
      const userAlreadyexists = Coupons.userId.findIndex( ( users ) => users == id );

      if ( userAlreadyexists == -1 )
      {

        res.status( 200 ).send( { data: Coupons, message: "You Successfully Applyed Bro-Cart Coupon  Offer!" } ).end();
      }
      else
      {

        res.status( 500 ).send( { message: "This Coupon Already Applied....!" } ).end();
      }

    } else
    {

      res.status( 500 ).send( { message: "Invalid Coupon Code!" } ).end();
    }
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Down....." } ).end();

  }
} );


/* POST  User Push To array of coupon Apply. */
router.post( "/userpush/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;

    const Coupons = await Coupon.findOne( { code: req.body.code } );

    if ( Coupons )
    {

      const userAlreadyexists = Coupons.userId.findIndex( ( users ) => users == id );

      if ( userAlreadyexists == -1 )
      {

        const userIdAddingtoarray = await Coupon.updateOne( { code: req.body.code }, { $push: { userId: id } } );
        res.status( 200 ).send( { data: Coupons, message: "You Successfully Applyed Bro-Cart Coupon  Offer!" } ).end();
      }
      else
      {

        res.status( 500 ).send( { message: "This Coupon Already Applied....!" } ).end();
      }

    } else
    {

      res.status( 500 ).send( { message: "Invalid Coupon Code!" } ).end();
    }
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Down....." } ).end();

  }
} );



/* POST  Wallet Apply. */
router.post( "/applyamountwallet/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;

    const user = await User.findOne( { _id: ObjectId( id ) } );

    if ( user )
    {

      const userWallet = user.wallet;
      if ( userWallet >= req.body.amountwallet )
      {
        res.status( 200 ).send( { data: user, message: "You Successfully Applyed Bro-Cart Wallet Amount!" } ).end();
      }
      else
      {

        res.status( 500 ).send( { message: "Insufficient Funds..!" } ).end();
      }

    } else
    {

      res.status( 500 ).send( { message: "No Wallet For this User!" } ).end();
    }
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Down....." } ).end();

  }
} );



/* POST  wallet poping Apply. */
router.post( "/walletpop/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;

    const user = await User.findOne( { _id: ObjectId( id ) } );

    if ( user )
    {

      const userWallet = user.wallet;
      if ( userWallet >= req.body.amount )
      {
        const newamount = userWallet - req.body.amount;
        const walletedit = await User.updateOne( { _id: ObjectId( id ) }, { $set: { wallet: newamount } } )
        res.status( 200 ).send( { data: user, message: "You Successfully Editted Bro-Cart Wallet Amount!" } ).end();
      }
      else
      {

        res.status( 500 ).send( { message: "Insufficient Funds..!" } ).end();
      }

    } else
    {

      res.status( 500 ).send( { message: "No Wallet For this User!" } ).end();
    }
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Down....." } ).end();

  }
} );






module.exports = router;
