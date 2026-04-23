import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                const category_id = 
                res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]?._id;
                setCategoryId(category_id);
            } catch(error) {
                console.error("Could not fetch categories:", error);
            }
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
    
      return (
        <>
          {/* Hero Section */}
          <div className="box-content bg-richblack-800/80 backdrop-blur-md px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-50%] left-[-10%] w-[300px] h-[300px] bg-blue-100/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-50%] right-[-10%] w-[300px] h-[300px] bg-yellow-50/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent relative z-10">
              <p className="text-sm text-richblack-300 tracking-wider uppercase font-medium">
                {`Home / Catalog / `}
                <span className="text-yellow-50 drop-shadow-[0_0_5px_rgba(255,214,10,0.4)]">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-4xl md:text-5xl font-extrabold text-richblack-5 tracking-tight mt-2 drop-shadow-md">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200 text-lg leading-relaxed mt-2">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-700 text-base font-medium">
              <p
                className={`px-6 py-3 transition-all duration-300 ${
                  active === 1
                    ? "border-b-2 border-b-yellow-50 text-yellow-50 drop-shadow-[0_0_8px_rgba(255,214,10,0.5)] bg-richblack-800/30"
                    : "text-richblack-200 hover:text-richblack-50 hover:bg-richblack-800/20"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </p>
              <p
                className={`px-6 py-3 transition-all duration-300 ${
                  active === 2
                    ? "border-b-2 border-b-yellow-50 text-yellow-50 drop-shadow-[0_0_8px_rgba(255,214,10,0.5)] bg-richblack-800/30"
                    : "text-richblack-200 hover:text-richblack-50 hover:bg-richblack-800/20"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>
          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPageData?.data?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>
    
          <Footer />
        </>
      )
    }
    
    export default Catalog