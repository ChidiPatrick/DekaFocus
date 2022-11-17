import PropTypes from "prop-types"
 const testFunction = (a) => {
    return a * 2
}

export function order(items) {
    const total = items.reduce((price,item) => price + item.price,0);
    return {
        orderItems: items,
        total: total
    }
}
// testFunction.PropTypes = {
//     a: PropTypes.number
// }
export default testFunction