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

// Interface for Category fetching
export interface Category {
	id: string;
	name: string;
	image: string;
}

// Interface for Product fetching
export interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	images: string[];
	category?: Category;
}

export interface Params {
	params: { categoryId: string };
}
