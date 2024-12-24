import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Machine Learning",
    "Dotnet Developer",
    "Artificial Intelligence",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const carouselRef = useRef(null);
    const [scrolling, setScrolling] = useState(false);
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        if (query.trim()) {
            navigate(`/browse?search=${encodeURIComponent(query)}`);
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const scrollAmount = carousel.firstChild.offsetWidth; // Width of one item
        const scrollSpeed = 2000; // Time in ms for each scroll
        let scrollPosition = 0;

        const scrollForward = () => {
            if (!scrolling) {
                scrollPosition += scrollAmount;

                carousel.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                });

                // Reset to start when reaching the end
                if (scrollPosition >= scrollAmount * category.length) {
                    setTimeout(() => {
                        carousel.scrollTo({ left: 0, behavior: "auto" });
                        scrollPosition = 0;
                    }, 500); // Small delay for smooth reset
                }
            }
        };

        const interval = setInterval(scrollForward, scrollSpeed);

        return () => clearInterval(interval); // Cleanup on unmount
    }, [scrolling]);

    return (
        <div>
            <div
                className="carousel rounded-box flex overflow-hidden w-full max-w-xl mx-auto"
                ref={carouselRef}
                onMouseEnter={() => setScrolling(true)} // Pause scrolling on hover
                onMouseLeave={() => setScrolling(false)} // Resume scrolling on leave
            >
                {category.map((cat, index) => (
                    <div
                        className="carousel-item md:basis-1/2 lg:basis-1/3"
                        key={index}
                    >
                        <button
                            onClick={() => searchJobHandler(cat)}
                            className="btn bg-[#6223ce] btn-neutral text-white"
                        >
                            {cat}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCarousel;
