var express = require( 'express' );
var router = express.Router();
var { User } = require( '../models/User' );
const { ObjectId } = require( 'mongodb' );
const { Category } = require( '../models/Category' );
const { SubCategory } = require( '../models/SubCategory' );
const cloud = require( '../config/Cloud' );
const { Product } = require( '../models/Products' );
const { Order } = require( '../models/Order' );
const { Coupon } = require( '../models/Coupons' );
const upload = require( "../config/multer" );
const serviceSID = "VA5de00231b8644ad47a661eec84e02ce2";
const accountnSID = "AC125180260e508b024bd8826a641af775";
const authToken = "6b6767f0a04fcde983b02b5ea8e1fcb4";

const client = require( "twilio" )( accountnSID, authToken )




/* GET ADMIN home page. */
router.get( '/', function ( req, res, next )
{
  res.send( 'I am ADMIN' );
} );

/* GET users list page. */
router.get( '/fetchuserdata', async ( req, res, next ) =>
{
  try
  {

    const users = await User.find( { role: 'user' } );

    res.status( 201 ).send( { data: users, message: "Successfully Fetched Bro-Cart User_Data" } );

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Internel Error" } );
  }
} );

/* GET users block page. */
router.get( '/block/:id', async ( req, res, next ) =>
{
  try
  {

    const id = req.params.id;

    const user = await User.updateOne( { _id: ObjectId( id ) }, { $set: { status: false } } );

    res.status( 201 ).send( { message: "Successfully Blocked Bro-Cart User" } );

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Internel Error" } );
  }
} );


/* GET users unblock page. */
router.get( '/unblock/:id', async ( req, res, next ) =>
{
  try
  {

    const id = req.params.id;
    const user = await User.updateOne( { _id: ObjectId( id ) }, { $set: { status: true } } );

    res.status( 201 ).send( { message: "Successfully UnBlocked Bro-Cart User" } );

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Internel Error" } );
  }
} );

/* POST category creating. */
router.post( "/category/create", async ( req, res ) =>
{
  try
  {

    const Maincategory = await Category.findOne( { categoryname: req.body.categoryname } );
    const firstcategory = await SubCategory.findOne( { subcategoryname: req.body.subcategoryname } );

    if ( !Maincategory && !firstcategory )
    {

      const AddMainCategory = await new Category( { categoryname: req.body.categoryname } ).save();

      const Parent = await Category.findOne( { categoryname: req.body.categoryname } );


      const AddSubCategory = await new SubCategory( { subcategoryname: req.body.subcategoryname, parentCatId: Parent._id } ).save();
      const statusmaincategory = await Category.updateOne( { categoryname: req.body.categoryname }, { $set: { statusSub: true } } );


      const Child = await SubCategory.findOne( { subcategoryname: req.body.subcategoryname } );



      res.status( 201 ).send( { message: "You Successfully Created Bro-Cart Category" } ).end();
    }
    if ( Maincategory && !firstcategory )
    {
      const Parent = await Category.findOne( { categoryname: req.body.categoryname } );

      const AddSubCategory = await new SubCategory( { subcategoryname: req.body.subcategoryname, parentCatId: Parent._id } ).save();
      const statusmaincategory = await Category.updateOne( { categoryname: req.body.categoryname }, { $set: { statusSub: true } } );

      const Child = await SubCategory.findOne( { subcategoryname: req.body.subcategoryname } );

      res.status( 201 ).send( { message: "You Successfully Created Bro-Cart Category" } );
    }

    // return res.status(409).send({ message: "This Category already exist!" });
    if ( Maincategory && firstcategory )
      return res.status( 409 ).send( { message: " This Category Names already exist!" } ).end();


  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();
  }
} );


/* GET category data getting. */
router.get( "/categoryname/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    const Parent = await Category.findOne( { _id: ObjectId( id ) } );

    res.status( 201 ).send( { data: { Parent }, message: "Successfully Fetched Bro-Cart Category_Data" } );


  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );


