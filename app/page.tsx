import BlueButton from "@/components/Common/BlueButton";
import ProductCard from "@/components/Common/ProductCard";
import TestimonialCard from "@/components/Common/TestimonialCard";
import Title from "@/components/Common/Title";
import SmilyMan from "@/public/images/home/SmilyMan.png";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex flex-col py-4 gap-4">
			<div className="flex flex-col gap-4 mx-4">
				<p className="w-full relative text-4xl leading-none font-bold text-midnightblue text-left flex items-center">
					FIND PRODUCTS YOU NEED EASILY AND SAFELY
				</p>
				<div className="w-full relative text-base leading- font-arial text-gray text-left inline-block">
					Browse a wide range of quality products from registered
					Ethiopian farmers and local shops, carefully selected to
					meet your everyday needs.
				</div>
			</div>
			<div className="mx-2">
				<BlueButton text={"Shop Now"}/>
			</div>
			<div className="px-4 w-full relative flex items-center justify-between flex-wrap content-center gap-x-2 gap-y-8 text-left text-2xl text-midnightblue font-arial">
				<div className="flex flex-col items-start">
					<b className="relative">200+</b>
					<div className="w-[130px] relative text-xs leading-[22px] text-gray inline-block mt-[-6px]">
						Shops and farmers
					</div>
				</div>
				<div className="relative border-gray-800 border-solid border-r-[1px] box-border h-[53px]" />
				<div className="flex flex-col items-start">
					<b className="relative mr-2">2,000+</b>
					<div className="relative text-xs leading-[22px] text-gray mt-[-6px]">
						High-Quality Products
					</div>
				</div>
			</div>
			<div className="mx-4 relative w-full flex flex-col items-center justify-center text-left text-2xl text-midnightblue font-arial">
				<b className="relative">30,000+</b>
				<div className="relative text-xs leading-[22px] text-gray mt-[-6px]">
					Happy Customers
				</div>
			</div>
			<div className="flex flex-col">
				<Image
					src={SmilyMan}
					className="h-80 mb-0 m w-full relative max-w-full overflow-hidden max-h-full object-cover"
					alt=""
				/>
				{/* {slogan} */}
				<div className="w-full mt-0 relative bg-midnightblue h-[149px] text-[28px] uppercase text-white text-center flex items-center justify-center">
					Quality You Can Trust, from Sellers You Know
				</div>
			</div>

			<Title text={"new products"} />
			<div className="flex p-4 gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300">
				<ProductCard
					src="/images/home/pineapple.svg"
					title="Fresh Pineapple"
					price={120}
					rating={4.5}
				/>
				<ProductCard
					src="/images/home/iphone.svg"
					title="IPhone 14 Pro Max"
					price={120000}
					rating={4.0}
				/>
				<ProductCard
					src="/images/home/shirt.svg"
					title="Checkered Shirt"
					price={1000}
					rating={5.0}
				/>
				<ProductCard
					src="/images/home/wheat.jpg"
					title="1KG wheat"
					price={100}
					rating={3.5}
				/>
			</div>
			<div className="mx-2">
				<BlueButton text={"View All"} />
			</div>

			<Title text={"FEATURED PRODUCTS"} />
			<div className="flex p-4 gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300">
				<ProductCard
					src="/images/home/cabbage.svg"
					title="Large Cabbage"
					price={120}
					rating={4.5}
				/>
				<ProductCard
					src="/images/home/tshirt.svg"
					title="One Life Graphic T-SHIRT"
					price={120000}
					rating={4.0}
				/>
				<ProductCard
					src="/images/home/realme.svg"
					title="Realme 15"
					price={1000}
					rating={5.0}
				/>
				<ProductCard
					src="/images/home/tomato.svg"
					title="Fresh Tomato 1KG"
					price={100}
					rating={3.5}
				/>
			</div>
			<div className="mx-2 mb-3">
				<BlueButton text={"See More"} />
			</div>

			<Title text={"OUR HAPPY CUSTOMERS"} />
			<div className="flex p-4 gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300">
				<TestimonialCard
					author={"Belete M."}
					testimony={
						"EtCom saved me so much time. The app is simple, fast, and I always find what I need."
					}
				/>
				<TestimonialCard
					author={"Kaleab D."}
					testimony={
						"Finally, an Ethiopian platform that connects us directly with shops and farmers. I feel proud to support local businesses"
					}
				/>
				<TestimonialCard
					author={"Robel G."}
					testimony={
						"I love how trustworthy the sellers are. Everything I ordered arrived on time and in perfect condition."
					}
				/>
				<TestimonialCard
					author={"Habib E."}
					testimony={
						"EtCom made shopping so easy! I can now order fresh products from local farmers without leaving home. Truly a game-changer."
					}
				/>
			</div>
		</div>
	);
}
