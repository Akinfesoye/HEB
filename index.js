const cart = require('./cart.json')
const coupons = require('./coupons.json')

// console.log(JSON.stringify({ cart, coupons }, null, 2))

// Feature1
const feature1 = {
  grandTotal: 0
}
// grand total
feature1.grandTotal = cart.reduce((total, current) => current.price * 100 + total, 0) / 100
console.log({ feature1 })

// Features 2
const feature2 = {
  subTotal: cart.reduce((total, current) => current.price * 100 + total, 0) / 100,
  taxTotal: Number(cart.reduce((total, current) => {
    const tax = 0.0825 * current.price

    return total + tax
  }, 0).toFixed(2)),
  grandTotal: Number(cart.reduce((total, current) => {
    const tax = 0.0825 * current.price 

    return total + (current.price + tax)
  }, 0).toFixed(2))
}
console.log({ feature2 })

// Features 3
const feature3 = {
  subTotal: cart.reduce((total, current) => current.price * 100 + total, 0) / 100,
  taxTotal: Number(cart.reduce((total, current) => {
    const tax = current.isTaxable ? 0.0825 * current.price : 0

    return total + tax
  }, 0).toFixed(2)),
  grandTotal: Number(cart.reduce((total, current) => {
    const tax = current.isTaxable ? 0.0825 * current.price : 0

    return total + (current.price - tax)
  }, 0).toFixed(2))
}
console.log({ feature3 })

// Feature4
const feature4 = {
  grandTotal: cart.reduce((total, current) => {
    const coupon = coupons.find(c => current.sku === Number(c.appliedSku))
    const discount = coupon ? coupon.discountPrice : 0

    current.price = current.price < discount ? current.price : current.price - discount

    const tax = current.isTaxable ? 0.0825 * current.price : 0

    return total + current.price + tax
  }, 0)
}
console.log({ feature4 })