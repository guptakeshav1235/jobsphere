import React, { useEffect, useRef } from 'react';

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

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const scrollAmount = carousel.firstChild.offsetWidth; // Get the width of one item
        const itemCount = category.length;

        // Clone the carousel content to simulate infinite scroll
        const cloneContent = carousel.innerHTML;
        carousel.innerHTML += cloneContent; // Append the clone of the content at the end

        let scrollPosition = 0;
        let isScrolling = false;

        const scrollForward = () => {
            if (isScrolling) return; // Prevent multiple scrolls at once
            isScrolling = true;

            // Scroll forward
            scrollPosition += scrollAmount;
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth',
            });

            // If scroll reaches the end of the original content, reset to the start
            if (scrollPosition >= scrollAmount * itemCount) {
                setTimeout(() => {
                    carousel.scrollTo({
                        left: 0,
                        behavior: 'smooth',
                    });
                    scrollPosition = 0;
                }, 200); // Wait a bit before resetting to give smooth effect
            }

            isScrolling = false;
        };

        const interval = setInterval(scrollForward, 2000); // Adjust interval for scroll speed

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div>
            <div
                className="carousel rounded-box flex overflow-hidden w-full max-w-xl mx-auto"
                ref={carouselRef}
            >
                {category.map((cat, index) => (
                    <div className="carousel-item md:basis-1/2 lg:basis-1/3" key={index}>
                        <button className="btn bg-[#6223ce] btn-neutral text-white">{cat}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryCarousel;
