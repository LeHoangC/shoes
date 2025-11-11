import React, { useState, useMemo } from 'react'
import { Search, MapPin, ChevronDown, User, Phone, Home } from 'lucide-react'
import vietnamData from '../../address.json'

// Dữ liệu mẫu theo cấu trúc của bạn
// const vietnamData = {
//     provinces: {
//         '01': {
//             name: 'Thành phố Hà Nội',
//             children: ['001', '002', '003', '004', '005'],
//         },
//         79: {
//             name: 'Thành phố Hồ Chí Minh',
//             children: ['760', '761', '769', '770'],
//         },
//         48: {
//             name: 'Thành phố Đà Nẵng',
//             children: ['490', '491', '492'],
//         },
//         10: {
//             name: 'Tỉnh Lào Cai',
//             children: ['080', '082', '083'],
//         },
//         11: {
//             name: 'Tỉnh Điện Biên',
//             children: ['100', '101', '102'],
//         },
//     },
//     districts: {
//         '001': {
//             name: 'Quận Ba Đình',
//             parent: '01',
//             children: ['00001', '00002', '00003', '00004', '00005'],
//         },
//         '002': {
//             name: 'Quận Hoàn Kiếm',
//             parent: '01',
//             children: ['00006', '00007', '00008', '00009', '00010'],
//         },
//         '003': {
//             name: 'Quận Cầu Giấy',
//             parent: '01',
//             children: ['00011', '00012', '00013', '00014'],
//         },
//         '004': {
//             name: 'Quận Đống Đa',
//             parent: '01',
//             children: ['00015', '00016', '00017'],
//         },
//         '005': {
//             name: 'Quận Hai Bà Trưng',
//             parent: '01',
//             children: ['00018', '00019', '00020'],
//         },
//         760: {
//             name: 'Quận 1',
//             parent: '79',
//             children: ['26734', '26735', '26736', '26737', '26738'],
//         },
//         761: {
//             name: 'Quận 3',
//             parent: '79',
//             children: ['26740', '26741', '26742', '26743'],
//         },
//         769: {
//             name: 'Thành phố Thủ Đức',
//             parent: '79',
//             children: ['27085', '27086', '27087', '27088'],
//         },
//         770: {
//             name: 'Quận 5',
//             parent: '79',
//             children: ['27089', '27090', '27091'],
//         },
//         490: {
//             name: 'Quận Hải Châu',
//             parent: '48',
//             children: ['20194', '20195', '20196'],
//         },
//         491: {
//             name: 'Quận Sơn Trà',
//             parent: '48',
//             children: ['20197', '20198', '20199'],
//         },
//         492: {
//             name: 'Quận Ngũ Hành Sơn',
//             parent: '48',
//             children: ['20200', '20201', '20202'],
//         },
//         '080': {
//             name: 'Thành phố Lào Cai',
//             parent: '10',
//             children: ['02500', '02501', '02502'],
//         },
//         '082': {
//             name: 'Huyện Bát Xát',
//             parent: '10',
//             children: ['02503', '02504', '02505'],
//         },
//         '083': {
//             name: 'Huyện Sa Pa',
//             parent: '10',
//             children: ['02506', '02507', '02508'],
//         },
//         100: {
//             name: 'Huyện Điện Biên',
//             parent: '11',
//             children: ['03319', '03322', '03323'],
//         },
//         101: {
//             name: 'Thành phố Điện Biên Phủ',
//             parent: '11',
//             children: ['03324', '03325', '03326'],
//         },
//         102: {
//             name: 'Huyện Mường Lay',
//             parent: '11',
//             children: ['03327', '03328', '03329'],
//         },
//     },
//     wards: {
//         '00001': { name: 'Phường Phúc Xá', parent: '001' },
//         '00002': { name: 'Phường Trúc Bạch', parent: '001' },
//         '00003': { name: 'Phường Vĩnh Phúc', parent: '001' },
//         '00004': { name: 'Phường Cống Vị', parent: '001' },
//         '00005': { name: 'Phường Liễu Giai', parent: '001' },
//         '00006': { name: 'Phường Phan Chu Trinh', parent: '002' },
//         '00007': { name: 'Phường Tràng Tiền', parent: '002' },
//         '00008': { name: 'Phường Hàng Bài', parent: '002' },
//         '00009': { name: 'Phường Hàng Đào', parent: '002' },
//         '00010': { name: 'Phường Hàng Bồ', parent: '002' },
//         '00011': { name: 'Phường Nghĩa Đô', parent: '003' },
//         '00012': { name: 'Phường Nghĩa Tân', parent: '003' },
//         '00013': { name: 'Phường Dịch Vọng', parent: '003' },
//         '00014': { name: 'Phường Quan Hoa', parent: '003' },
//         '00015': { name: 'Phường Cát Linh', parent: '004' },
//         '00016': { name: 'Phường Văn Miếu', parent: '004' },
//         '00017': { name: 'Phường Quốc Tử Giám', parent: '004' },
//         '00018': { name: 'Phường Nguyễn Du', parent: '005' },
//         '00019': { name: 'Phường Bùi Thị Xuân', parent: '005' },
//         '00020': { name: 'Phường Lê Đại Hành', parent: '005' },
//         26734: { name: 'Phường Tân Định', parent: '760' },
//         26735: { name: 'Phường Đa Kao', parent: '760' },
//         26736: { name: 'Phường Bến Nghé', parent: '760' },
//         26737: { name: 'Phường Bến Thành', parent: '760' },
//         26738: { name: 'Phường Nguyễn Thái Bình', parent: '760' },
//         26740: { name: 'Phường Võ Thị Sáu', parent: '761' },
//         26741: { name: 'Phường 1', parent: '761' },
//         26742: { name: 'Phường 2', parent: '761' },
//         26743: { name: 'Phường 3', parent: '761' },
//         27085: { name: 'Phường Linh Xuân', parent: '769' },
//         27086: { name: 'Phường Bình Chiểu', parent: '769' },
//         27087: { name: 'Phường Linh Trung', parent: '769' },
//         27088: { name: 'Phường Tam Bình', parent: '769' },
//         27089: { name: 'Phường 1', parent: '770' },
//         27090: { name: 'Phường 2', parent: '770' },
//         27091: { name: 'Phường 3', parent: '770' },
//         20194: { name: 'Phường Thạch Thang', parent: '490' },
//         20195: { name: 'Phường Hải Châu 1', parent: '490' },
//         20196: { name: 'Phường Hải Châu 2', parent: '490' },
//         20197: { name: 'Phường Thọ Quang', parent: '491' },
//         20198: { name: 'Phường Nại Hiên Đông', parent: '491' },
//         20199: { name: 'Phường Mân Thái', parent: '491' },
//         20200: { name: 'Phường Mỹ An', parent: '492' },
//         20201: { name: 'Phường Khuê Mỹ', parent: '492' },
//         20202: { name: 'Phường Hòa Quý', parent: '492' },
//         '02500': { name: 'Phường Kim Tân', parent: '080' },
//         '02501': { name: 'Phường Lào Cai', parent: '080' },
//         '02502': { name: 'Phường Cốc Lếu', parent: '080' },
//         '02503': { name: 'Xã A Lù', parent: '082' },
//         '02504': { name: 'Xã Trịnh Tường', parent: '082' },
//         '02505': { name: 'Xã Y Tý', parent: '082' },
//         '02506': { name: 'Thị trấn Sa Pa', parent: '083' },
//         '02507': { name: 'Xã Tả Van', parent: '083' },
//         '02508': { name: 'Xã Lao Chải', parent: '083' },
//         '03319': { name: 'Xã Mường Pồn', parent: '100' },
//         '03322': { name: 'Xã Pá Khoang', parent: '100' },
//         '03323': { name: 'Xã Nậm Pì', parent: '100' },
//         '03324': { name: 'Phường Mường Thanh', parent: '101' },
//         '03325': { name: 'Phường Him Lam', parent: '101' },
//         '03326': { name: 'Phường Noong Bua', parent: '101' },
//         '03327': { name: 'Thị trấn Mường Lay', parent: '102' },
//         '03328': { name: 'Xã Lay Nưa', parent: '102' },
//         '03329': { name: 'Xã Nậm Hàng', parent: '102' },
//     },
// }

