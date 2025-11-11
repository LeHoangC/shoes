import { Menu, Search, User, ShoppingCart } from 'lucide-react'

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Menu Icon */}
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Menu className="w-6 h-6" />
                </button>

                {/* Nike Logo */}
                <div className="flex-1 flex justify-center">
                    <div className="relative">
                        <svg viewBox="0 0 69 32" className="w-16 h-7 fill-current">
                            <path d="M68.56 4L18.4 25.36Q12.16 28 7.92 28q-4.8 0-6.96-3.36-1.36-2.16-.8-5.48t2.96-7.08q2-3.04 6.56-8-1.6 2.56-2.24 5.28-1.2 5.12 2.4 7.52Q13.6 19 18.72 16.4l50.16-21.44q.72-.32 1.28-.32.64 0 .64.72 0 .48-.24.64z" />
                        </svg>
                    </div>
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Search className="w-6 h-6" />
                    </button>

                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <User className="w-6 h-6" />
                    </button>

                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                            0
                        </span>
                    </button>
                </div>
            </div>
        </header>
    )
}
