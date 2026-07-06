"use client";
import Carousel from "@/components/carousel";
import Image from "next/image";
import { Star } from "lucide-react";

interface SuccessStoryType {
  imageUrl: string;
  description: string;
  authorName: string;
}

const sampleData: SuccessStoryType[] = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "I was exhausted speaking with lots of men in other online Matrimonial Services who either did not belong to Santali Community or were not my type. Then someone told me of Raibar where I came in contact with my soul mate and love of life. Thanks Raibar for making my married life so happy.",
    authorName: "Someone Example",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "I was exhausted speaking with lots of men in other online Matrimonial Services who either did not belong to Santali Community or were not my type. Then someone told me of Raibar where I came in contact with my soul mate and love of life. Thanks Raibar for making my married life so happy.",
    authorName: "Someone Example",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "I was exhausted speaking with lots of men in other online Matrimonial Services who either did not belong to Santali Community or were not my type. Then someone told me of Raibar where I came in contact with my soul mate and love of life. Thanks Raibar for making my married life so happy.",
    authorName: "Someone Example",
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "I was exhausted speaking with lots of men in other online Matrimonial Services who either did not belong to Santali Community or were not my type. Then someone told me of Raibar where I came in contact with my soul mate and love of life. Thanks Raibar for making my married life so happy.",
    authorName: "Someone Example",
  },
];

function SuccessStories() {
  return (
    <section className="w-full py-12 md:py-16 bg-gradient-to-b from-rose-50/50 via-white to-amber-50/30">
      <div className="base-section">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif italic text-lg md:text-xl text-[#B3243A] tracking-wide mb-4">
            💕 Success Stories
          </h2>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1E1B16] mb-4">
            Happy Journeys Matched By Us
          </h3>
          <div className="mx-auto h-[2px] w-16 bg-gradient-to-r from-transparent via-[#C9962C] to-transparent" />
          <p className="text-lg text-gray-700 font-light mt-4">
            Real stories from real couples who found their perfect match and
            built their love story with us.
          </p>
        </div>

        <Carousel
          data={sampleData}
          slidesPerView={{
            320: 1,
            640: 2,
            1024: 3,
            1280: 3,
          }}
          spaceBetween={{
            320: 16,
            640: 24,
            1024: 32,
            1280: 32,
          }}
          loop={true}
          autoplayDuration={4000}
          hideNavigationButtons
          renderSlide={(item) => (
            <div className="h-full">
              <div className="relative group h-full bg-gradient-to-br from-[#FFFBF5] to-[#FFFFF0] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-[#F5E6D3] hover:border-[#C9962C] p-6 md:p-8 flex flex-col">
                {/* Star rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#C9962C] text-[#C9962C]"
                    />
                  ))}
                </div>

                {/* Description */}
                <p className="text-gray-800 text-sm md:text-base leading-relaxed mb-6 flex-grow line-clamp-4">
                  {item.description}
                </p>

                {/* Divider */}
                <div className="w-12 h-1 bg-gradient-to-r from-[#C9962C] to-[#B3243A] rounded-full mb-6" />

                {/* Profile section */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-[#C9962C] to-[#B3243A] rounded-full overflow-hidden border-2 border-white shadow-md">
                      <Image
                        width={56}
                        height={56}
                        alt={item.authorName}
                        src={item.imageUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-serif font-semibold text-[#1E1B16] text-sm md:text-base">
                      {item.authorName}
                    </p>
                    <p className="text-xs text-[#C9962C] font-medium">
                      Verified Match
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </section>
  );
}

export default SuccessStories;
