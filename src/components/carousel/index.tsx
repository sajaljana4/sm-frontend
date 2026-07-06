"use client";

import { useState, useEffect, JSX } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  EffectCoverflow,
  EffectCards,
  EffectCreative,
  EffectCube,
  EffectFade,
  EffectFlip,
  Autoplay,
} from "swiper/modules";
import type { SwiperProps } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "./styles.css";
import "swiper/css/effect-cards";
import { uuid } from "@/utils/uuid";

interface CarouselProps<T> {
  data?: T[];
  fetchFunction?: (page: number) => Promise<T[]>;
  renderSlide: (item: T, isCurrentlyDisplayed: boolean) => JSX.Element;
  slidesPerView?: {
    320?: number;
    640?: number;
    1024?: number;
    1280?: number;
  };
  spaceBetween?: {
    320?: number;
    640?: number;
    1024?: number;
    1280?: number;
  };
  effect?: "coverflow" | "cards" | "creative" | "cube" | "fade" | "flip";
  autoplayDuration?: number;
  enablePagination?: boolean;
  hidePaginationBullets?: boolean;
  hideNavigationButtons?: boolean;
  dynamicPagination?: boolean;
  enableNavigation?: boolean;
  loop?: boolean;
  infinite?: boolean;
  loadingComponent?: JSX.Element;
  errorComponent?: JSX.Element;
  centeredSlides?: boolean;
  initialSlide?: number;
  grabCursor?: boolean;
}

const Carousel = <T,>({
  data: initialData,
  fetchFunction,
  renderSlide,
  slidesPerView = {
    320: 1,
    640: 1,
    1024: 1,
    1280: 1,
  },
  spaceBetween = {
    320: 10,
    640: 20,
    1024: 30,
    1280: 30,
  },
  enablePagination = true,
  enableNavigation = true,
  dynamicPagination,
  loop = false,
  infinite = false,
  effect,
  autoplayDuration,
  hidePaginationBullets = false,
  hideNavigationButtons = false,
  loadingComponent = <div>Loading...</div>,
  errorComponent = <div>Error loading data</div>,
  centeredSlides = false,
  initialSlide = 0,
  grabCursor = false,
}: CarouselProps<T>) => {
  const [data, setData] = useState<T[]>(initialData || []);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(initialSlide);

  useEffect(() => {
    if (initialData) {
      setData(initialData);
      return;
    }

    if (!infinite || !fetchFunction) {
      return;
    }

    const loadData = async () => {
      if (!hasMore || loading) return;

      setLoading(true);
      setError(null);

      try {
        const newData = await fetchFunction(page);
        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setData((prevData) => [...prevData, ...newData]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch data"),
        );
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, fetchFunction, infinite, initialData, hasMore, loading]);

  useEffect(() => {
    if (swiper) {
      swiper.update(); // Recalculate sizes and layout
      swiper.slideTo(initialSlide); // Reset to initial slide after update
      setActiveIndex(initialSlide); // Update active index to match initial slide
    }
  }, [data, swiper, initialSlide]);

  const handleSlideChange = (swiperInstance: SwiperType): void => {
    if (!infinite || !hasMore || loading) return;

    const isNearEnd =
      swiperInstance.isEnd ||
      swiperInstance.activeIndex +
        (swiperInstance.params.slidesPerView as number) >=
        data.length - (swiperInstance.params.slidesPerView as number);

    if (isNearEnd) {
      setPage((prev) => prev + 1);
    }
  };

  if (error && data.length === 0) {
    return errorComponent;
  }

  const swiperProps: SwiperProps = {
    centeredSlidesBounds: true,
    spaceBetween: spaceBetween["320"],
    slidesPerView: slidesPerView["320"],
    centeredSlides: centeredSlides,
    pagination: enablePagination
      ? {
          clickable: true,
          dynamicBullets: dynamicPagination,
          el: hidePaginationBullets ? null : undefined,
        }
      : false,
    navigation: enableNavigation && !hideNavigationButtons,
    effect,
    loop: loop && !infinite,
    modules: [
      ...(enablePagination ? [Pagination] : []),
      ...(enableNavigation ? [Navigation] : []),
      EffectCoverflow,
      EffectCards,
      EffectCreative,
      EffectCube,
      EffectFade,
      EffectFlip,
      Autoplay,
    ],
    autoplay: autoplayDuration ? { delay: autoplayDuration } : false,
    initialSlide: initialSlide,
    observer: true,
    observeParents: true,
    onSlideChange: handleSlideChange,
    grabCursor: grabCursor,
    // onSlideChangeTransitionStart: handleSlideChangeTransitionStart,
    onSwiper: (swiperInstance: SwiperType) => {
      setSwiper(swiperInstance);
      setActiveIndex(swiperInstance.realIndex ?? swiperInstance.activeIndex);
    },
    breakpoints: {
      320: {
        slidesPerView: slidesPerView["320"],
        spaceBetween: spaceBetween["320"],
      },
      640: {
        slidesPerView: slidesPerView["640"],
        spaceBetween: spaceBetween["640"],
      },
      1024: {
        slidesPerView: slidesPerView["1024"],
        spaceBetween: spaceBetween["1024"],
      },
      1280: {
        slidesPerView: slidesPerView["1280"],
        spaceBetween: spaceBetween["1280"],
      },
    },
  };

  return (
    <div className="w-full">
      <Swiper {...swiperProps}>
        {data.map((item, index) => (
          <SwiperSlide key={uuid()} className="w-full">
            {renderSlide(
              item,
              loop
                ? index === activeIndex % data.length
                : index === activeIndex,
            )}
          </SwiperSlide>
        ))}
        {loading && <SwiperSlide>{loadingComponent}</SwiperSlide>}
      </Swiper>
    </div>
  );
};

export default Carousel;
