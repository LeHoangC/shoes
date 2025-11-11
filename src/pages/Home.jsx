import React from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import Products from '../../product.json'

const Home = () => {
    return (
        <div>
            <Header />
            <div className="max-w-7xl sm:h-[80vh] 3xl:h-[50vh] mx-auto">
                <img src="thumb.png" alt="" className="w-full max-h-full object-fill" />
            </div>
            <div className="max-w-7xl h-[40vh] sm:h-[70vh] mx-auto">
                <video src="video.mp4" controls autoPlay loop muted className="w-full max-h-full object-cover"></video>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Products.map((pro) => (
                    <ProductCard product={pro} key={pro.id} />
                ))}
            </div>
        </div>
    )
}

export default Home
