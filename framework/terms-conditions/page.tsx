import Link from 'next/link';
import Navbar from "@/components/Layouts/Navigations/Navbar1";
import FooterTwo from "@/components/Layouts/Footer/FooterTwo";
import TermsConditionsContent from "@/components/TermsConditions/TermsConditionsContent";

export default function Page() {
  return (
    <>
			<Navbar />

			<div className="page-title-area">
				<div className="container">
					<div className="page-title-content">
						<h1>Terms & Conditions</h1>
						<ul>
							<li>
								<Link href="/">
									Home
								</Link>
							</li>
							<li>Terms & Conditions</li>
						</ul>
					</div>
				</div>
			</div>

			<TermsConditionsContent />
			
			<FooterTwo />
		</>
	);
};
