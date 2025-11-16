import React, { useState, useMemo } from 'react'
import { Search, MapPin, ChevronDown, User, Phone, Home } from 'lucide-react'
import vietnamData from '../../address.json'
import { Minus } from 'lucide-react'
import { Plus } from 'lucide-react'

const removeVietnameseTones = (str) => {
    if (!str) return ''
    str = str.toLowerCase()
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
    str = str.replace(/đ/g, 'd')
    return str
}

// Component Select với tìm kiếm
const SearchableSelect = ({ label, options, value, onChange, placeholder, disabled }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')

    const filteredOptions = useMemo(() => {
        if (!search) return options
        const searchTerm = removeVietnameseTones(search)
        return options.filter((opt) => removeVietnameseTones(opt.name).includes(searchTerm))
    }, [options, search])

    const selectedOption = options.find((opt) => opt.id === value)

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
                    className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left bg-white border rounded-lg shadow-sm transition-all text-sm sm:text-base
                        ${
                            disabled
                                ? 'bg-gray-50 cursor-not-allowed text-gray-400'
                                : 'hover:border-blue-400 cursor-pointer active:scale-[0.98]'
                        }
                        ${isOpen ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}
                    `}
                >
                    <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedOption ? selectedOption.name : placeholder}
                    </span>
                    <ChevronDown
                        className={`absolute right-2.5 sm:right-3 top-2.5 sm:top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </button>

                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
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
                                                onChange(option.id)
                                                setIsOpen(false)
                                                setSearch('')
                                            }}
                                            className={`w-full px-3 sm:px-4 py-2 sm:py-2.5 text-left text-sm hover:bg-blue-50 transition-colors
                                                ${
                                                    value === option.id
                                                        ? 'bg-blue-100 text-blue-700 font-medium'
                                                        : 'text-gray-700'
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
    )
}

// Component Input thông thường
const TextInput = ({ label, icon: Icon, value, onChange, placeholder, required, type = 'text', error }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <Icon className="absolute left-2.5 sm:left-3 top-2.5 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        error
                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                    }`}
                />
            </div>
            {error && <p className="text-red-500 text-xs sm:text-sm mt-1">{error}</p>}
        </div>
    )
}

