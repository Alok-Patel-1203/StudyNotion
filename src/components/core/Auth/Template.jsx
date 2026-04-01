import { FcGoogle } from "react-icons/fc"
import { useSelector } from "react-redux"

import frameImg from "../../../assets/Images/frame.png"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth)

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0 border border-richblack-600 rounded-xl p-7 lg:p-10 bg-richblack-800/40 backdrop-blur-lg shadow-xl">
            <h1 className="text-[2.25rem] font-bold leading-[2.75rem] text-richblack-5 drop-shadow-md">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">{description1}</span>{" "}
              <span className="font-edu-sa font-bold italic text-blue-100">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] rounded-3xl blur-2xl opacity-20 animate-[pulse_3s_infinite] hidden md:block"></div>
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
              className="relative opacity-70 z-0 drop-shadow-2xl"
            />
            <img
              src={image}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-4 right-4 z-10 rounded-2xl border-4 border-richblack-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Template