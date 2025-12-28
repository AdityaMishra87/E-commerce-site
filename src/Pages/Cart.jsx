import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmptyCart from '../assets/images/emptyCart.png'
import { FaTrashAlt } from 'react-icons/fa'
import Modal from '../Components/Modal'
import ChangeAddress from '../Components/ChangeAddress'
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart
} from '../Redux/cartSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const [address, setAddress] = useState('Main Street, 0012')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="container mx-auto py-8 min-h-[24rem] px-4 md:px-16 lg:px-24">
      {cart.products.length > 0 ? (
        <div>
          <h3 className="text-2xl font-semibold mb-4">SHOPPING CART</h3>
          <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-10 mt-8">
            {/* Products Section */}
            <div className="md:w-2/3">
              {/* Header Row */}
              <div className="flex justify-between border-b items-center mb-4 text-xs font-bold">
                <p className="w-1/3">PRODUCTS</p>
                <div className="flex space-x-8">
                  <p className="w-1/6 text-center">PRICE</p>
                  <p className="w-1/6 text-center">QUANTITY</p>
                  <p className="w-1/6 text-center">SUBTOTAL</p>
                  <p className="w-1/6 text-center">REMOVE</p>
                </div>
              </div>

              {/* Product Rows */}
              {cart.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 border-b"
                >
                  {/* Product Info */}
                  <div className="w-1/3 flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-contain rounded"
                    />
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                  </div>

                  {/* Price */}
                  <p className="w-1/6 text-center">${product.price}</p>

                  {/* Quantity */}
                  <div className="w-1/6 flex items-center justify-center space-x-2">
                    <button
                      className="text-xl font-bold px-2 border-r"
                      onClick={() => dispatch(decreaseQuantity(product.id))}
                    >
                      -
                    </button>
                    <p className="text-xl">{product.quantity}</p>
                    <button
                      className="text-xl px-2"
                      onClick={() => dispatch(increaseQuantity(product.id))}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <p className="w-1/6 text-center">
                    ${(product.quantity * product.price).toFixed(2)}
                  </p>

                  {/* Remove */}
                  <div className="w-1/6 flex justify-center">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => dispatch(removeFromCart(product.id))}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border mt-6 md:mt-0">
              <h3 className="text-sm font-semibold mb-5">CART TOTAL</h3>
              <div className="flex justify-between mb-5 border-b pb-1">
                <span className="text-sm">Total Items:</span>
                <span>{cart.totalQuantity}</span>
              </div>

              <div className="mb-4 border-b pb-2">
                <p>Shipping:</p>
                <p className="ml-2">
                  Shipping to{' '}
                  <span className="text-xs font-bold">{address}</span>
                </p>
                <button
                  className="text-blue-500 hover:underline mt-1 ml-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  Change Address
                </button>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total Price:</span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>

              <button
                className="w-full bg-red-600 text-white py-2 hover:bg-red-800 transition"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

          {/* Address Modal */}
          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
            <ChangeAddress
              setAddress={setAddress}
              setIsModalOpen={setIsModalOpen}
            />
          </Modal>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-6 p-8">
          <img src={EmptyCart} alt="Empty Cart" className="h-96" />
          <h3 className="text-red-500 mt-4">Your cart is empty</h3>
          <p>Add something to make me happy</p>
        </div>
      )}
    </div>
  )
}

export default Cart
