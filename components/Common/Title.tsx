import { TitleProps } from "@/interfaces";

const Title: React.FC<TitleProps> = ({ text }) => {
	return (
		<p className="mx-auto mt-10 w-full relative text-[32px] uppercase font-semibold text-midnightblue text-center inline-block">
			{text}
		</p>
	);
};

export default Title;
