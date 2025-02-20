import Image from "next/image";

interface HeroBannerProps {
  title: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title }) => {
  return (
    <div className="h-28 bg-card flex">
      <div className="container flex h-full items-center justify-between overflow-x-hidden">
        <h1 className="text-xl font-bold opacity-80 text-nowrap">{title}</h1>
        <Image
          src={"/page/page-banner.png"}
          alt="Banner image"
          width={0}
          height={0}
          sizes="100vw"
          priority={true}
          className="h-full w-auto"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
