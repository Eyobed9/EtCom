import { ProductCardProps } from "@/interfaces";
import Image from "next/image";

const ProductCard: React.FC<ProductCardProps> = ({
	src,
	rating,
	price,
	title,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="w-[198px] h-[198px] md:w-[295px] md:h-[295px] relative">
				<Image
					src={src}
					alt={title}
					fill
					sizes="100vw"
					className="rounded-[20px] overflow-hidden object-cover"
				/>
			</div>
			<div className="flex flex-col gap-1">
				<h3 className="text-sm font-semibold">{title}</h3>
				<p className="text-gray-600">{price.toFixed(2)} ETB</p>
				<p className="text-yellow-500">{rating} ★</p>
			</div>
		</div>
	);
};

export default ProductCard;