// Hàm loại bỏ dấu tiếng Việt
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    className={`w-full px-4 py-2.5 text-left bg-white border rounded-lg shadow-sm transition-all
            ${disabled ? 'bg-gray-50 cursor-not-allowed text-gray-400' : 'hover:border-blue-400 cursor-pointer'}
            ${isOpen ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'}
          `}
                >
                    <span className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
                        {selectedOption ? selectedOption.name : placeholder}
                    </span>
                    <ChevronDown
                        className={`absolute right-3 top-3 w-5 h-5 text-gray-400 transition-transform ${
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
                                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Tìm kiếm..."
                                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                            </div>
                            <div className="overflow-y-auto max-h-60">
                                {filteredOptions.length === 0 ? (
                                    <div className="px-4 py-3 text-sm text-gray-500 text-center">
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
                                            className={`w-full px-4 py-2.5 text-left hover:bg-blue-50 transition-colors
                        ${value === option.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}
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
const TextInput = ({ label, icon: Icon, value, onChange, placeholder, required, type = 'text' }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
                <Icon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
            </div>
        </div>
    )
}

export default function AddressForm({ sizes }) {
    const [fullName, setFullName] = useState('')
    const [selectSize, setSelectSize] = useState('')
    const [phone, setPhone] = useState('')
    const [specificAddress, setSpecificAddress] = useState('')
    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')

    // Chuyển đổi provinces thành array để hiển thị
    const provinces = useMemo(() => {
        return Object.entries(vietnamData.provinces).map(([id, data]) => ({
            id,
            name: data.name,
        }))
    }, [])

    // Lấy danh sách huyện dựa vào tỉnh đã chọn
    const districts = useMemo(() => {
        if (!selectedProvince) return []
        const province = vietnamData.provinces[selectedProvince]
        if (!province) return []

        return province.children.map((districtId) => ({
            id: districtId,
            name: vietnamData.districts[districtId].name,
        }))
    }, [selectedProvince])

    // Lấy danh sách xã dựa vào huyện đã chọn
    const wards = useMemo(() => {
        if (!selectedDistrict) return []
        const district = vietnamData.districts[selectedDistrict]
        if (!district) return []

        return district.children.map((wardId) => ({
            id: wardId,
            name: vietnamData.wards[wardId].name,
        }))
    }, [selectedDistrict])

    // Reset huyện và xã khi đổi tỉnh
    const handleProvinceChange = (provinceId) => {
        setSelectedProvince(provinceId)
        setSelectedDistrict('')
        setSelectedWard('')
    }

    // Reset xã khi đổi huyện
    const handleDistrictChange = (districtId) => {
        setSelectedDistrict(districtId)
        setSelectedWard('')
    }

    // Lấy địa chỉ đầy đủ
    const getFullAddress = () => {
        const parts = []
        if (specificAddress) parts.push(specificAddress)
        if (selectedWard) parts.push(vietnamData.wards[selectedWard].name)
        if (selectedDistrict) parts.push(vietnamData.districts[selectedDistrict].name)
        if (selectedProvince) parts.push(vietnamData.provinces[selectedProvince].name)

        return parts.length > 0 ? parts.join(', ') : ''
    }

    // Kiểm tra form hợp lệ
    const isFormValid =
        fullName && phone && selectedProvince && selectedDistrict && selectedWard && specificAddress && selectSize

    // Xử lý submit
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isFormValid) {
            alert('Vui lòng điền đầy đủ thông tin!')
            return
        }

        const formData = {
            fullName,
            phone,
            selectSize,
            specificAddress,
            fullAddress: getFullAddress(),
        }

        console.log('Form Data:', formData)
    }

    return (
        <div className="bg-linear-to-br from-blue-50 to-indigo-100 p-6">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <MapPin className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Thông Tin Giao Hàng</h1>
                            <p className="text-sm text-gray-500">Vui lòng điền đầy đủ thông tin bên dưới</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Họ tên */}
                        <TextInput
                            label="Họ và tên"
                            icon={User}
                            value={fullName}
                            onChange={setFullName}
                            placeholder="Nguyễn Văn A"
                            required
                        />

                        {/* Số điện thoại */}
                        <TextInput
                            label="Số điện thoại"
                            icon={Phone}
                            value={phone}
                            onChange={setPhone}
                            placeholder="0123456789"
                            required
                            type="tel"
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

                        {sizes.map((size) => (
                            <>
                                <input type="radio" name="size" id={size} onChange={() => setSelectSize(size)} />
                                <label className="mr-2" htmlFor={size}>
                                    {' '}
                                    SIZE {size}
                                </label>
                            </>
                        ))}

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
        </div>
    )
}
