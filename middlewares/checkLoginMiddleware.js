module.exports = (req,res,next)=>{
    if(!req.session.username){
      console.log('用户未登陆');
      res.redirect('/');
      return;
    }
    next();
  };
  