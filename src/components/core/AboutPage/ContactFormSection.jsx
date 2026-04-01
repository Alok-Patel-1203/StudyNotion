import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex flex-col gap-3 bg-richblack-800/40 backdrop-blur-lg shadow-xl lg:w-4/5">
      <h1 className="text-center text-4xl font-semibold text-richblack-5">Get in Touch</h1>
      <p className="text-center text-richblack-300 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 mx-auto w-full">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;