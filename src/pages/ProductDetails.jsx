import { ChevronLeft, ChevronRight, Star, Minus, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Products from '../../product.json'
import { useMemo } from 'react'
import { formatVND } from '../helper'
import AddressForm from '../components/Form'
import Modal from '../components/Modal'

export default function ProductDetail() {
    const [currentImage, setCurrentImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [showForm, setShowForm] = useState(false)

    const { id } = useParams()
    const product = useMemo(() => Products.find((pro) => pro.id === id), [id])

    const images = [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop',
    ]

    // Auto slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [images.length])

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="min-h-screen bg-white pb-[10vh] md:pb-0">
            {/* <AddressForm /> */}

            <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
                <AddressForm sizes={product.sizes} />
            </Modal>
            <div className="hidden md:block max-w-6xl mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <div className="relative mb-4 bg-gray-50 rounded-lg overflow-hidden">
                            <img src={images[currentImage]} alt="Product" className="w-full h-[500px] object-contain" />
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex gap-2 overflow-x-auto">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImage(idx)}
                                    className={`shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                                        currentImage === idx ? 'border-blue-600' : 'border-gray-200'
                                    }`}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-red-600 font-bold text-lg">Bestseller</span>
                            <span className="text-red-500 italic font-semibold animate-pulse">FLASH SALE</span>
                        </div>

                        <div className="mb-6">
                            <div className="text-gray-400 line-through text-lg">4.010.000đ</div>
                            <div className="text-blue-700 font-bold text-4xl">1.390.000đ</div>
                        </div>

                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>

                        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
                            <div className="flex items-center gap-1">
                                <span className="text-orange-500 font-bold text-lg">{product.rating.average}</span>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </div>
                            <span className="text-blue-600 underline cursor-pointer">
                                {product.rating.totalReviews} Đánh giá
                            </span>
                            <span className="text-gray-600">{product.rating.totalSold} Đã bán</span>
                        </div>

                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                            <p className="text-red-600 font-bold text-xl mb-1">
                                GIẢM GIÁ LÊN ĐẾN {product.badges.discount}%
                            </p>
                            <p className="text-red-600 font-bold">NHẬP MÃ "NIKE12"</p>
                        </div>

                        <div className="flex gap-4 mb-4">
                            <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:bg-gray-100"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 text-center font-bold text-lg border-x-2 border-gray-300"
                                />
                                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100">
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            <button
                                onClick={() => setShowForm(true)}
                                className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                THÊM VÀO GIỎ HÀNG
                            </button>

                            <button
                                onClick={() => setShowForm(true)}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors animate-pulse-scale"
                            >
                                ĐẶT NGAY
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:hidden">
                <div className="p-4 bg-white border-b">
                    <h1 className="text-xl font-bold mb-1">{product.name}</h1>
                    <span className="text-red-600 font-bold text-sm">Bestseller</span>
                </div>

                <div className="px-4 py-3 bg-white border-b">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-gray-400 line-through text-sm">{formatVND(product.price.original)}</span>
                        {product.badges.isFlashSale && (
                            <span className="text-red-500 italic font-semibold text-sm animate-pulse">FLASH SALE</span>
                        )}
                        <style jsx>{`
                            @keyframes pulse {
                                0%,
                                100% {
                                    opacity: 1;
                                }
                                50% {
                                    opacity: 0;
                                }
                            }

                            .animate-pulse {
                                animation: pulse 1s ease-in-out infinite;
                            }
                        `}</style>
                    </div>
                    <div className="text-blue-700 font-bold text-3xl">{formatVND(product.price.current)}</div>
                </div>

                <div className="relative bg-gray-50">
                    <img src={images[currentImage]} alt="Product" className="w-full h-[400px] object-contain" />
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImage(idx)}
                                className={`w-2 h-2 rounded-full ${
                                    currentImage === idx ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 p-4 overflow-x-auto bg-white border-b">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`shrink-0 w-16 h-16 border-2 rounded overflow-hidden ${
                                currentImage === idx ? 'border-blue-600' : 'border-gray-200'
                            }`}
                        >
                            <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>

                <div className="p-4 bg-white border-b">
                    <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white border-b text-sm">
                    <div className="flex items-center gap-1">
                        <span className="text-orange-500 font-bold">{product.rating.average}</span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>
                    <span className="text-blue-600 underline">{product.rating.totalReviews} Đánh giá</span>
                    <span className="text-gray-600">{product.rating.totalSold} Đã bán</span>
                </div>

                <div className="m-4 p-3 bg-red-50 border-2 border-red-500 rounded-lg">
                    <p className="text-red-600 font-bold text-lg mb-1">GIẢM GIÁ LÊN ĐẾN {product.badges.discount}%</p>
                    <p className="text-red-600 font-bold text-sm">NHẬP MÃ "NIKE12"</p>
                </div>

                <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
                    <div className="flex gap-2 mb-3">
                        <div className="flex items-center border-2 border-gray-300 rounded-lg">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-2 hover:bg-gray-100"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-12 text-center font-bold border-x-2 border-gray-300"
                            />
                            <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100">
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <button
                            onClick={() => setShowForm(true)}
                            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            THÊM VÀO GIỎ HÀNG
                        </button>
                    </div>

                    <button
                        onClick={() => setShowForm(true)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors animate-pulse-scale"
                    >
                        ĐẶT NGAY
                    </button>
                </div>

                <div className="h-32"></div>
            </div>

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
                    animation: pulse-scale 2s ease-in-out infinite;
                }
            `}</style>
            <div className="max-w-6xl mx-auto px-4 py-8 border-t">
                <h2 className="text-2xl font-bold mb-6">Khách hàng đánh giá</h2>

                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-3xl font-bold">HẠNG 5 SAO</span>
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        {[
                            { stars: 5, count: 1269 },
                            { stars: 4, count: 1 },
                            { stars: 3, count: 0 },
                            { stars: 2, count: 0 },
                            { stars: 1, count: 0 },
                        ].map((item) => (
                            <div key={item.stars} className="flex items-center gap-3">
                                <div className="flex w-20">
                                    {[...Array(item.stars)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-black rounded-full"
                                        style={{ width: item.stars === 5 ? '95%' : item.stars === 4 ? '5%' : '0%' }}
                                    ></div>
                                </div>
                                <span className="w-12 text-right text-gray-600">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b">
                    <h3 className="text-xl font-bold">302 ĐÁNH GIÁ CHO SẢN PHẨM TẠI OUTLET</h3>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">610 Bình luận</span>
                        <button className="text-blue-600 underline">Sắp xếp theo</button>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                            <span>Hàng đầu</span>
                            <ChevronRight className="w-4 h-4 rotate-90" />
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {product.reviews.map((rv) => (
                        <div key={rv.id} className="border-b pb-6">
                            <div className="flex gap-4">
                                <img src={rv.avatar} alt="ngô huy" className="w-14 h-14 rounded-full object-cover" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-bold text-lg text-pink-600">{rv.userName}</h4>
                                        <div className="flex">
                                            {[...Array(rv.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-3">{rv.content}</p>
                                    <img
                                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=400&fit=crop"
                                        alt="Review"
                                        className="w-48 h-64 object-cover rounded-lg mb-3"
                                    />
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span>Thích · Phản hồi</span>
                                        <div className="flex items-center gap-1">
                                            <span>{rv.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