/* POST category data updating. */
router.post( "/category/mainupdate/:id", async ( req, res ) =>
{
  try
  {


    const id = req.params.id;
    if ( req.body.categoryname === "" )
      return res.status( 201 ).send( { message: "Nothing Updated" } );
    const MainCategory = await Category.updateOne( { _id: ObjectId( id ) }, { $set: { categoryname: req.body.categoryname } } );
    res.status( 201 ).send( { message: "Successfully updated Bro-Cart Category" } ).end();
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

/* DELETE category Name . */
router.delete( "/category/delete/:id", async ( req, res ) =>
{
  try
  {


    const id = req.params.id;
    const MainCategory = await Category.deleteOne( { _id: ObjectId( id ) } );
    const subcategory = await SubCategory.find( { parentCatId: id } ).remove();

    res.status( 201 ).send( { message: "Successfully Deleted Bro-Cart Category" } ).end();;
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );

/* GET subcategory data getting. */
router.get( "/subcategoryname/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    const Child = await SubCategory.findOne( { _id: ObjectId( id ) } );
    const Parent = await Category.findOne( { _id: Child.parentCatId } );

    res.status( 201 ).send( { data: { Child, Parent }, message: "Successfully Fetched Bro-Cart SubCategory_Data" } ).end();;


  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );

/* POST Subcategory data updating. */
router.post( "/subcategoryname/subupdate/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    if ( ( req.body.subcategoryname === "" ) && ( req.body.categoryname === "" ) )
      return res.status( 201 ).send( { message: "Nothing Updated" } );
    if ( ( req.body.subcategoryname === "" ) && ( req.body.categoryname != "" ) )
    {
      const Sub = await SubCategory.findOne( { _id: ObjectId( id ) } );
      const maincat = await Category.findOne( { categoryname: req.body.categoryname } );
      if ( maincat )
      {
        const updateparentid = await SubCategory.updateOne( { _id: ObjectId( id ) }, { $set: { parentCatId: maincat._id } } );
        res.status( 201 ).send( { message: "Main Category Updated" } );
      }
      else
      {
        const AddMainCategory = await new Category( { categoryname: req.body.categoryname } ).save();

        const Parent = await Category.findOne( { categoryname: req.body.categoryname } );

        const SubCategor = await SubCategory.updateOne( { _id: ObjectId( id ) }, { $set: { parentCatId: Parent._id } } );
        res.status( 201 ).send( { message: "New Main Category Created" } );
      }
    }
    if ( ( req.body.subcategoryname != "" ) && ( req.body.categoryname === "" ) )
    {
      const SubCategor3 = await SubCategory.updateOne( { _id: ObjectId( id ) }, { $set: { subcategoryname: req.body.subcategoryname } } );
      res.status( 201 ).send( { message: "Successfully updated Bro-Cart SubCategory" } ).end();
    }
    if ( ( req.body.subcategoryname != "" ) && ( req.body.categoryname != "" ) )
    {
      const SubCategor3 = await SubCategory.updateOne( { _id: ObjectId( id ) }, { $set: { subcategoryname: req.body.subcategoryname } } );
      const maincat = await Category.findOne( { categoryname: req.body.categoryname } );
      if ( maincat )
      {
        const updateparentid = await SubCategory.updateOne( { _id: ObjectId( id ) }, { $set: { parentCatId: maincat._id } } );
        res.status( 201 ).send( { message: "Main & Sub Category Updated" } );
      }
      else
      {
        const AddMainCategory = await new Category( { categoryname: req.body.categoryname } ).save();

        const Parent = await Category.findOne( { categoryname: req.body.categoryname } );

        const SubCategor = await SubCategory.updateOne( { _id: ObjectId( id ) }, { $set: { parentCatId: Parent._id } } );
        res.status( 201 ).send( { message: "New Category Created & Sub Category Updated" } );
      }

    }
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );

/* DELETE Subcategory Name . */
router.delete( "/subcategory/delete/:id", async ( req, res ) =>
{
  try
  {


    const id = req.params.id;
    const SubCategoryDelete = await SubCategory.deleteOne( { _id: ObjectId( id ) } );
    res.status( 201 ).send( { message: "Successfully Deleted Bro-Cart Sub-Category" } ).end();;
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );


/* POST Product creating. */
router.post( "/addproductdata", upload.array( "img" ), async ( req, res ) =>
{
  try
  {
    const data = JSON.parse( req.body.data );
    const producte = await Product.findOne( { productname: data.pro.value } );

    if ( producte )
      return res.status( 500 ).send( { message: "Sorry..!Product Already Available!" } ).end();


    const url = [];
    const files = req.files;
    if ( files.length < 5 )
      return res.status( 500 ).send( { message: "Sorry..!Please Add Product Images!" } ).end();
    for ( const file of files )
    {
      const { path } = file;
      await cloud.uploader
        .upload( path, {
          resource_type: "auto",
          folder: "BroCartProductsImages",
        } ).then( ( result ) =>
        {
          url.push( { url: result.url, id: result.public_id } );
        } );
    };


    const cat = await Category.findOne( { _id: ObjectId( data.namechange ) } );

    const product = await new Product( {
      productname: data.pro.value,
      price: data.price.value,
      description: data.des.value,
      maincategoryname: cat.categoryname,
      subcategoryname: data.aftersubcategory,
      stock: data.stoc.value,
      imgOne: url[ 0 ],
      imgTwo: url[ 1 ],
      imgThree: url[ 2 ],
      imgFour: url[ 3 ],
      imgFive: url[ 4 ],

    } ).save();

    res.status( 201 ).send( { data: product, message: "Successfully Created Bro-Cart Product" } ).end();;

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Check All Fields/Some Error " } ).end();
  }
} );

/* GET products list page. */
router.get( '/fetchproductsdata', async ( req, res, next ) =>
{
  try
  {

    const products = await Product.find( {} );

    res.status( 201 ).send( { data: products, message: "Successfully Fetched Bro-Cart Products_Data" } );

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } );
  }
} );



/* POST sending otp. */
router.post( '/otpsendinga', async ( req, res ) =>
{
  try
  {

    const admin = await User.findOne( { mobileNumber: req.body.mob.value } );

    const role = admin.role;

    if ( !admin )
      return res.status( 409 ).send( { message: "Please Enter a valid Mobile Number!" } );
    if ( role != "admin" )
      return res.status( 409 ).send( { message: "No Entry Authorised Persons Only" } );

    const OTP = await client.verify.services( serviceSID ).verifications.create( { to: `+91${ req.body.mob.value }`, channel: "sms" } );

    res.status( 201 ).send( { message: "Otp sent successfully to " } );

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Enter Valid Number !" } );

  }
} );


/* POST Verfication of otp. */
router.post( '/otpverificationa', async ( req, res ) =>
{
  try
  {


    const OTP_Verification = await client.verify.services( serviceSID ).verificationChecks.create( { to: `+91${ req.body.mob.value }`, code: req.body.otp.value7 } )
      .then( async ( check ) =>
      {

        if ( check.valid === true )
        {

          const admin = await User.findOne( { mobileNumber: req.body.mob.value } );
          const adminToken = admin.generateAuthToken();
          res.status( 201 ).send( { data: { adminToken }, message: "You Successfully Verified ! " } );
        } else
        {

          res.status( 409 ).send( { message: " Invalid OTP ! " } ).end();
        }
      } );
  } catch ( error )
  {

    res.status( 500 ).send( { message: "Invalid Otp....!" } );

  }
} );



/* POST Product creating. */
router.post( "/editproductdata/:id", upload.array( "img" ), async ( req, res ) =>
{
  try
  {
    const id = req.params.id;
    const data = JSON.parse( req.body.data );
    const producte = await Product.findOne( { _id: ObjectId( id ) } );
    if ( producte )
    {

      const url = [];

      const files = req.files;

      if ( files.length < 5 )
        return res.status( 500 ).send( { message: "Sorry..!Please Add Product Images!" } ).end();

      for ( const file of files )
      {
        const { path } = file;
        await cloud.uploader
          .upload( path, {
            resource_type: "auto",
            folder: "BroCartProductsImages",
          } ).then( ( result ) =>
          {
            url.push( { url: result.url, id: result.public_id } );
          } );
      };

      const cat = await Category.findOne( { _id: ObjectId( data.namechange ) } );

      const product = await Product.updateOne( { _id: ObjectId( id ) }, {
        $set: {
          productname: data.pro.value,
          price: data.price.value,
          description: data.des.value,
          maincategoryname: cat.categoryname,
          subcategoryname: data.aftersubcategory,
          stock: data.stoc.value,
          imgOne: url[ 0 ],
          imgTwo: url[ 1 ],
          imgThree: url[ 2 ],
          imgFour: url[ 3 ],
          imgFive: url[ 4 ],

        }
      } );

      res.status( 201 ).send( { data: product, message: "Successfully Edited Bro-Cart Product" } ).end();


    } else
    {
      res.status( 500 ).send( { message: "Sorry..!No product here" } ).end();
    }


  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Check All Fields/Some Error " } ).end();
  }
} );


/* DELETE category Name . */
router.delete( "/product/delete/:id", async ( req, res ) =>
{
  try
  {


    const Id = req.params.id;

    const product = await Product.findById( Id );

    const deleteImg1 = await cloud.uploader.destroy( product.imgOne[ 0 ].id );
    const deleteImg2 = await cloud.uploader.destroy( product.imgTwo[ 0 ].id );
    const deleteImg3 = await cloud.uploader.destroy( product.imgThree[ 0 ].id );
    const deleteImg4 = await cloud.uploader.destroy( product.imgFour[ 0 ].id );
    const deleteImg5 = await cloud.uploader.destroy( product.imgFive[ 0 ].id );

    const deleted = await product.remove();

    res.status( 201 ).send( { message: "Successfully Deleted Bro-Cart Product" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );


/* GET orders list page. */
router.get( '/fetchordersdata', async ( req, res, next ) =>
{
  try
  {

    const Orders = await Order.find( {} );

    res.status( 201 ).send( { data: { Orders }, message: "Successfully Fetched Bro-Cart Orders_Data" } );

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } );
  }
} );



/* POST order status updating. */
router.post( "/orderstatus/:id", async ( req, res ) =>
{
  try
  {


    const id = req.params.id;

    if ( req.body.value === "Delivered" )
    {
      const OrderStatus = await Order.updateOne( { _id: ObjectId( id ) }, { $set: { statusOrder: req.body.value, deliveredDate: new Date() } } );
    }
    else
    {
      const OrderStatus = await Order.updateOne( { _id: ObjectId( id ) }, { $set: { statusOrder: req.body.value } } );
    }

    const findproduct = await Order.findOne( { _id: ObjectId( id ) } );

    findproduct.products.map( async ( pro ) =>
    {
      const productStock = await Product.findOne( { _id: ObjectId( pro.productId ) } );
      const stockincrese = productStock.stock;
      const quantityincrese = pro.quantity;
      const exatdecreaasestock = stockincrese + quantityincrese;
      const increasePro = await Product.updateOne( { _id: ObjectId( productStock._id ) }, { $set: { stock: exatdecreaasestock } } );

    } );
    res.status( 201 ).send( { message: "Successfully updated Order status" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Some Error Occured !" } ).end();

  }

} );


/* GET products list page. */
router.get( '/fetchproductsdata1', async ( req, res, next ) =>
{
  try
  {

    const products = await Product.find( { $and: [ { catoffer: false }, { offer: false } ] } );

    res.status( 201 ).send( { data: products, message: "Successfully Fetched Bro-Cart Products_Data" } );

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } );
  }
} );


/* POST Product creating. */
router.post( "/addproductoffer", async ( req, res ) =>
{
  try
  {

    const producte = await Product.findOne( { _id: ObjectId( req.body.namechange ) } );

    const actualPrice = producte.price;
    const discountrate = ( req.body.price.value ) / 100;
    const minusprice = actualPrice * discountrate;
    const discountprice = actualPrice - minusprice;
    const disc = Math.round( discountprice );
    const Productofferupdate = await Product.updateOne( { _id: ObjectId( req.body.namechange ) }, { $set: { price: disc, discount: req.body.price.value, offer: true, offername: req.body.pro.value, offerdescription: req.body.des.value, disprice: actualPrice } } );

    res.status( 201 ).send( { message: "Successfully Created  Product Offer" } ).end();;

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Check All Fields/Some Error " } ).end();
  }
} );


/* GET Product OFFER DATA. */
router.get( "/productByofferstatus", async ( req, res ) =>
{
  try
  {

    const products = await Product.find( { $and: [ { offer: true }, { catoffer: false } ] } );

    res.status( 201 ).send( { data: products, message: "Successfully Fetched Bro-Cart Products_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

/* POST cancel Product OFFER DATA. */
router.post( "/productcancelofffer/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    const prod = await Product.findOne( { _id: ObjectId( id ) } );
    const actualPrice = prod.disprice;
    const dispriceo = 0;
    const products = await Product.updateOne( { _id: ObjectId( id ) }, { $set: { price: actualPrice, disprice: dispriceo, offer: false } } );

    res.status( 201 ).send( { message: "Successfully Cancelled Bro-Cart Products_Offer" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

/* POST Product creating. */
router.post( "/categoryofferadding", async ( req, res ) =>
{
  try
  {

    const producte = await Product.find( { $and: [ { subcategoryname: req.body.aftersubcategory }, { offer: false }, { catoffer: false } ] } );
    if ( producte != '' )
    {


      producte.map( async ( pro ) =>
      {

        const actualPrice = pro.price;
        const discountrate = ( req.body.price.value ) / 100;
        const minusprice = actualPrice * discountrate;
        const discountprice = actualPrice - minusprice;
        const disc = Math.round( discountprice )
        const Productofferupdate = await Product.updateOne( { _id: ObjectId( pro._id ) }, { $set: { price: disc, discount: req.body.price.value, offer: true, catoffer: true, offername: req.body.pro.value, offerdescription: req.body.des.value, disprice: actualPrice } } );
      } );
      const subca = await SubCategory.updateOne( { subcategoryname: req.body.aftersubcategory }, { $set: { offerstatus: true, discount: req.body.price.value } } );

      res.status( 201 ).send( { message: "Successfully Created  Product Offer" } ).end();
    }
    else
    {
      res.status( 409 ).send( { message: "All Product already having another offers" } ).end();
    }

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Check All Fields/Some Error " } ).end();
  }
} );

/* GET catgory OFFER DATA. */
router.get( "/productbycatoffer", async ( req, res ) =>
{
  try
  {

    const subca = await SubCategory.find( { offerstatus: true } );

    res.status( 201 ).send( { data: subca, message: "Successfully Fetched Bro-Cart Products_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

/* POST cancel Product OFFER DATA. */
router.post( "/categorycancelofffer/:id", async ( req, res ) =>
{
  try
  {

    const id = req.params.id;
    const prod = await Product.find( { catoffer: true } );
    prod.map( async ( pro ) =>
    {
      const actualPrice = pro.disprice;
      const dispriceo = 0;
      const products = await Product.updateOne( { _id: pro._id }, { $set: { price: actualPrice, disprice: dispriceo, offer: false, catoffer: false } } );

    } );
    const subca = await SubCategory.updateOne( { _id: ObjectId( id ) }, { $set: { offerstatus: false, discount: 0 } } );
    res.status( 201 ).send( { message: "Successfully Cancelled Bro-Cart  Category_Offer" } ).end();
  }



  catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

/* GET Product coupons DATA. */
router.get( "/fetchcouponsdata", async ( req, res ) =>
{
  try
  {

    const CouponS = await Coupon.find( {} );

    res.status( 201 ).send( { data: CouponS, message: "Successfully Fetched Bro-Cart Coupons_Data" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

/* POST Coupon  creating. */
router.post( "/addcouponoffer", async ( req, res ) =>
{
  try
  {

    const { couponname, discount, maxamount, minamount, couponcode, expirydate, } = req.body;

    const name = couponname.value;
    const dis = discount.value;
    const max = maxamount.value;
    const min = minamount.value;
    const code = couponcode.value;
    const exp = expirydate;


    const createCoupon = await new Coupon( {
      couponname: name,
      userId: [],
      code: code,
      discount: dis,
      minamount: max,
      minpurchase: min,
      expireAt: new Date( expirydate )

    } ).save();

    res.status( 200 ).send( { message: "Successfully Created  Coupon Offer!" } ).end();;

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Please Check All Fields/Some Error " } ).end();
  }
} );

/* GET userstatics DATA. */
router.get( "/userstatics", async ( req, res ) =>
{
  try
  {

    const date = new Date();
    const lastYear = new Date( date.setFullYear( date.getFullYear() - 1 ) );
    const userstaticss = await User.aggregate( [
      {
        $match: {
          createdAt: {
            $gte: lastYear,
          },
        },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ] )

    res.status( 200 ).send( { data: { userstaticss }, message: "Successfully Fetched Bro-Cart userstatics" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

/* GET admin income DATA. */
router.get( "/fechincome", async ( req, res ) =>
{
  try
  {

    const date = new Date();
    const lastMonth = new Date( date.setMonth( date.getMonth() - 1 ) );
    const previousMonth = new Date( new Date().setMonth( lastMonth.getMonth() - 1 ) );
    const adminincomes = await Order.aggregate( [
      {
        $match: {
          createdAt: { $gte: previousMonth },
        },
      },
      {
        $unwind: "$products",
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$products.proTotal",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ] );

    res.status( 200 ).send( { data: { adminincomes }, message: "Successfully Fetched Bro-Cart month income" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );


/* GET admin income DATA. */
router.get( "/totalorder", async ( req, res ) =>
{
  try
  {

    const totalorders = await Order.find( {} ).count();

    res.status( 200 ).send( { data: { totalorders }, message: "Successfully Fetched Bro-Cart Totalcount" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

/* GET admin latest orders. */
router.get( "/getlatestorder", async ( req, res ) =>
{
  try
  {

    const getlatestorders = await Order.aggregate( [ { $unwind: "$products" } ] ).sort( { createdAt: -1 } ).limit( 3 );

    res.status( 200 ).send( { data: { getlatestorders }, message: "Successfully Fetched Bro-Cart latest Orders" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

/* GET sales report */
router.get( "/fetchsalesreport", async ( req, res ) =>
{
  try
  {

    const report = await Order.aggregate( [ { $match: { "statusOrder": "Delivered" } } ] )

    res.status( 200 ).send( { data: { report }, message: "Successfully Fetched Bro-Cart sales report" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

/* POST filtered report */
router.post( "/fetchfilterReport", async ( req, res ) =>
{
  try
  {

    const { fromDate, toDate } = req.body;
    const report = await Order.aggregate( [ { $match: { "statusOrder": "Delivered", createdAt: { $gte: new Date( fromDate ), $lte: new Date( toDate ) }, }, }, ] )

    res.status( 200 ).send( { data: { report }, message: "Successfully Fetched Bro-Cart filtered report" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );


/* POST filtered report */
router.post( "/fetchdayReport", async ( req, res ) =>
{
  try
  {
    let today = new Date();
    today = new Date( today.setHours( 0, 0, 0, 0 ) ).toISOString();
    const report = await Order.aggregate( [
      {
        $match:
        {
          "statusOrder": "Delivered",
          "deliveredDate": { $gte: new Date( today ) }
        }
      },
    ] );
    if ( report )
    {
      console.table( "." );
    } else
    {
      console.log( '.' );
    }

    res.status( 200 ).send( { data: { report }, message: "Successfully Fetched Bro-Cart filtered day report" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );


/* POST filtered report */
router.post( "/fetchweekReport", async ( req, res ) =>
{
  try
  {

    let day = new Date().getDay();
    if ( day == 0 )
    {
      day = 7;
    } else if ( day == 1 )
    {
      day = 2;
    }

    let nowDate = new Date( Date.now() - day * 24 * 60 * 60 * 1000 );
    let date = new Date( nowDate.setHours( 0, 0, 0, 0 ) ).toISOString();

    const report = await Order.aggregate( [
      {
        $match:
        {
          "statusOrder": "Delivered",
          "deliveredDate": { $gte: new Date( date ) }
        }
      },
    ] );

    res.status( 200 ).send( { data: { report }, message: "Successfully Fetched Bro-Cart filtered report" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );


/* POST filtered report */
router.post( "/fetchmonthReport", async ( req, res ) =>
{
  try
  {

    let month = new Date();
    let firstMonth = new Date( month.getFullYear(), month.getMonth(), 1 );
    let date = new Date( firstMonth.setHours( 0, 0, 0, 0 ) ).toISOString();

    const report = await Order.aggregate( [
      {
        $match:
        {
          "statusOrder": "Delivered",
          "deliveredDate": { $gte: new Date( date ) }
        }
      },
    ] );

    res.status( 200 ).send( { data: { report }, message: "Successfully Fetched Bro-Cart filtered report" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );


/* POST filtered report */
router.post( "/fetchyearlyReport", async ( req, res ) =>
{
  try
  {

    let currentYear = new Date().getFullYear();
    currentYear = currentYear + "-" + "01-01";
    currentYear = new Date( currentYear );
    const date = new Date( currentYear ).toISOString;

    const report = await Order.aggregate( [
      {
        $match:
        {
          "statusOrder": "Delivered",
          "deliveredDate": { $gte: new Date( date ) }
        }
      },
    ] );

    res.status( 200 ).send( { data: { report }, message: "Successfully Fetched Bro-Cart filtered report" } ).end();

  } catch ( error )
  {

    res.status( 500 ).send( { message: "Server Error" } ).end();
  }
} );

module.exports = router;



