import { temporaryPageBanner } from "@/assets";

interface PageBannerProps {
  title: string;
  description: string;
}

function PageBanner({ title, description }: Readonly<PageBannerProps>) {
  return (
    <div
      style={{
        backgroundImage: `url(${temporaryPageBanner.src})`,
      }}
      className="h-[350px] md:h-100 w-full bg-cover bg-center relative -mt-12 md:-mt-15"
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/60 to-transparent flex flex-col justify-center items-center gap-4 pt-10">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="text-white text-lg">{description}</p>
      </div>
    </div>
  );
}

export default PageBanner;