export default function AddressForm({ sizes, name }) {
    const [fullName, setFullName] = useState('')
    const [selectSize, setSelectSize] = useState('')
    const [phone, setPhone] = useState('')
    const [specificAddress, setSpecificAddress] = useState('')
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [showSuccess, setShowSuccess] = useState(false)
    const [errors, setErrors] = useState({})

    // Validate tên
    const validateName = (name) => {
        if (!name.trim()) return 'Họ tên không được để trống'
        if (name.trim().length < 4) return 'Họ tên phải có ít nhất 4 ký tự'
        return ''
    }

    // Validate số điện thoại
    const validatePhone = (phone) => {
        if (!phone.trim()) return 'Số điện thoại không được để trống'
        const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/
        if (!phoneRegex.test(phone.replace(/\s/g, ''))) return 'Số điện thoại không hợp lệ'
        return ''
    }

    // Xử lý thay đổi tên
    const handleNameChange = (value) => {
        setFullName(value)
        if (errors.fullName) {
            setErrors((prev) => ({ ...prev, fullName: validateName(value) }))
        }
    }

    // Xử lý thay đổi số điện thoại
    const handlePhoneChange = (value) => {
        setPhone(value)
        if (errors.phone) {
            setErrors((prev) => ({ ...prev, phone: validatePhone(value) }))
        }
    }

    const provinces = useMemo(() => {
        return Object.entries(vietnamData.provinces).map(([id, data]) => ({
            id,
            name: data.name,
        }))
    }, [])

    const districts = useMemo(() => {
        if (!selectedProvince) return []
        const province = vietnamData.provinces[selectedProvince]
        if (!province) return []

        return province.children.map((districtId) => ({
            id: districtId,
            name: vietnamData.districts[districtId].name,
        }))
    }, [selectedProvince])

    const wards = useMemo(() => {
        if (!selectedDistrict) return []
        const district = vietnamData.districts[selectedDistrict]
        if (!district) return []

        return district.children.map((wardId) => ({
            id: wardId,
            name: vietnamData.wards[wardId].name,
        }))
    }, [selectedDistrict])

    const handleProvinceChange = (provinceId) => {
        setSelectedProvince(provinceId)
        setSelectedDistrict('')
        setSelectedWard('')
    }

    const handleDistrictChange = (districtId) => {
        setSelectedDistrict(districtId)
        setSelectedWard('')
    }

    const getFullAddress = () => {
        const parts = []
        if (specificAddress) parts.push(specificAddress)
        if (selectedWard) parts.push(vietnamData.wards[selectedWard].name)
        if (selectedDistrict) parts.push(vietnamData.districts[selectedDistrict].name)
        if (selectedProvince) parts.push(vietnamData.provinces[selectedProvince].name)

        return parts.length > 0 ? parts.join(', ') : ''
    }

    const isFormValid =
        fullName && phone && selectedProvince && selectedDistrict && selectedWard && specificAddress && selectSize

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validate tất cả các trường
        const nameError = validateName(fullName)
        const phoneError = validatePhone(phone)

        const newErrors = {
            fullName: nameError,
            phone: phoneError,
        }

        if (phoneError || nameError) {
            setErrors(newErrors)
            return
        }

        // Kiểm tra nếu có lỗi
        if (!isFormValid) {
            alert('Vui lòng điền đầy đủ và chính xác thông tin!')
            return
        }

        const formData = {
            fullName,
            phone,
            fullAddress: getFullAddress(),
            productName: name,
            quantity: quantity,
            selectSize,
        }

        try {
            const response = await fetch(
                'https://script.google.com/macros/s/AKfycbw7W1uSaItotVttnbJCC6eXVHCG3FIqNJoJkK2cCskITKzPnLeYS7xeaqUcspkpjric/exec',
                {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                }
            )

            // Hiển thị popup thành công
            setShowSuccess(true)

            // Tự động ẩn sau 3 giây
            setTimeout(() => {
                setShowSuccess(false)
            }, 3000)
        } catch (error) {
            console.error('Lỗi:', error)
            alert('Có lỗi xảy ra. Vui lòng thử lại!')
        }
    }

    return (
        <div className="bg-linear-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <MapPin className="w-4 sm:w-6 h-4 sm:h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-sm sm:text-2xl font-bold text-gray-900">Thông Tin Giao Hàng</h1>
                            <p className="text-sm text-gray-500">Vui lòng điền đầy đủ thông tin bên dưới</p>
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
                                <p className="text-sm font-medium text-gray-600 mb-2">Địa chỉ đầy đủ:</p>
                                <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                                    <p className="text-gray-900 font-medium">{getFullAddress()}</p>
                                </div>
                            </div>
                        )}

                        <p className="text-base sm:text-xl font-bold">Kích thước</p>
                        {sizes.map((size) => (
                            <label key={size} className="inline-block mr-2 mb-2">
                                <input
                                    type="radio"
                                    name="size"
                                    value={size}
                                    onChange={() => setSelectSize(size)}
                                    className="hidden peer"
                                />
                                <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border-2 border-gray-300 rounded-lg cursor-pointer transition-all hover:border-gray-500 peer-checked:border-blue-500 peer-checked:bg-blue-50 font-semibold">
                                    {size}
                                </span>
                            </label>
                        ))}

                        <p className="text-base sm:text-xl font-bold">Số lượng đặt hàng</p>
                        <div className="flex items-center rounded-lg">
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

                        {/* Nút submit */}
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`w-full py-3 rounded-lg font-medium transition-all shadow-md
                ${
                    isFormValid
                        ? 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
                        >
                            {isFormValid ? 'Xác nhận thông tin' : 'Vui lòng điền đầy đủ thông tin'}
                        </button>
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
                            <p className="text-sm opacity-90">Thông tin đã được gửi đi.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
