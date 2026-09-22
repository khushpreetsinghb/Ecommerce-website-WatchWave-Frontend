import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

export const metadata = {
  title: "Contact us - WatchWave",
};

const Contact = () => {
  return (
    <div className="row contactus ">
      <div className="col-md-6 ">
        <img
          src="/images/contactus.jpeg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="col-md-4">
        <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
        <p className="text-justify mt-2">
          For any query and info about product feel free to call anytime we are available 24X7
        </p>
        <p className="mt-3">
          <BiMailSend /> : www.help@WatchWave.com
        </p>
        <p className="mt-3">
          <BiPhoneCall /> : +91 9876543210
        </p>
        <p className="mt-3">
          <BiSupport /> : 1800-0000-0000 (toll free)
        </p>
      </div>
    </div>
  );
};

export default Contact;
