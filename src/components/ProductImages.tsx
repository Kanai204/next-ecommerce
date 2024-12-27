"use client"

import Image from "next/image"
import { useState } from "react"

const images = [
    {
        id: 1,
        url: "https://images.pexels.com/photos/29643350/pexels-photo-29643350/free-photo-of-elegant-christmas-decor-on-grand-piano.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
    },
    {
        id: 2,
        url: "https://images.pexels.com/photos/28861054/pexels-photo-28861054/free-photo-of-mother-and-child-in-catrina-costumes-in-mexico-city.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
    },
    {
        id: 3,
        url: "https://images.pexels.com/photos/19650796/pexels-photo-19650796/free-photo-of-smiling-woman-shooting-confetti-cannon-sitting-in-the-living-room-by-the-christmas-tree.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
    },
    {
        id: 4,
        url: "https://images.pexels.com/photos/29734216/pexels-photo-29734216/free-photo-of-cozy-winter-embrace-of-mother-and-child.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
    },
]

const ProductImages = () => {

    const [index, setIndex] = useState(0)

    return (
        <div className="">
            <div className="h-[500px] relative">
                <Image
                    src={images[index].url}
                    alt=""
                    fill
                    sizes="50vw"
                    className="object-cover rounded-md"
                />
            </div>
            <div className="flex justify-between gap-4 mt-8">
                {images.map((img, i) => (
                    <div className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
                        key={img.id}
                        onClick={() => setIndex(i)}
                    >
                        <Image
                            src={img.url}
                            alt=""
                            fill
                            sizes="30vw"
                            className="object-cover rounded-md"
                        />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ProductImages
