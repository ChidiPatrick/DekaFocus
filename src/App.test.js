import { render, screen } from '@testing-library/react';
import App from './App';
import testFunction,{order} from "../testFunction"

const menuItems = [
  {
    id: '1',
    name: "Tatted up Turkey Burger",
    price: 19.5

  },
  {
    id: '2',
    name: "Lobster Lollipops",
    price: 16.5

  },
  {
    id: '3',
    name: "Motley Que Pulled Pork Sandwich",
    price: 21.5

  },
  {
    id: '4',
    name: "Trash Cab Nachos",
    price: 19.5

  }

]
test("Two multiple", () => {
  expect(testFunction(4)).toBe(8)
})

test("Build an order object", () => {
  const result = {
    orderItems: menuItems,
    total: 77
  }
  expect(order(menuItems)).toEqual(result)
})