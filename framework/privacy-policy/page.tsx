import Link from 'next/link';
import Navbar from "@/components/Layouts/Navigations/Navbar1";
import FooterTwo from "@/components/Layouts/Footer/FooterTwo";
import PrivacyPolicyContent from "@/components/privacyPolicy/PrivacyPolicyContent";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <h1>Privacy Policy</h1>
            <ul>
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>
      
      <PrivacyPolicyContent />
      
      <FooterTwo />
    </>
  );
};