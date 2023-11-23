// console.log(arguments);

// showing the wrapper function
// console.log(require("module").wrapper);

/**
 * module.exports
 */
// const Cal = require("./calculator");
// const cal1 = new Cal();
// console.log(cal1.add(3, 4));

///////////////////////////////////////////
/**
 * exports shorthand
 */
// const cal2 = require("./calculator");
// console.log(cal2.add(3, 4));

// desrtucture the exports object we get
// const { add, multiply } = require("./calculator");
// console.log(add(3, 4));

/**
 * Caching
 */
// from the result we can see that the module was only called once,
// and the rest two loggings are from the cache
require("./calculator")();
require("./calculator")();
require("./calculator")();
