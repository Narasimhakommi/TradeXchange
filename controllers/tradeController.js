const model = require("../models/trade");
function uniqueBy(arr, prop){
  return arr.reduce((a, d) => {
    if (!a.includes(d[prop])) { a.push(d[prop]); }
    return a;
  }, []);
}
//GET /trades : send all trades
exports.index = (req, res) => {
  let trades = model.find();
  let categories = uniqueBy(trades, "category");;
  // console.log(categories);
  res.render("./trade/trades", { trades, categories });
};

//GET /trades/new : send html form for creating a new trade
exports.new = (req, res) => {
  res.render("./trade/newTrade");
};

//POST /trades : create a new trade
exports.create = (req, res) => {
  let trade = req.body;
  // console.log("This is post data : ");
  // console.log(trade);
  model.save(trade);
  res.redirect("/trades");
};

//GET /trades/:id : send a trade identified by id.
exports.show = (req, res, next) => {

  let id = req.params.id;
  // console.log(id);
  let trade = model.findById(id);
  if(trade){
    res.render("./trade/trade",{trade});  
  }
  else {
    let err = new Error("Cannot find a trade with id " + id);
    err.status = 404;
    next(err);
  }
};

//GET /trades/:id/edit : send html form for editing the trade.
exports.edit = (req, res, next) => {
  let id = req.params.id;
  let trade = model.findById(id);
  if (trade) {
    res.render("./trade/edit", { trade });
  } else {
    let err = new Error("Cannot find a trade with id " + id);
    err.status = 404;
    next(err);
  }
};

//PUT /trades/:id  : update the trade identified by id
exports.update = (req, res, next) => {
  let trade = req.body;
  let id = req.params.id;
  // console.log(trade);
  if (model.updateById(id, trade)) {
    res.redirect("/trades/" + id);
  } else {
    let err = new Error("Cannot find a trade with id " + id);
    err.status = 404;
    next(err);
  }
};

//DELETE /trades/:id  : delete the trade identified by id
exports.delete = (req, res, next) => {
  if (model.deleteById(req.params.id)) {
    res.redirect("/trades");
  } else {
    let err = new Error("Cannot find a trade with id " + id);
    err.status = 404;
    next(err);
  }
};
