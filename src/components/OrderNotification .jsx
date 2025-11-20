import React, { useState, useEffect } from 'react'

const OrderNotification = () => {
    const [show, setShow] = useState(false)
    const [customer, setCustomer] = useState(null)

    const names = [
        'Nguyễn Thị Mai',
        'Trần Minh Anh',
        'Lê Hoàng Nam',
        'Phạm Ngọc Lan',
        'Đỗ Anh Tuấn',
        'Vũ Thu Trang',
        'Hoàng Minh Quân',
        'Bùi Thị Hương',
        'Đặng Quốc Bảo',
        'Nguyễn Anh Khoa',
        'Trần Bảo Ngọc',
        'Lê Thị Thu Hà',
        'Phạm Gia Huy',
        'Nguyễn Nhật Linh',
        'Vũ Hoàng Long',
        'Trần Diễm My',
        'Nguyễn Đức Anh',
        'Lê Minh Thư',
        'Phạm Khánh Linh',
        'Hoàng Yến Nhi',
        'Nguyễn Thiên Ân',
        'Trần Bảo Châu',
        'Lê Phúc Lâm',
        'Đỗ Minh Khang',
        'Nguyễn Thảo Linh',
        'Trần Quốc Đạt',
        'Phạm Hồng Nhung',
        'Nguyễn Gia Bảo',
        'Lê Ngọc Ánh',
        'Vũ Đình Phong',
        'Trần Thị Kim Ngân',
        'Nguyễn Hoàng Anh',
        'Phạm Tuấn Kiệt',
        'Lê Bảo Vy',
        'Đặng Thu Phương',
        'Nguyễn Minh Châu',
        'Trần Anh Dũng',
        'Hoàng Thị Ngọc',
        'Bùi Đức Thịnh',
        'Nguyễn Huyền My',
        'Trần Khánh Vân',
        'Lê Tuấn Anh',
        'Phạm Bảo Trân',
        'Nguyễn Phương Anh',
        'Vũ Minh Quân',
        'Trần Lan Anh',
        'Nguyễn Hải Đăng',
        'Lê Thị Diệu Linh',
        'Phạm Hoàng Phúc',
        'Nguyễn Tố Như',
    ]

    useEffect(() => {
        const showNotification = () => {
            const randomName = names[Math.floor(Math.random() * names.length)]
            const randomSeconds = Math.floor(Math.random() * 45) + 5
            const randomAvatar = Math.floor(Math.random() * 70) + 1

            setCustomer({
                name: randomName,
                seconds: randomSeconds,
                avatar: `https://i.pravatar.cc/150?img=${randomAvatar}`,
            })
            setShow(true)

            setTimeout(() => setShow(false), 6000)
        }

        showNotification()
        const interval = setInterval(showNotification, 15000)

        return () => clearInterval(interval)
    }, [])

    if (!show || !customer) return null

    return (
        <div className="fixed top-6 right-6 bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-3 max-w-sm animate-fade-in z-50">
            <img src={customer.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
            <div>
                <p className="font-semibold text-sm text-gray-800">Đặt hàng thành công ✅</p>
                <p className="text-sm text-gray-600">
                    Chúc mừng <strong>{customer.name}</strong> đã đặt hàng thành công
                </p>
                <p className="text-xs text-gray-500 mt-1">{customer.seconds} giây trước</p>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out;
                }
            `}</style>
        </div>
    )
}

export default OrderNotification
