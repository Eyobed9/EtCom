import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
	return (
		<footer className="w-full px-6 lg:pt-6 lg:pb-2 py-10">
			<div className="lg:pl-15 py-4 flex flex-col lg:flex-row items-start justify-around gap-10 lg:gap-40 text-left text-sm text-black font-arial">
				{/* Brand + Description + Socials */}
				<div className="flex flex-col items-start gap-6 lg:max-w-xs">
					<h2 className="text-[28px] lg:text-[34px] text-midnightblue font-medium font-arial-rounded-mt-bold">
						EtCom
					</h2>
					<p className="text-gray leading-5">
						Browse a wide range of quality products from registered
						Ethiopian farmers and local shops, carefully selected to
						meet your everyday needs.
					</p>
					<div className="flex gap-4">
						<FaFacebook className="w-6 h-6 hover:text-blue-500 cursor-pointer" />
						<FaTwitter className="w-6 h-6 hover:text-sky-400 cursor-pointer" />
						<FaInstagram className="w-6 h-6 hover:text-pink-500 cursor-pointer" />
						<FaGithub className="w-6 h-6 hover:text-gray-800 cursor-pointer" />
					</div>
				</div>

				{/* Sections */}
				<div className="grid grid-cols-2 lg:grid-cols-3 gap-10 w-full">
					{/* Company Section */}
					<div className="flex flex-col gap-4">
						<h3 className="tracking-[3px] leading-[18px] uppercase">
							Company
						</h3>
						<div className="flex flex-col space-y-2 text-gray">
							<p>About</p>
							<p>Features</p>
							<p>Works</p>
							<p>Career</p>
						</div>
					</div>

					{/* Help Section */}
					<div className="flex flex-col gap-4">
						<h3 className="tracking-[3px] leading-[18px] uppercase">
							Help
						</h3>
						<div className="flex flex-col space-y-2 text-gray">
							<p>Customer Support</p>
							<p>Delivery Details</p>
							<p>Terms & Conditions</p>
							<p>Privacy Policy</p>
						</div>
					</div>

					{/* FAQ Section */}
					<div className="flex flex-col gap-4">
						<h3 className="tracking-[3px] leading-[18px] uppercase">
							FAQ
						</h3>
						<div className="flex flex-col space-y-2 text-gray">
							<p>Account</p>
							<p>Manage Deliveries</p>
							<p>Orders</p>
							<p>Payments</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
