import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import Products from '../../product.json'
import React, { useState } from 'react'
import { Facebook, Instagram, ChevronDown } from 'lucide-react'
import OrderNotification from '../components/OrderNotification '

const Home = () => {
    const [activeSection, setActiveSection] = useState(null)

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section)
    }
    return (
        <div>
            <OrderNotification />
            <Header />
            <div className="max-w-7xl sm:h-[80vh] 3xl:h-[50vh] mx-auto">
                <img src="thumb.png" alt="" className="w-full max-h-full object-fill" />
            </div>
            <div className="max-w-7xl h-[40vh] sm:h-[70vh] mx-auto">
                <video src="video.mp4" controls autoPlay loop muted className="w-full max-h-full object-cover"></video>
            </div>

            <div className="text-center py-5">
                <h2 className="text-lg font-bold tracking-[0.15em] mb-4 uppercase animate-pulse">CÁC DÒNG SẢN PHẨM</h2>

                <div className="flex justify-center items-center gap-4 border-t-2 border-b-2 border-black py-3 mb-4">
                    <a
                        href="#sport"
                        className="text-base font-bold uppercase tracking-wider underline hover:opacity-70 animate-scale"
                    >
                        GIÀY THỂ THAO
                    </a>
                    <span className="text-black">|</span>
                    <a
                        href="#pickleball"
                        className="text-base font-bold uppercase tracking-wider underline hover:opacity-70 animate-scale"
                    >
                        Giày Pickleball
                    </a>
                </div>

                <style jsx>{`
                    @keyframes scale {
                        0%,
                        100% {
                            transform: scale(1);
                        }
                        50% {
                            transform: scale(1.05);
                        }
                    }

                    .animate-scale {
                        animation: scale 1s ease-in-out infinite;
                    }
                `}</style>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 my-4" id="sport">
                {Products.filter((item) => item.category === 'Giày thể thao').map((pro) => (
                    <ProductCard product={pro} key={pro.id} />
                ))}
            </div>
            <h3 className="max-w-7xl mx-auto text-center text-3xl py-4 border-t-2 border-b-2">Giày Pickleball</h3>
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 my-4" id="pickleball">
                {Products.filter((item) => item.category === 'Giày Pickleball').map((pro) => (
                    <ProductCard product={pro} key={pro.id} />
                ))}
            </div>
            <div className="max-w-7xl mx-auto flex flex-col items-center">
                <p className="font-bold text-2xl">Phương thức thanh toán</p>
                <p className="text-center font-semibold text-xl">Giao hàng và trả hàng miễn phí</p>
                <img src="/payment_method.jpg" alt="" />
            </div>
            <div className="max-w-7xl mx-auto mt-4 border-2 border-black rounded-3xl p-4 bg-gray-50">
                <div className="flex items-start gap-3 mb-3">
                    <svg className="w-8 h-8 text-purple-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
                    </svg>
                    <div>
                        <h3 className="font-bold text-sm uppercase">NHẬN HÀNG TẠI STORE</h3>
                        <p className="text-xs text-gray-600">NHẬN NGAY TRONG NGÀY</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <svg className="w-8 h-8 text-purple-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                    </svg>
                    <div className="flex-1">
                        <h3 className="font-bold text-sm uppercase mb-1">GIAO HÀNG CHUYỂN PHÁT NHANH</h3>
                        <div className="flex items-start justify-between gap-2">
                            <p className="text-xs text-gray-700 leading-relaxed">
                                Chuyển phát nhanh của chúng tôi sẽ giao hàng đến địa chỉ của bạn
                            </p>
                            <div className="text-right shrink-0">
                                <p className="text-xl font-semibold">1-3 Ngày</p>
                                <p className="text-xl font-bold">FREESHIP</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-900 text-white py-8 px-6 mt-4">
                <div className="max-w-7xl mx-auto">
                    {/* Language selector and social icons */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-sm text-gray-400">EN / VI</div>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-8 h-8 bg-linear-to-br from-purple-600 via-pink-600 to-orange-500 rounded flex items-center justify-center hover:opacity-90 transition"
                            >
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Main menu sections */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* TRỢ GIÚP */}
                        <div>
                            <button
                                onClick={() => toggleSection('help')}
                                className="w-full flex justify-between items-center text-left mb-4 md:pointer-events-none"
                            >
                                <h3 className="text-sm font-medium tracking-wider">TRỢ GIÚP</h3>
                                <ChevronDown
                                    className={`md:hidden transition-transform ${
                                        activeSection === 'help' ? 'rotate-180' : ''
                                    }`}
                                    size={20}
                                />
                            </button>
                            <ul
                                className={`space-y-3 text-sm text-gray-300 ${
                                    activeSection === 'help' || window.innerWidth >= 768 ? 'block' : 'hidden'
                                }`}
                            >
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Hệ thống của hàng
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Liên hệ
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Chính sách bảo mật
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Điều khoản sử dụng
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* THANH TOÁN */}
                        <div>
                            <button
                                onClick={() => toggleSection('payment')}
                                className="w-full flex justify-between items-center text-left mb-4 md:pointer-events-none"
                            >
                                <h3 className="text-sm font-medium tracking-wider">THANH TOÁN</h3>
                                <ChevronDown
                                    className={`md:hidden transition-transform ${
                                        activeSection === 'payment' ? 'rotate-180' : ''
                                    }`}
                                    size={20}
                                />
                            </button>
                            <ul
                                className={`space-y-3 text-sm text-gray-300 ${
                                    activeSection === 'payment' || window.innerWidth >= 768 ? 'block' : 'hidden'
                                }`}
                            >
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Chính sách vận chuyển, giao hàng
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Chính sách thanh toán
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Chính sách đổi trả
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* GIAO HÀNG */}
                        <div>
                            <button
                                onClick={() => toggleSection('delivery')}
                                className="w-full flex justify-between items-center text-left mb-4 md:pointer-events-none"
                            >
                                <h3 className="text-sm font-medium tracking-wider">GIAO HÀNG</h3>
                                <ChevronDown
                                    className={`md:hidden transition-transform ${
                                        activeSection === 'delivery' ? 'rotate-180' : ''
                                    }`}
                                    size={20}
                                />
                            </button>
                            <ul
                                className={`space-y-3 text-sm text-gray-300 ${
                                    activeSection === 'delivery' || window.innerWidth >= 768 ? 'block' : 'hidden'
                                }`}
                            >
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Chính sách cookies
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition">
                                        Câu hỏi thường gặp
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home
