import Navbar from "@/components/Layouts/Navigations/Navbar1";
import AboutArea from "./components/AboutArea";
import Overview from "./components/Overview";
import WorkingProcess from "./components/WorkingProcess";
import Funfacts from "./components/Funfacts";
import Team from "./components/Team";
import Partners from "./components/Partners";
import GetStarted from "@/components/Common/GetStarted";
import FooterTwo from "@/components/Layouts/Footer/FooterTwo";
import TestimonialTwo from "@/components/Testimonials/TestimonialTwo";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="page-title-area">
        <div className="container">
          <div className="page-title-content">
            <span className="sub-title red-light-color">About Us</span>
            <h1>Hello World! This is Abev!</h1>
          </div>
        </div>
      </div>

      <AboutArea />

      <Overview />

      <WorkingProcess />

      <Funfacts />

      <Team />

      <TestimonialTwo />

      <Partners />

      <div className="ptb-100">
        <GetStarted />
      </div>

      <FooterTwo />
    </>
  );
}
