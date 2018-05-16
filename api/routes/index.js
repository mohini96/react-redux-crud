let user=require('../component/tbluser/tbluserController');
let city=require('../component/tblcity/cityController');
let state=require('../component/tblstate/state_Controller');
let product=require('../component/tblproduct/productController');
let borrower=require('../component/tblborrower/borrowerController');
let category=require('../component/tblcategory/categoryController');
let subcategory=require('../component/tblsubcategory/subcategoryController');
let usertype=require('../component/tblusertype/usertypeController');
let manufacture=require('../component/tblmanufacture/manufactureController');
let usedata=require('../component/user/userController');
exports.route=(app)=>{
    //////////////// tbluser ////////////////
    app.post('/api/userdata/add',usedata.addUser);
    app.get('/api/userdata', usedata.getUser);
    app.get('/api/userdata/image', usedata.getImage);
    app.get('/api/userdata/getUserById/:id', usedata.getUserById);
    app.put('/api/userdata/update', usedata.updateUser);
    app.delete('/api/userdata/delete/:id', usedata.delUser);
    app.post('/api/userdata/login', usedata.loginUser);

    app.post('/api/userdata/fileupload', usedata.image);
    app.delete('/api/userdata/product/delete/:id', usedata.delProduct);
    app.get('/api/userdata/product', usedata.getProduct);
    app.post('/api/userdata/product/add', usedata.addProduct);
    // app.get('/auth/google', userdata.getauth);
    // app.get('/auth/google/callback', userdata.getauthecallback);
    //////////////// tbluser ////////////////
    app.post('/api/user/add',user.addUser);
    app.get('/api/user', user.getUser);
    app.get('/api/user/getUserById', user.getUserById);
    app.put('/api/user/update', user.updateUser);
    app.delete('/api/user/delete/:user_id', user.delUser);
    app.post('/api/user/login', user.loginUser);

    ////////////////  City ////////////////
    app.post('/api/city',city.addcity);
    app.get('/api/city', city.getcity);
    app.get('/api/city/getcity', city.getcityById);
    app.get('/api/city/getstate', city.getstateById);
    app.put('/api/city/update', city.updatecity);
    app.delete('/api/city/delete/:city_id', city.delcity);

    ////////////////  State ////////////////
    app.post('/api/state',state.addstate);
    app.get('/api/state', state.getstate);
    app.get('/api/state/getstate', state.getstateById);
    app.put('/api/state/update', state.updatestate);
    app.delete('/api/state/delete/:state_id', state.delstate);

    // //////////////// Product ////////////////
    app.post('/api/product',product.addproduct);
    app.get('/api/product', product.getproduct);
    app.get('/api/product/getproduct', product.getproductById);
    app.put('/api/product/update', product.updateproduct);
    app.delete('/api/product/delete/:product_id', product.delproduct);
    app.post('/api/import/product',product.importProduct);

    // //////////////// Category ////////////////
    app.post('/api/category',category.addcategory);
    app.get('/api/category', category.getcategory);
    app.get('/api/category/getcategory/:category_id',category.getcategoryById);
    app.put('/api/category/update/:category_id', category.updatecategory);
    app.delete('/api/category/delete/:category_id', category.delcategory);

    // ////////////////sub Category ////////////////
    app.post('/api/subcategory',subcategory.addsubcategory);
    app.post('/api/subcategory/addsubcategory',subcategory.addsubcategoryById);
    app.get('/api/subcategory', subcategory.getsubcategory);
    app.get('/api/subcategory/getsubcategory/:subcategory_id',subcategory.getsubcategoryById);
    app.put('/api/subcategory/update/:subcategory_id', subcategory.updatesubcategory);
    app.delete('/api/subcategory/delete/:subcategory_id', subcategory.delsubcategory);
    app.get('/api/subcategory/getcategory', subcategory.getcategoryById);

    // //////////////// Borrower ////////////////
    app.post('/api/borrower',borrower.addborrower);
    app.get('/api/borrower', borrower.getborrower);
    app.get('/api/borrower/getborrower',borrower.getborrowerById);
    app.put('/api/borrower/update', borrower.updateborrower);
    app.delete('/api/borrower/delete/borrower_id', borrower.delborrower);

    // //////////////// User Type ////////////////
    app.post('/api/usertype',usertype.addusertype);
    app.get('/api/usertype', usertype.getusertype);
    app.get('/api/usertype/getusertype',usertype.getusertypeById);
    app.put('/api/usertype/update', usertype.updateusertype);
    app.delete('/api/usertype/delete/usertype_id', usertype.delusertype);


    // //////////////// manufacture  ////////////////
    app.post('/api/manufacture',manufacture.addmanufacture);
    app.get('/api/manufacture', manufacture.getmanufacture);
    app.get('/api/manufacture/getmanufacture',manufacture.getmanufactureById);
    app.put('/api/manufacture/update', manufacture.updatemanufacture);
    app.delete('/api/manufacture/delete', manufacture.delmanufacture);
};
