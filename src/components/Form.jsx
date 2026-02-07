import { useState, useMemo, useEffect } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  User,
  Phone,
  Home,
  Loader2,
} from "lucide-react";
import vietnamData from "../../address.json";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { ChevronRight } from "lucide-react";

const removeVietnameseTones = (str) => {
  if (!str) return "";
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
};

// Component Select với tìm kiếm
const SearchableSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const searchTerm = removeVietnameseTones(search);
    return options.filter((opt) =>
      removeVietnameseTones(opt.name).includes(searchTerm),
    );
  }, [options, search]);

  const selectedOption = options.find((opt) => opt.id === value);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full px-4 py-3 text-left bg-white border-2 rounded-2xl shadow-sm transition-all text-base
                        ${
                          disabled
                            ? "bg-slate-50 cursor-not-allowed text-slate-400 border-slate-100"
                            : "hover:border-primary/50 cursor-pointer active:scale-[0.98] border-slate-200"
                        }
                        ${isOpen ? "border-primary ring-4 ring-primary/10 shadow-lg" : ""}
                    `}
        >
          <span
            className={
              selectedOption
                ? "text-slate-900 font-semibold"
                : "text-slate-400 font-medium"
            }
          >
            {selectedOption ? selectedOption.name : placeholder}
          </span>
          <ChevronDown
            className={`absolute right-4 top-4 w-5 h-5 text-slate-400 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-primary" : ""
            }`}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden">
              <div className="p-2 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm..."
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
              <div className="overflow-y-auto max-h-60">
                {filteredOptions.length === 0 ? (
                  <div className="px-3 py-3 text-xs sm:text-sm text-gray-500 text-center">
                    Không tìm thấy kết quả
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        onChange(option.id);
                        setIsOpen(false);
                        setSearch("");
                      }}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-sm hover:bg-blue-50 transition-colors
                                                ${
                                                  value === option.id
                                                    ? "bg-blue-100 text-blue-700 font-medium"
                                                    : "text-gray-700"
                                                }
                                            `}
                    >
                      {option.name}
                    </button>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Component Input thông thường
const TextInput = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  error,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <Icon className="absolute left-4 top-4 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-12 pr-4 py-3.5 text-base border-2 rounded-2xl focus:outline-none transition-all duration-300 shadow-xs ${
            error
              ? "border-red-300 focus:ring-4 focus:ring-red-100 focus:border-red-500"
              : "border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
    </div>
  );
};

