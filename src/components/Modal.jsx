import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // chặn click trong modal
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Thông Tin Giao Hàng</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
                        &times;
                    </button>
                </div>

                {children}
            </div>
        </div>
    )
}

export default Modal
