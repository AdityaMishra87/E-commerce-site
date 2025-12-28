import React from 'react'
import { FaStar } from 'react-icons/fa'
import { addToCart } from '../Redux/cartSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart(product))
    alert('Product Added Successfully!')
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white p-4 shadow rounded relative border transform transition-transform duration-300 hover:scale-105">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain mb-4"
        />

        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 font-semibold">${product.price}</p>

        <div className="flex items-center mt-2">
          {[...Array(4)].map((_, index) => (
            <FaStar key={index} className="text-yellow-500" />
          ))}
        </div>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-2 flex items-center justify-center w-8 h-8 bg-red-600 group text-white text-sm rounded-full hover:w-32 hover:bg-red-700 transition-all duration-150"
        >
          <span className="group-hover:hidden">+</span>
          <span className="hidden group-hover:block whitespace-nowrap">
            Add to cart
          </span>
        </button>
      </div>
    </Link>
  )
}

export default ProductCard
