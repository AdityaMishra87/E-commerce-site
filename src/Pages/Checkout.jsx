import React, { useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Checkout = ({ setOrder }) => {
  const [billingToggle, setBillingToggle] = useState(true)
  const [shippingToggle, setShippingToggle] = useState(true)
  const [paymentToggle, setPaymentToggle] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    zip: ''
  })

  const cart = useSelector((state) => state.cart)
  const navigate = useNavigate()

  const handleOrder = () => {
    const newOrder = {
      products: cart.products,
      orderNumber: '12344',
      shippingInformation: shippingInfo,
      totalPrice: cart.totalPrice
    }
    setOrder(newOrder)
    navigate('/order-confirmation')
  }

  return (
    <div className="container mx-auto py-8 min-h-[24rem] px-4 md:px-16 lg:px-24">
      <h3 className="text-2xl font-semibold mb-4">CHECKOUT</h3>

      <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-10 mt-8">
        {/* Left Section: Billing, Shipping, Payment */}
        <div className="md:w-2/3 space-y-6">
          {/* Billing Information */}
          <div className="border p-4 rounded">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setBillingToggle(!billingToggle)}
            >
              <h3 className="text-lg font-semibold">Billing Information</h3>
              {billingToggle ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div className={`${billingToggle ? 'block' : 'hidden'} mt-4 space-y-4`}>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Enter Phone"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          {/* Shipping Information */}
          <div className="border p-4 rounded">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShippingToggle(!shippingToggle)}
            >
              <h3 className="text-lg font-semibold">Shipping Information</h3>
              {shippingToggle ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div className={`${shippingToggle ? 'block' : 'hidden'} mt-4 space-y-4`}>
              <input
                type="text"
                placeholder="Enter Address"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
              />
              <input
                type="text"
                placeholder="Enter City"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
              />
              <input
                type="number"
                placeholder="Enter ZIP Code"
                className="w-full px-3 py-2 border rounded"
                onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="border p-4 rounded">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setPaymentToggle(!paymentToggle)}
            >
              <h3 className="text-lg font-semibold">Payment Method</h3>
              {paymentToggle ? <FaAngleUp /> : <FaAngleDown />}
            </div>
            <div className={`${paymentToggle ? 'block' : 'hidden'} mt-4 space-y-4`}>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <label className="ml-2">Cash On Delivery</label>
              </div>

              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'dc'}
                  onChange={() => setPaymentMethod('dc')}
                />
                <label className="ml-2">Debit Card</label>
              </div>

              {paymentMethod === 'dc' && (
                <div className="bg-gray-100 p-4 rounded space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Card Holder Name"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-1/2 px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-1/2 px-3 py-2 border rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Order Summary */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md border mt-6 md:mt-0">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.products.map((product) => (
              <div key={product.id} className="flex justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold">{product.name}</h4>
                    <p className="text-gray-600">
                      ${product.price} x {product.quantity}
                    </p>
                  </div>
                </div>
                <span>${(product.price * product.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
            <span>Total Price</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>

          <button
            className="w-full bg-red-600 text-white py-2 mt-6 hover:bg-red-800 transition"
            onClick={handleOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout
