exports.getUser = (req, res) => {
    res.render("user", { title: "Quản lý tài khoản", layout: false  });
};
exports.getUserstore  = (req,res)=>{
    res.render("userstore",{layout : false});
};
