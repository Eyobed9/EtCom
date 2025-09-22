import Image from "next/image";

const Categories = () => {
	return (
		<div className="flex flex-col gap-4 px-4">
			<div className="flex justify-between px-4">
				<p className="w-full font-semibold relative text-2xl inline-block font-arial text-midnightblue text-center">
					Categories
				</p>
				<Image
					src="/images/categories/filter.svg"
					className="bg-amber-50 w-10 relative rounded-[62px] max-w-full overflow-hidden h-8 p-1"
					width={32}
					height={32}
					sizes="100vw"
					alt="⇄"
				/>
			</div>
			<div className="bg-amber-50 rounded-[20px] w-full h-[258px]"></div>
			<div className="bg-amber-50 rounded-[20px] w-full h-[258px]"></div>
			<div className="bg-amber-50 rounded-[20px] w-full h-[258px]"></div>
		</div>
	);
};

export default Categories;
