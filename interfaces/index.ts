export interface ProductCardProps {
	src: string;
	title: string;
	price: number;
	rating: number;
}

export interface BlueButtonProps {
	text: string;
	onClick?: () => void;
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

// Interface for Category fetching
export interface Category {
	id: string;
	name: string;
	image: string;
}

// Interface for Product fetching
export interface Product {
	id: string | number; // Fake Store returns numeric IDs
	title: string;
	price: number;
	description: string;
	category: string;
	image?: string;      // single image from Fake Store
	images?: string[];   // optional array for farmProducts
	rating?: { rate: number; count: number };
}


export interface Params {
	params: { categoryId: string };
}
