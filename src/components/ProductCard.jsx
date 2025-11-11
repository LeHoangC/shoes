import { Link } from 'react-router-dom'
import { formatVND } from '../helper'

export default function ProductCard({ product }) {
    return (
        <Link to={`details/${product.id}`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative bg-gray-50 p-4">
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded">
                        -{product.badges.discount}%
                    </div>

                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 text-sm font-bold rounded">
                        {product.badges.tag}
                    </div>

                    <img
                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"
                        alt="Nike Air Jordan 1 Low SE"
                        className="w-full object-contain"
                    />
                </div>

                <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-black font-bold text-lg">NIKE</span>
                        {product.badges.isBestseller && (
                            <span className="text-red-500 italic font-semibold text-sm">Best Seller</span>
                        )}
                    </div>

                    <h3 className="text-gray-800 font-medium mb-1">{product.name}</h3>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-red-500 font-bold text-xl">{formatVND(product.price.current)}</span>
                        <span className="text-gray-400 line-through text-sm">{formatVND(product.price.original)}</span>
                    </div>

                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-2xl transition-colors flex items-center justify-center gap-2 animate-pulse-scale">
                        ĐẶT HÀNG
                    </button>

                    <style jsx>{`
                        @keyframes pulse-scale {
                            0%,
                            100% {
                                transform: scale(1);
                            }
                            50% {
                                transform: scale(1.05);
                            }
                        }

                        .animate-pulse-scale {
                            animation: pulse-scale 1s ease-in-out infinite;
                        }
                    `}</style>
                </div>

                <div className="flex gap-2 px-4 pb-4">
                    <span className="bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                        -{product.badges.discount}%
                    </span>
                    <span className="bg-yellow-400 text-black px-2 py-1 text-xs font-bold rounded">
                        {product.badges.tag}
                    </span>
                </div>
            </div>
        </Link>
    )
}
