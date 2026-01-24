import Navbar2 from "@/components/Layouts/Navigations/Navbar2";
import Banner from "@/components/Home/Banner";
import HelpDesk from "@/components/Home/HelpDesk";
import About from "@/components/Home/About";
import Services from "@/components/Home/Services";
import Faq from "@/components/Home/Faq";
import TestimonialTwo from "@/components/Testimonials/TestimonialTwo";
import Team from "@/components/Home/Team";
import CaseStudies from "@/components/Home/CaseStudies";
import Funfacts from "@/components/Home/Funfacts";
import WorkingProcess from "@/components/Home/WorkingProcess";
import GetStarted from "@/components/Common/GetStarted";
import Blog from "@/components/Home/Blog";
import PartnerStyle1 from "@/components/Partners/PartnerStyle1";
import FooterTwo from "@/components/Layouts/Footer/FooterTwo";

export default function Page() {
  return (
    <>
      <Navbar2 />

      <Banner />

      <HelpDesk />

      <About />

      <Services />

      <Faq />

      <TestimonialTwo />

      <Team />

      <CaseStudies />

      <Funfacts />

      <WorkingProcess />

      <GetStarted />

      <Blog />

      <div className="bg-fff4f8">
        <PartnerStyle1 />
      </div>

      <FooterTwo />
    </>
  );
}