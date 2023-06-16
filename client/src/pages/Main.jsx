import React from "react";
import Catalog from "../components/Catalog";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Main = () => {
  const [products, setProducts] = React.useState();

  const fetchProducts = async () => {
    try {
      let url = `${import.meta.env.VITE_APP_API_URL}products.php`;
      const { data } = await axios.get(url);
      setProducts(data.data);
    } catch (error) {
      setProducts([]);
      console.error(error);
    }
  };
  React.useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <h1 className="mt-[80px] mb-[20px] font-bold font-Comfortaa text-4xl text-center lg:text-left lg:mt-[100px]">
        Новинки{" "}
      </h1>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="mb-[120px] z-0 pb-10"
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {products &&
          products.map((product, i) => (
            <SwiperSlide key={i}>
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="h-full"
              >
                <img
                  src={`${import.meta.env.VITE_APP_API_URL}${product.img}`}
                  className="w-full h-[300px] object-cover rounded-3xl mb-5"
                  alt=""
                />
                <div className="px-5">
                  <div className="mb-4 font-Inter text-3xl md:text-2xl lg:text-lg">
                    {product.price} р
                  </div>
                  <div className="font-Inter truncate text-2xl font-medium mb-1 md:text-xl lg:text-lg">
                    {product.name}
                  </div>
                  <div className="font-Inter text-gray-400 text-2xl font-medium md:text-xl lg:text-lg">
                    {product.wt} г
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
      <Catalog />
    </div>
  );
};

export default Main;
