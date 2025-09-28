import { BlueButtonProps } from "@/interfaces";

const BlueButton: React.FC<BlueButtonProps> = ({ text, onClick }) => {
	return (
		<button
			onClick={onClick}
			className="w-full md:w-[218px] cursor-pointer rounded-[62px] bg-midnightblue border-gray border-solid border-[1px] box-border h-[46px] md:h-[52px] py-1 mt-3 px-[20px] text-xl text-white hover:bg-blue-800 transition"
		>
			{text}
		</button>
	);
};

export default BlueButton;
