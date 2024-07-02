import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* <div className="bg-[#201700] hover:cursor-pointer w-full mt-20">
        <h3 className=" text-xl font-medium text-center py-2 text-slate-100 hover:text-[#E1DAC5] ">
          Back to top
        </h3>
      </div> */}
      <section className="bg-[#201700] p-10 grid grid-cols-1 md:grid-cols-7 gap-5 mt-20">
        <div className=" col-span-full md:col-span-3">
          <div className="">
            <Link to="/">
              <h3 className=" md:text-4xl font-mono text-[#FCFCFC] mr-20">
                Ruchir <span className=" text-[#FFFBE8]">Alap</span>
              </h3>
            </Link>
            <p className=" text-sm text-slate-300 mt-2">
              Welcome to Ruchir Alap, your go-to destination for online
              shopping! Discover the latest trends and timeless classics in
              fashion, electronics, home essentials, and more.
            </p>
          </div>
          <div className=" flex items-center gap-4 mt-5">
            <Facebook className=" bg-sky-500 text-white rounded-md p-1 hover:cursor-pointer footerIcons" />
            <Twitter className=" bg-sky-500 text-white rounded-md p-1 hover:cursor-pointer footerIcons" />
            <Youtube className=" bg-red-500 text-white rounded-md p-1 hover:cursor-pointer footerIcons" />
            <Linkedin className=" bg-sky-500 text-white rounded-md p-1 hover:cursor-pointer footerIcons" />
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5 col-span-full md:col-span-4">
          <div className=" menu space-y-1 font-medium">
            <h6 className=" text-2xl text-[#FCFCFC] font-semibold">Services</h6>
            <Link to="/bestSell">
              <a className="link link-hover hover:text-green-500 text-slate-300">
                Best Sell
              </a>
            </Link>
            <Link to="/about">
              <a className="link link-hover hover:text-green-500 text-slate-300">
                About us
              </a>
            </Link>

            <Link to="/contact">
              <a className="link link-hover hover:text-green-500 text-slate-300">
                Contact us
              </a>
            </Link>
          </div>
          <div>
            <form>
              <h6 className="text-2xl text-[#FCFCFC] font-semibold">
                Newsletter
              </h6>
              <fieldset className="form-control w-80">
                <label className="label">
                  <span className="label-text text-slate-300">
                    Enter your email address
                  </span>
                </label>
                <div className="join">
                  <input
                    type="text"
                    placeholder="username@site.com"
                    className=" border border-slate-100 input join-item bg-transparent text-slate-50"
                  />
                  <button className="btn border bg-[#FFFBE8]">Subscribe</button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </section>
      <hr />
      <footer className="footer footer-center p-4 bg-[#201700] text-[#FCFCFC]">
        <aside>
          <p>Copyright © 2024 - All right reserved by LBS Industries Ltd</p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
