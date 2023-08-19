const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");
const trades = [
  {
    id: "1",
    name:"MacBook",
    category: "Laptops",
    productType:"Mac OS",
    details:
      "The specifications for this laptop are 512GB SSD, 1080X1920 IPS LCD Screen, M1 Processor.Windows 10 Pro (available through downgrade rights from Windows 11 Pro),Intel® Core™ i7-1255U (up to 4.7 GHz with Intel® Turbo Boost Technology, 12 MB L3 cache, 10 cores, 12 threads) This comes with 1 year warranty. Dolby Audio systems with 20W stereo speakers. It has 18h battery life and 100h standby time. This is stylish, slim, portable, strong with metallic body. Sensible Keypad and tracker pad with sleek touch technology. Dimensions: 20X15X4",
    createdBy: "Narasimha Naidu Kommi",
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT),
    status:"Available",
    imageURL:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-gold-select-201810?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1633027804000"
   },
  {
    id: "2",
    name:"Dell",
    category: "Laptops",
    productType:"Windows OS",
    details:
    "The specifications for this laptop are 512GB SSD, 1080X1920 IPS LCD Screen, M1 Processor.Windows 10 Pro (available through downgrade rights from Windows 11 Pro),Intel® Core™ i7-1255U (up to 4.7 GHz with Intel® Turbo Boost Technology, 12 MB L3 cache, 10 cores, 12 threads) This comes with 1 year warranty. Dolby Audio systems with 20W stereo speakers. It has 18h battery life and 100h standby time. This is stylish, slim, portable, strong with metallic body. Sensible Keypad and tracker pad with sleek touch technology. Dimensions: 20X15X4",
    createdBy: "Narasimha Naidu Kommi",
    createdAt: DateTime.local(2022, 2, 23, 18, 0).toLocaleString(
      DateTime.DATETIME_SHORT
    ),
    status:"Available",
    imageURL:"https://m.media-amazon.com/images/I/91WgL3IbNIL.jpg" },
  {
    id: "3",
    name:"Lenovo Thinkpad",
    category: "Laptops",
    productType:"Linux OS",
    details:
    "The specifications for this laptop are 512GB SSD, 1080X1920 IPS LCD Screen, M1 Processor.Windows 10 Pro (available through downgrade rights from Windows 11 Pro),Intel® Core™ i7-1255U (up to 4.7 GHz with Intel® Turbo Boost Technology, 12 MB L3 cache, 10 cores, 12 threads) This comes with 1 year warranty. Dolby Audio systems with 20W stereo speakers. It has 18h battery life and 100h standby time. This is stylish, slim, portable, strong with metallic body. Sensible Keypad and tracker pad with sleek touch technology. Dimensions: 20X15X4",
    createdBy: "Narasimha Naidu Kommi",
    createdAt: DateTime.local(2022, 2, 23, 18, 0).toLocaleString(
      DateTime.DATETIME_SHORT
    ),
    status:"Available",
    imageURL:"https://cdn.arstechnica.net/wp-content/uploads/2020/04/x1-carbon-gen8-hero.png"
  },
  {
    id: "4",
    name:"Type C Cable",
    category: "Accesories",
    productType:"Cables",
    details:
    "The specifications for this laptop are 512GB SSD, 1080X1920 IPS LCD Screen, M1 Processor.Windows 10 Pro (available through downgrade rights from Windows 11 Pro),Intel® Core™ i7-1255U (up to 4.7 GHz with Intel® Turbo Boost Technology, 12 MB L3 cache, 10 cores, 12 threads) This comes with 1 year warranty. Dolby Audio systems with 20W stereo speakers. It has 18h battery life and 100h standby time. This is stylish, slim, portable, strong with metallic body. Sensible Keypad and tracker pad with sleek touch technology. Dimensions: 20X15X4",
    createdBy: "Narasimha Naidu Kommi",
    createdAt: DateTime.local(2022, 2, 23, 18, 0).toLocaleString(
      DateTime.DATETIME_SHORT
    ),
    status:"Available",
    imageURL:"https://i5.walmartimages.com/asr/5ac6d34b-7d81-4123-9dfd-179cace128d7_1.e78c5943eec03641f4c61e40823b3470.jpeg"
  },
  {
    id: "5",
    name:"Leather Bag",
    category: "Accesories",
    productType:"Bags",
    details:
      "with Linux OS and intel processor. Its a 64bit processor. with Linux OS and intel processor. Its a 64bit processor. with Linux OS and intel processor. Its a 64bit processor.  ",
    createdBy: "Narasimha Naidu Kommi",
    createdAt: DateTime.local(2022, 2, 23, 18, 0).toLocaleString(
      DateTime.DATETIME_SHORT
    ),
    status:"Available",
    imageURL:"https://cdn.shopify.com/s/files/1/0101/4644/7423/products/the-everyday-mens-leather-laptop-bag-briefcase-sleeve-messenger-bag_1024x.jpg?v=1591147182"
  },
  {
    id: "6",
    name:"Laptop Mount",
    category: "Accesories",
    productType:"Others",
    details:
      "with Linux OS and intel processor. Its a 64bit processor. with Linux OS and intel processor. Its a 64bit processor. with Linux OS and intel processor. Its a 64bit processor.  ",
    createdBy: "Narasimha Naidu Kommi",
    createdAt: DateTime.local(2022, 2, 23, 18, 0).toLocaleString(
      DateTime.DATETIME_SHORT
    ),
    status:"Available",
    imageURL:"https://i5.walmartimages.com/asr/9f33dc42-01b4-4368-84a1-49b47bea9709_1.b840643e914d590ab347edb8fce70163.jpeg"
  },
];

exports.find = () => trades;
exports.findById = (id) => trades.find((trade) => trade.id === id);
exports.save = (trade) => {
  trade.id = uuidv4();
  trade.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
  trade.createdBy = "Narasimha Naidu Kommi";
  trade.status = "Available";
  trade.imageURL = "";
  trades.push(trade);
};
exports.updateById = (id, newtrade) => {
  let trade = trades.find((trade) => trade.id === id);
  if (trade) {
    // console.log(newtrade);
    trade.category = newtrade.category;
    trade.name = newtrade.name;
    trade.productType = newtrade.productType;
    trade.details = newtrade.details;
    return true;
  } else {
    return false;
  }
};
exports.deleteById = (id) => {
  let index = trades.findIndex((trade) => trade.id === id);
  if (index != -1) {
    trades.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
