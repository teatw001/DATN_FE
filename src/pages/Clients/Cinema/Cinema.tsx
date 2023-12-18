// import { Link } from "react-router-dom";
import Header from "../../../Layout/LayoutUser/Header";
import { useFetchBlogQuery } from "../../../service/blog.service";
import { IBlogs } from "../../../interface/model";
import { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";
const Cinema = () => {
  const [displayedBlogs, setDisplayedBlogs] = useState();
  const { data: blogs, error } = useFetchBlogQuery() as any;

  blogs?.data?.filter((blog: any) => blog.status === 1)
    .map((blog: any, index: number) => {
      console.log(blog);
      console.log("blog");
    });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true, // Hiển thị các mũi tên chuyển slider
  };
  return (
    <>

      <Header />


      {/* <section className="slide-container"> */}
      <Slider {...settings} className="slide-container">
        {blogs?.data
          ?.filter((blog: any) => blog.status === 1)
          .map((blog: any, index: number) => (
            <div key={index} className="relative overflow-hidden shadow transition hover:shadow-lg aspect-w-16 aspect-h-9">
              <Link to={`/blog/${blog.id}`}>
                <img
                  src={blog.image}
                  className="slick-slide"
                  alt={`Slide ${index + 1}`}
                  style={{ width: '100%', height: '800px' }} // Set the width to 100%
                />
              </Link>
            </div>
          ))}
      </Slider>

      {/* </section> */}


      <div className="popcorn mx-auto max-w-5xl mb-20">

        <div className="What’s On max-w-6xl px-10 my-[66px] mx-auto">
          <h2 className="text-[#FFFFFF] text-[40px] font-bold text-center">
            Có Gì Hot!
          </h2>
          <span className="block text-[#8E8E8E] text-[17px] text-center">
            Khám phá một bộ sưu tập các ưu đãi độc đáo và đặc biệt!
          </span>

          <div className="What’s On img my-10 grid grid-cols-3 gap-8">
            {blogs &&
              blogs?.data?.slice(0, displayedBlogs).map((blog: IBlogs) => blog.status === 1 ? (
                <article
                  key={blog.id}
                  className="relative overflow-hidden rounded-lg border border-gray-200 shadow transition hover:shadow-lg"
                >
                  <Link to={`/blog/ ${blog.id}`}>
                    <img
                      src={blog.image}
                      className="w-full h-full object-cover"
                      alt={blog.title}
                    />
                  </Link>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50">
                    <Link to={`/blog/${blog.id}`}>
                      <h3 className="text-white text-sm">{blog.title}</h3>
                    </Link>
                  </div>
                </article>
              ) : null)}
          </div>

        </div>
      </div>
    </>
  );
};

export default Cinema;
