
const productRouter = require('./productRoutes');
function route(app){
    
    app.use('/api',productRouter);
}
module.exports=route;