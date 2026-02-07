import { ChevronLeft, ChevronRight, Star, Minus, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Products from "../../product.json";
import { useMemo } from "react";
import { formatVND } from "../helper";
import AddressForm from "../components/Form";
import Modal from "../components/Modal";
import { Eye } from "lucide-react";

export default function ProductDetail() {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const { id } = useParams();
  const product = useMemo(() => Products.find((pro) => pro.id === id), [id]);

  const images = product.images || [];

  // Auto slide every 3 seconds
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!images || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Update Page Title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} | Nike Store`;
    }
    return () => {
      document.title = "Nike Store"; // Reset on unmount
    };
  }, [product]);

  if (!product || images.length === 0) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-[10vh] md:pb-0">
      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <div className="glass shadow-2xl rounded-3xl overflow-hidden">
          <AddressForm sizes={product.sizes} name={product.name} />
        </div>
      </Modal>

      <div className="hidden md:block max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Product Gallery */}
          <div className="sticky top-24">
            <div className="relative mb-6 rounded-3xl overflow-hidden glass-card">
              <img
                src={images[currentImage]}
                alt={product.name}
                className="w-full h-[600px] object-contain p-8 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity">
                <button
                  onClick={prevImage}
                  className="bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-800" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-slate-800" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`shrink-0 w-24 h-24 rounded-2xl overflow-hidden shadow-md transition-all duration-300 border-2 ${
                    currentImage === idx
                      ? "border-primary ring-4 ring-primary/20 scale-105"
                      : "border-transparent hover:border-slate-300"
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

          {/* Right: Product Info */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full">
                  Bestseller
                </span>
                <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider rounded-full animate-pulse">
                  Flash Sale
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-end gap-4">
              <div className="text-primary font-black text-5xl">
                {formatVND(product.price.current)}
              </div>
              <div className="text-slate-400 line-through text-xl pb-1">
                {formatVND(product.price.original)}
              </div>
            </div>

            <div className="p-6 glass-card rounded-3xl">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">
                Mô tả sản phẩm
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-8 py-6 border-y border-slate-200">
              <div className="flex flex-col items-center border-r border-slate-200 pr-8">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-2xl font-black text-slate-900">
                    {product.rating.average}
                  </span>
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter">
                  Xếp hạng
                </span>
              </div>
              <div className="flex flex-col items-center border-r border-slate-200 pr-8">
                <span className="text-2xl font-black text-slate-900">
                  {product.rating.totalReviews}
                </span>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter">
                  Đánh giá
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900">
                  {product.rating.totalSold}
                </span>
                <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter">
                  Đã bán
                </span>
              </div>
            </div>

            <div className="bg-linear-to-r from-red-600 via-orange-500 to-red-600 p-0.5 rounded-3xl shadow-lg ring-4 ring-red-100">
              <div className="bg-white px-8 py-6 rounded-[22px] flex items-center justify-between">
                <div>
                  <p className="text-red-600 font-black text-2xl">
                    GIẢM NGAY {product.badges.discount}%
                  </p>
                  <p className="text-slate-500 font-medium">
                    Sử dụng mã:{" "}
                    <span className="text-slate-900 font-bold">NIKE12</span>
                  </p>
                </div>
                <div className="hidden lg:block h-12 w-12 border-4 border-dashed border-red-200 rounded-full animate-spin-slow"></div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setShowForm(true)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-5 px-8 rounded-2xl transition-all hover:shadow-lg active:scale-95"
              >
                THÊM VÀO GIỎ
              </button>

              <button
                onClick={() => setShowForm(true)}
                className="flex-[1.5] bg-primary hover:bg-primary-dark text-white font-bold py-5 px-8 rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-95 text-xl animate-pulse-soft"
              >
                ĐẶT HÀNG NGAY
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
            <span className="text-gray-400 line-through text-sm">
              {formatVND(product.price.original)}
            </span>
            {product.badges.isFlashSale && (
              <span className="text-red-500 italic font-semibold text-sm animate-pulse">
                FLASH SALE
              </span>
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
          <div className="text-blue-700 font-bold text-3xl">
            {formatVND(product.price.current)}
          </div>
        </div>

        <div className="relative bg-gray-50">
          <img
            src={images[currentImage]}
            alt="Product"
            className="w-full h-[400px] object-contain"
          />
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
                  currentImage === idx ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 p-4 overflow-x-auto bg-white border-b scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`shrink-0 w-16 h-16 border-2 rounded overflow-hidden ${
                currentImage === idx ? "border-blue-600" : "border-gray-200"
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

        <div className="p-4 bg-white border-b">
          <p className="text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-white border-b text-base">
          <div className="flex items-center gap-1">
            <span className="text-orange-500 font-bold">
              {product.rating.average}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
          <span className="text-blue-600 underline">
            {product.rating.totalReviews} Đánh giá
          </span>
          <span className="text-gray-600">
            {product.rating.totalSold} Đã bán
          </span>
        </div>

        <div className="mt-4 p-3 bg-red-50 border-2 border-red-500 rounded-lg">
          <p className="text-red-600 font-bold text-lg mb-1">
            GIẢM GIÁ LÊN ĐẾN {product.badges.discount}%
          </p>
          <p className="text-red-600 font-bold text-sm">NHẬP MÃ "NIKE12"</p>
        </div>

        <div className="p-4 flex space-x-1">
          <Eye />
          <p>
            Đang có{" "}
            <span className="inline-block animate-bounce-scale text-red-600 font-bold mx-1">
              145
            </span>{" "}
            người xem sản phẩm này
            <style jsx>{`
              @keyframes bounce-scale {
                0% {
                  transform: translateY(0) scale(1);
                }
                50% {
                  transform: translateY(-5px) scale(1.15);
                }
              }

              .animate-bounce-scale {
                animation: bounce-scale 1s ease-in-out infinite;
              }
            `}</style>
          </p>
        </div>
        <div className="space-y-3 sm:hidden">
          {/* Card 1: Nhận hàng tại store */}
          <div className="border-2 border-black rounded-3xl p-4 bg-gray-50">
            <div className="flex items-start gap-3 mb-3">
              <svg
                className="w-8 h-8 text-purple-600 shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM9 4h6v2H9V4zm11 15H4V8h16v11z" />
              </svg>
              <div>
                <h3 className="font-bold text-sm uppercase">
                  NHẬN HÀNG TẠI STORE
                </h3>
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
                    Chuyển phát nhanh của chúng tôi sẽ giao hàng đến địa chỉ của
                    bạn
                  </p>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-semibold">1-3 Ngày</p>
                    <p className="text-xl font-bold">FREESHIP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Bảo hành */}
          <div className="border-2 border-black rounded-3xl p-4 bg-gray-50">
            <div className="flex items-start gap-3 mb-3">
              <svg
                className="w-8 h-8 text-purple-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-sm uppercase">
                  BẢO HÀNH 12 THÁNG
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <svg
                className="w-8 h-8 text-purple-600 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-sm uppercase">
                  ĐỔI TRẢ MIỄN PHÍ TRONG 30 NGÀY
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-center text-xl font-medium mb-1">
            Giao hàng và trả lại hàng miễn phí
          </p>
          <p>
            *Đơn hàng từ 1.500.000₫ trở lên của bạn sẽ được giao hàng tiêu chuẩn
            miễn phí.
          </p>
          <br />
          <p className="font-bold">* Giao hàng tiêu chuẩn 4-5 ngày làm việc</p>
          <p className="font-bold">
            * Đơn hàng được xử lý và giao từ Thứ Hai đến Thứ Sáu (trừ ngày lễ)
          </p>
        </div>

        <div className="">
          <img src="/size.jpg" alt="" className="" />
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="flex gap-2 mb-3">
            <div className="flex items-center border-2 border-gray-300 rounded-lg">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-gray-100"
              >
                <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <p className="px-2 text-xl">{quantity}</p>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
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
                <Star
                  key={i}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
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
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-black rounded-full"
                    style={{
                      width:
                        item.stars === 5
                          ? "95%"
                          : item.stars === 4
                            ? "5%"
                            : "0%",
                    }}
                  ></div>
                </div>
                <span className="w-12 text-right text-gray-600">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b">
          <h3 className="text-xl font-bold">
            302 ĐÁNH GIÁ CHO SẢN PHẨM TẠI OUTLET
          </h3>
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
                <img
                  src={rv.avatar}
                  alt="ngô huy"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-lg text-pink-600">
                      {rv.userName}
                    </h4>
                    <div className="flex">
                      {[...Array(rv.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{rv.content}</p>
                  {rv.images?.[0] && (
                    <img
                      src={rv.images[0]}
                      alt="Review"
                      className="w-48 h-64 object-cover rounded-lg mb-3"
                    />
                  )}
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
  );
}
