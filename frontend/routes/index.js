const cartRouter=require('./cartRoutes');
const hompageRouter=require('./homeRoutes');
const userRouter=require('./userRoutes');
const orderRouter=require('./orderRoutes');
const productRouter=require('./productRoutes');
function route(app){
    app.use('/cart',cartRouter);
    app.use('/user',userRouter);
    app.use('/order',orderRouter);
    app.use('/product',productRouter);
    app.use('/',hompageRouter);
}
module.exports=route;