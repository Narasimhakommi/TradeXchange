const model = require("../models/trade");

function uniqueBy(arr, prop){
  return arr.reduce((a, d) => {
    if (!a.includes(d[prop])) 
      { a.push(d[prop]); }
    return a;
  }, []);
}

//GET /trades : send all trades
exports.index = (req, res) => {
  model.find()
  .then(trades => {
    const categories = uniqueBy(trades,'category');
    res.render("./trade/trades", { trades, categories });
  })
  .catch(err => {
    next(err);
  });
};

//GET /trades/new : send html form for creating a new trade
exports.new = (req, res) => {
  res.render("./trade/newTrade");
};

//POST /trades : create a new trade
exports.create = (req, res) => {
  let trade = new model(req.body);
  trade.createdBy = "Narasimha Naidu";
  trade.status = "available";
  trade.imageURL = "test";
  console.log(trade);
  trade.save(trade)
  .then(trade => res.redirect("/trades"))
  .catch(err => {
    if(err.name === 'ValidationError'){
      err.status = 400;
    }
    next(err);
  });
  
};

//GET /trades/:id : send a trade identified by id.
exports.show = (req, res, next) => {
  let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid input ID');
        err.status = 400;
        next(err);
    }
  model.findById(id)
  .then(trade => {
    if(trade){
      res.render("./trade/trade",{trade});  
    }
    else {
      let err = new Error("Cannot find a trade with id " + id);
      err.status = 404;
      next(err);
    }
  })
  .catch(err => {
      next(err);
  });
  
};

//GET /trades/:id/edit : send html form for editing the trade.
exports.edit = (req, res, next) => {
  let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid input ID');
        err.status = 400;
        next(err);
    }
  model.findById(id)
  .then(trade => {
    if (trade) {
      res.render("./trade/edit", { trade });
    } else {
      let err = new Error("Cannot find a trade with id " + id);
      err.status = 404; 
      next(err);
    }
  })
  .catch(err => next(err));

};

//PUT /trades/:id  : update the trade identified by id
exports.update = (req, res, next) => {
  let trade = req.body;
  let id = req.params.id;

  if(!id.match(/^[0-9a-fA-F]{24}$/)){
      let err = new Error('Invalid input ID');
      err.status = 400;
      next(err);
  }

  model.findByIdAndUpdate(id, trade, {useFindAndModify : false, runValidators : true})
  .then(trade =>{
      if(trade){
          return res.redirect('/trades/'+id);
      }
      else{
          let err = new Error('Cannot find a trade with id ' + id);
          err.status = 404;
          next(err);
      }
  })
  .catch(err => {
      if(err.name == 'ValidationError'){
          err.status = 400;
      }
      next(err)});
};

//DELETE /trades/:id  : delete the trade identified by id
exports.delete = (req, res, next) => {
  let id = req.params.id;

  if(!id.match(/^[0-9a-fA-F]{24}$/)){
      let err = new Error('Invalid input ID');
      err.status = 400;
      next(err);
  }

  model.findByIdAndDelete(id, {useFindAndModify : false})
  .then(trade => {
      if(trade){
          res.redirect('/trades');
      }
      else{
          let err = new Error('Cannot find a trade with id ' + id);
          err.status = 404;
          next(err);
      }
  })
  .catch(err => {next(err)});
};
