import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import Products from "../../product.json";
import { useState, useEffect } from "react";
import { Facebook, Instagram, ChevronDown } from "lucide-react";
import OrderNotification from "../components/OrderNotification ";

const Home = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  useEffect(() => {
    document.title = "Nike Store - Trang Chủ";
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <OrderNotification />
      <Header className="sticky top-0 z-50 glass" />

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 text-center lg:pt-32">
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl animate-fade-in-up">
            Nâng tầm phong cách với{" "}
            <span className="relative whitespace-nowrap text-primary">
              <span className="relative">Nike Collection</span>
            </span>
          </h1>
          <p
            className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Khám phá những mẫu giày mới nhất, công nghệ tiên tiến nhất từ Nike.
            Đẳng cấp, bền bỉ và luôn phong cách.
          </p>
          <div
            className="mt-10 flex justify-center gap-x-6 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#sport"
              className="group rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 active:bg-slate-800 active:text-slate-300 transition-all duration-300"
            >
              Mua sắm ngay
            </a>
            <a
              href="#pickleball"
              className="group rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-slate-300 hover:ring-slate-400 transition-all duration-300"
            >
              Xem bộ sưu tập
            </a>
          </div>
        </div>

        {/* Media Showcase */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] group transition-all duration-500 hover:scale-[1.02]">
            <img
              src="thumb.png"
              alt="Nike Hero"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent" />
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] group transition-all duration-500 hover:scale-[1.02]">
            <video
              src="video.mp4"
              controls
              autoPlay
              loop
              muted
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            ></video>
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 to-transparent pointer-events-none" />
          </div>
        </div>
      </main>

      {/* Product Section Title */}
      <div className="max-w-7xl mx-auto px-4 mt-12 mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900">Giày Thể Thao</h2>
          <a
            href="#"
            className="text-sm font-semibold text-primary hover:text-primary-dark"
          >
            Xem tất cả
          </a>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        id="sport"
      >
        {Products.filter((item) => item.category === "Giày thể thao").map(
          (pro) => (
            <ProductCard
              product={pro}
              key={pro.id}
              className="transition-all duration-300 hover:translate-y-[-8px]"
            />
          ),
        )}
      </div>

      {/* Pickleball Section */}
      {/* <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-bold text-slate-900">Giày Pickleball</h2>
          <a
            href="#"
            className="text-sm font-semibold text-primary hover:text-primary-dark"
          >
            Xem tất cả
          </a>
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        id="pickleball"
      >
        {Products.filter((item) => item.category === "Giày Pickleball").map(
          (pro) => (
            <ProductCard
              product={pro}
              key={pro.id}
              className="transition-all duration-300 hover:translate-y-[-8px]"
            />
          ),
        )}
      </div> */}

      {/* Features & Payment */}
      <div className="bg-slate-100 py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Giao hàng nhanh</h3>
            <p className="text-slate-600">
              Nhận sản phẩm từ 1-3 ngày làm việc trên toàn quốc.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Thanh toán đa dạng</h3>
            <p className="text-slate-600">
              Hỗ trợ nhiều hình thức thanh toán an toàn và tiện lợi.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Đổi trả MIỄN PHÍ</h3>
            <p className="text-slate-600">
              Đổi trả trong vòng 30 ngày nếu không hài lòng.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center py-16 px-4">
        <p className="font-bold text-3xl mb-8">Phương thức thanh toán</p>
        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <img
            src="/payment_method.jpg"
            alt="Payment Methods"
            className="max-w-full h-auto"
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-4 border-2 border-black rounded-3xl p-4 bg-gray-50">
        <div className="flex items-start gap-3 mb-3">
          <svg
            className="w-8 h-8 text-purple-600 shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
          </svg>
          <div>
            <h3 className="font-bold text-sm uppercase">NHẬN HÀNG TẠI STORE</h3>
            <p className="text-xs text-gray-600">NHẬN NGAY TRONG NGÀY</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <svg
            className="w-8 h-8 text-purple-600 shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
          </svg>
          <div className="flex-1">
            <h3 className="font-bold text-sm uppercase mb-1">
              GIAO HÀNG CHUYỂN PHÁT NHANH
            </h3>
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
                onClick={() => toggleSection("help")}
                className="w-full flex justify-between items-center text-left mb-4 md:pointer-events-none"
              >
                <h3 className="text-sm font-medium tracking-wider">TRỢ GIÚP</h3>
                <ChevronDown
                  className={`md:hidden transition-transform ${
                    activeSection === "help" ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              <ul
                className={`space-y-3 text-sm text-gray-300 ${
                  activeSection === "help" || window.innerWidth >= 768
                    ? "block"
                    : "hidden"
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
                onClick={() => toggleSection("payment")}
                className="w-full flex justify-between items-center text-left mb-4 md:pointer-events-none"
              >
                <h3 className="text-sm font-medium tracking-wider">
                  THANH TOÁN
                </h3>
                <ChevronDown
                  className={`md:hidden transition-transform ${
                    activeSection === "payment" ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              <ul
                className={`space-y-3 text-sm text-gray-300 ${
                  activeSection === "payment" || window.innerWidth >= 768
                    ? "block"
                    : "hidden"
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
                onClick={() => toggleSection("delivery")}
                className="w-full flex justify-between items-center text-left mb-4 md:pointer-events-none"
              >
                <h3 className="text-sm font-medium tracking-wider">
                  GIAO HÀNG
                </h3>
                <ChevronDown
                  className={`md:hidden transition-transform ${
                    activeSection === "delivery" ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              <ul
                className={`space-y-3 text-sm text-gray-300 ${
                  activeSection === "delivery" || window.innerWidth >= 768
                    ? "block"
                    : "hidden"
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
  );
};

export default Home;