export default function AddressForm({ sizes, name }) {
  const [fullName, setFullName] = useState("");
  const [selectSize, setSelectSize] = useState("");
  const [phone, setPhone] = useState("");
  const [specificAddress, setSpecificAddress] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [initialLoadTime] = useState(Date.now());
  const [turnstileToken, setTurnstileToken] = useState("");

  // Render Turnstile
  useEffect(() => {
    const renderTurnstile = () => {
      if (window.turnstile) {
        // Xóa nội dung cũ để tránh bị render đúp (do React Strict Mode)
        const container = document.getElementById("turnstile-container");
        if (container) container.innerHTML = "";

        window.turnstile.render("#turnstile-container", {
          sitekey: import.meta.env.VITE_TURNSTILE_SECRET, // Đảm bảo đây là SITE KEY
          callback: (token) => setTurnstileToken(token),
          "error-callback": () => setTurnstileToken(""),
          "expired-callback": () => setTurnstileToken(""),
        });
      }
    };

    renderTurnstile();
  }, []);

  // Validate tên
  const validateName = (name) => {
    if (!name.trim()) return "Họ tên không được để trống";
    if (name.trim().length < 4) return "Họ tên phải có ít nhất 4 ký tự";
    return "";
  };

  // Validate số điện thoại
  const validatePhone = (phone) => {
    if (!phone.trim()) return "Số điện thoại không được để trống";
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, "")))
      return "Số điện thoại không hợp lệ";
    return "";
  };

  // Xử lý thay đổi tên
  const handleNameChange = (value) => {
    setFullName(value);
    if (errors.fullName) {
      setErrors((prev) => ({ ...prev, fullName: validateName(value) }));
    }
  };

  // Xử lý thay đổi số điện thoại
  const handlePhoneChange = (value) => {
    setPhone(value);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    }
  };

  const provinces = useMemo(() => {
    return Object.entries(vietnamData.provinces).map(([id, data]) => ({
      id,
      name: data.name,
    }));
  }, []);

  const districts = useMemo(() => {
    if (!selectedProvince) return [];
    const province = vietnamData.provinces[selectedProvince];
    if (!province) return [];

    return province.children.map((districtId) => ({
      id: districtId,
      name: vietnamData.districts[districtId].name,
    }));
  }, [selectedProvince]);

  const wards = useMemo(() => {
    if (!selectedDistrict) return [];
    const district = vietnamData.districts[selectedDistrict];
    if (!district) return [];

    return district.children.map((wardId) => ({
      id: wardId,
      name: vietnamData.wards[wardId].name,
    }));
  }, [selectedDistrict]);

  const handleProvinceChange = (provinceId) => {
    setSelectedProvince(provinceId);
    setSelectedDistrict("");
    setSelectedWard("");
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedWard("");
  };

  const getFullAddress = () => {
    const parts = [];
    if (specificAddress) parts.push(specificAddress);
    if (selectedWard) parts.push(vietnamData.wards[selectedWard].name);
    if (selectedDistrict)
      parts.push(vietnamData.districts[selectedDistrict].name);
    if (selectedProvince)
      parts.push(vietnamData.provinces[selectedProvince].name);

    return parts.length > 0 ? parts.join(", ") : "";
  };

  const isFormValid =
    fullName &&
    phone &&
    selectedProvince &&
    selectedDistrict &&
    selectedWard &&
    specificAddress &&
    selectSize;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate tất cả các trường
    const nameError = validateName(fullName);
    const phoneError = validatePhone(phone);

    const newErrors = {
      fullName: nameError,
      phone: phoneError,
    };

    if (phoneError || nameError) {
      setErrors(newErrors);
      return;
    }

    // Chống bot: Kiểm tra Honeypot
    if (honeypot) {
      console.warn("Bot detected: Honeypot filled");
      return;
    }

    // Chống bot: Kiểm tra thời gian submit (chặn nếu dưới 3 giây)
    const timeElapsed = (Date.now() - initialLoadTime) / 1000;
    if (timeElapsed < 3) {
      console.warn("Bot detected: Submission too fast");
      alert("Thao tác quá nhanh, vui lòng thử lại sau giây lát.");
      return;
    }

    // Chống bot: Kiểm tra Turnstile
    if (!turnstileToken) {
      alert("Vui lòng xác nhận bạn không phải là robot!");
      return;
    }

    // Kiểm tra nếu có lỗi
    if (!isFormValid) {
      alert("Vui lòng điền đầy đủ và chính xác thông tin!");
      return;
    }

    const formData = {
      fullName,
      phone,
      fullAddress: getFullAddress(),
      productName: name,
      quantity: quantity,
      selectSize,
    };

    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_URL_GG_SHEET, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Hiển thị popup thành công
      setShowSuccess(true);
      setLoading(false);

      // Tự động ẩn sau 3 giây
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Lỗi:", error);
      setLoading(false);
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="bg-slate-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-2xl p-6 sm:p-10 border border-slate-100">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Thông Tin Giao Hàng
              </h1>
              <p className="text-slate-500 font-medium">
                Hoàn tất đơn hàng của bạn chỉ trong vài bước
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Họ tên */}
            <TextInput
              label="Họ và tên"
              icon={User}
              value={fullName}
              onChange={handleNameChange}
              placeholder="Nguyễn Văn A"
              required
              error={errors.fullName}
            />

            {/* Số điện thoại */}
            <TextInput
              label="Số điện thoại"
              icon={Phone}
              value={phone}
              onChange={handlePhoneChange}
              placeholder="0123456789"
              required
              type="tel"
              error={errors.phone}
            />

            {/* Tỉnh/Thành phố */}
            <SearchableSelect
              label="Tỉnh/Thành phố"
              options={provinces}
              value={selectedProvince}
              onChange={handleProvinceChange}
              placeholder="Chọn tỉnh/thành phố"
            />

            {/* Quận/Huyện */}
            <SearchableSelect
              label="Quận/Huyện"
              options={districts}
              value={selectedDistrict}
              onChange={handleDistrictChange}
              placeholder="Chọn quận/huyện"
              disabled={!selectedProvince}
            />

            {/* Phường/Xã */}
            <SearchableSelect
              label="Phường/Xã"
              options={wards}
              value={selectedWard}
              onChange={setSelectedWard}
              placeholder="Chọn phường/xã"
              disabled={!selectedDistrict}
            />

            {/* Địa chỉ cụ thể */}
            <TextInput
              label="Địa chỉ cụ thể"
              icon={Home}
              value={specificAddress}
              onChange={setSpecificAddress}
              placeholder="Số nhà, tên đường..."
              required
            />

            {/* Hiển thị địa chỉ đầy đủ */}
            {getFullAddress() && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Địa chỉ đầy đủ:
                </p>
                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                  <p className="text-gray-900 font-medium">
                    {getFullAddress()}
                  </p>
                </div>
              </div>
            )}

            <p className="text-xl font-black text-slate-900 mt-8 mb-4">
              Kích thước sản phẩm
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {sizes.map((size) => (
                <label key={size} className="relative group">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    onChange={() => setSelectSize(size)}
                    className="hidden peer"
                  />
                  <span className="flex items-center justify-center py-3 border-2 border-slate-200 rounded-xl cursor-pointer transition-all duration-300 font-bold text-slate-600 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary hover:border-slate-400 group-hover:scale-[1.05]">
                    {size}
                  </span>
                </label>
              ))}
            </div>

            <p className="text-xl font-black text-slate-900 mt-8 mb-4">
              Số lượng đặt hàng
            </p>
            <div className="flex items-center w-fit bg-slate-100 rounded-2xl p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-4 hover:bg-white hover:shadow-sm rounded-xl transition-all active:scale-90"
              >
                <Minus className="w-5 h-5 text-slate-600" />
              </button>
              <span className="px-8 text-2xl font-black text-slate-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-4 hover:bg-white hover:shadow-sm rounded-xl transition-all active:scale-90"
              >
                <Plus className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Turnstile Container */}
            <div id="turnstile-container" className="my-4"></div>

            {/* Honeypot field - Hidden from users, only visible to bots */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website_url"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {/* Nút submit */}
            <div className="pt-8">
              <button
                type="submit"
                disabled={!isFormValid || loading}
                className={`w-full py-5 rounded-[20px] font-black text-xl transition-all duration-500 shadow-xl flex justify-center items-center gap-3
                                    ${
                                      isFormValid
                                        ? "bg-primary hover:bg-primary-dark text-white shadow-primary/30 hover:shadow-primary/40 active:scale-[0.98]"
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                                    }
                                `}
              >
                {loading ? (
                  <Loader2 className="h-7 w-7 animate-spin" />
                ) : (
                  <>
                    <span>XÁC NHẬN ĐẶT HÀNG</span>
                    <ChevronRight className="w-6 h-6" />
                  </>
                )}
              </button>
              <p className="text-center text-slate-400 text-sm mt-4 font-medium">
                Bằng cách đặt hàng, bạn đồng ý với các điều khoản của chúng tôi
              </p>
            </div>
          </form>
        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-bounce-in scale-100 bg-linear-to-r from-green-400 to-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 transform transition-all duration-300">
            <svg
              className="w-8 h-8 animate-spin-slow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-bold text-lg">Thành công!</p>
              <p className="text-sm opacity-90">Đặt hàng thành công.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
