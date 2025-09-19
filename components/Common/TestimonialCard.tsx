import { TestimonialCardProps } from "@/interfaces";
import { FaStar, FaCheck } from "react-icons/fa";

const TestimonialCard: React.FC<TestimonialCardProps> = ({
	stars = 5,
	author,
	testimony,
}) => {
	return (
		<div className="w-[350px] max-w-[450px] rounded-[20px] snap-center shrink-0  border border-gray-300 box-border lg:h-[196px] overflow-hidden flex flex-col py-5 px-6 text-left text-xl text-black font-arial relative">
			{/* Stars */}
			<div className="flex items-center gap-1 mb-4">
				{[...Array(stars)].map((_, idx) => (
					<FaStar key={idx} className="w-5 h-5 text-yellow-400" />
				))}
			</div>

			{/* User info */}
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<b className="text-lg leading-[22px]">{author}</b>
					{/* Checkmark with green background */}
					<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
						<FaCheck className="text-white w-3.5 h-3.5" />
					</div>
				</div>

				{/* Testimonial text */}
				<p className="text-base leading-6 text-gray-500">{testimony}</p>
			</div>
		</div>
	);
};

export default TestimonialCard;
