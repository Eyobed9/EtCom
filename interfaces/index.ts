export interface ProductCardProps {
    src: string;
    title: string;
    price: number;
    rating: number;
}

export interface BlueButtonProps {
    text: string;
}

// Interface for home page titles
export interface TitleProps {
	text: string;
}

// Interface for testimonial cards
export interface TestimonialCardProps {
    stars?: number;
    author: string;
    testimony: string;
}

