import Image from "next/image";
import { motion } from "framer-motion";
import { IoMdPlay } from "react-icons/io";
import { opacityAnimation, textSlideAnimation } from "@/animations/animations";

const players = [
  {
    type: "video",
    src: "/assets/home/carousel/haaland.mp4",
    name: "Erling Haaland",
    alt: "Haaland",
  },
  {
    type: "image",
    src: "/assets/home/carousel/putela.avif",
    name: "Alexia Putellas",
    alt: "Putellas",
  },
  {
    type: "video",
    src: "/assets/home/carousel/vini-jr.mp4",
    name: "Monkey Jr",
    alt: "Vini Jr",
  },
];

const scaryProducts = [
  {
    src: "/assets/home/carousel-2/phantom.avif",
    title: "Scary Precision",
    description: "So precise, it`s scary.",
  },
  {
    src: "/assets/home/carousel-2/tiempo.avif",
    title: "Scary Touch",
    description: "Every touch lands different.",
  },
  {
    src: "/assets/home/carousel-2/mercurial.avif",
    title: "Scary Speed",
    description: "When no one catch you, no one can stop you.",
  },
];

const federations = [
  {
    src: "/assets/home/federation/usa-t-shirt.avif",
    title: "USA",
  },
  {
    src: "/assets/home/federation/england-t-shirt.avif",
    title: "ENGLAND",
  },
  {
    src: "/assets/home/federation/france-t-shirt.avif",
    title: "USA",
  },
];

const clubsAndFederationsLogos = [
  { src: "/assets/home/team-logos/at-madrid.png", title: "At. Madrid" },
  { src: "/assets/home/team-logos/barce.png", title: "Barcelona" },
  { src: "/assets/home/team-logos/brazil.png", title: "Brazil" },
  { src: "/assets/home/team-logos/chelsea.png", title: "Chelsea" },
  { src: "/assets/home/team-logos/corinthians.png", title: "Corinthians" },
  { src: "/assets/home/team-logos/england.png", title: "England" },
  { src: "/assets/home/team-logos/france.png", title: "France" },
  { src: "/assets/home/team-logos/inter.png", title: "Inter" },
  { src: "/assets/home/team-logos/netherlands.png", title: "Netherlands" },
  { src: "/assets/home/team-logos/nigeria.png", title: "Nigeria" },
  { src: "/assets/home/team-logos/norway.png", title: "Norway" },
  { src: "/assets/home/team-logos/nwsl.png", title: "NWSL" },
  { src: "/assets/home/team-logos/psg.png", title: "PSG" },
  { src: "/assets/home/team-logos/pumas.png", title: "Pumas" },
  { src: "/assets/home/team-logos/toten.png", title: "Tottenham" },
  { src: "/assets/home/team-logos/usa.png", title: "USA" },
];

const Home = () => {
  return (
    <motion.div
      className="size-full"
      variants={opacityAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="h-full flex flex-col items-center">
        <div className="relative w-full flex flex-col">
          <figure className="w-full h-screen">
            <video
              src={"/assets/home/cardea-video.mp4"}
              width={1000}
              height={1000}
              alt=""
              loop
              autoPlay
              muted
              className="size-full object-cover"
            />
          </figure>
          <div className="absolute size-full p-5 flex items-center justify-center max-md:p-2">
            <div className="flex flex-col items-center ">
              <p className="mb-2   text-white-100 text-[14px] font-semibold text-center">
                Look of soccer
              </p>
              <h2
                className="mb-2   text-white-100 text-[68px] font-bold uppercase leading-[1] tracking-[-2.5px] text-center
              max-fl:text-[52px] max-lg:text-[44px] max-md:text-[36px] max-fl:tracking-[-2px] max-lg:tracking-[-1px]"
              >
                Fearless Style
              </h2>
              <p className="  text-white-100 text-[14px] font-semibold text-center">
                Total 90, Gato, and Field General.
              </p>
              <p className="mb-4   text-white-100 text-[14px] font-semibold text-center">
                For those who dare to be different.
              </p>
              <div className="flex items-center gap-4">
                <button className="w-fit h-[35px] px-6 rounded-full  bg-white-200   text-black-100  text-[14px] font-semibold text-center">
                  Shop
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1000px] mx-auto mt-12 p-5 flex flex-col items-center justify-center gap-2 max-md:p-2">
          <p className="  text-black-100  text-[14px] font-semibold text-center">
            Nike soccer
          </p>
          <div className="h-fit overflow-hidden">
            <motion.h2
              className="  text-black-100  text-[68px] font-bold uppercase leading-[1] tracking-[-2.5px] text-center
              max-fl:text-[52px] max-lg:text-[44px] max-md:text-[36px] max-fl:tracking-[-2px] max-lg:tracking-[-1px]"
              variants={textSlideAnimation}
              initial="initial"
              animate="animate"
            >
              welcome to the home of the frighteningly skilled
            </motion.h2>
          </div>
          <p className="mb-2   text-black-100  text-[14px] font-semibold text-center">
            Only those who scare will survive
          </p>
          <button className="w-fit h-[35px] px-6 rounded-full  bg-black-100   text-white-100 text-[14px] font-semibold text-center">
            Shop
          </button>
        </div>

        <div className="relative pt-12 w-full flex flex-col">
          <figure className="w-full h-[800px]">
            <Image
              src={"/assets/home/carousel/videoframe-1.png"}
              width={1000}
              height={1000}
              alt=""
              className="size-full object-cover"
            />
          </figure>
          <div className="absolute bottom-0 p-5">
            <div className="flex flex-col items-start">
              <p className="mb-2   text-white-100 text-[14px] font-semibold text-center">
                Scary Good
              </p>
              <h2
                className="mb-2   text-white-100 text-[68px] font-bold uppercase leading-[1] tracking-[-2.5px] text-center
              max-fl:text-[52px] max-lg:text-[44px] max-md:text-[36px] max-fl:tracking-[-2px] max-lg:tracking-[-1px]"
              >
                COLE PALMER
              </h2>
              <p className="mb-4   text-white-100 text-[14px] font-semibold text-center">
                Reputation Ruiner
              </p>
              <div className="flex items-center gap-4">
                <button className="w-fit h-[35px] px-6 rounded-full  bg-white-200   text-black-100  text-[14px] font-semibold text-center">
                  Shop
                </button>
                <button className="w-fit h-[35px] px-6 rounded-full  bg-white-200   text-black-100  text-[14px] font-semibold flex items-center justify-center gap-2">
                  <IoMdPlay size={22} /> Watch
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-12 w-full flex flex-col items-center justify-center">
          <figure className="mb-8 w-full h-[375px] max-md:h-[200px]">
            <Image
              src={"/assets/home/scary-good.png"}
              width={2200}
              height={2200}
              alt=""
              className="size-full object-cover"
            />
          </figure>

          <div className="w-full p-5 grid grid-cols-3 gap-2 max-md:grid-cols-1 max-md:p-2">
            {players.map((player, i) => (
              <div
                key={i}
                className="relative w-full h-[800px] max-fl:h-[700px] max-ds:h-[600px] max-md:h-[500px]"
              >
                <figure className="mb-8 size-full">
                  {player.type === "video" ? (
                    <video
                      src={player.src}
                      width={2200}
                      height={2200}
                      loop
                      autoPlay
                      muted
                      className="size-full object-cover"
                    />
                  ) : (
                    <Image
                      src={player.src}
                      width={600}
                      height={600}
                      alt={player.alt}
                      className="size-full object-cover"
                    />
                  )}
                </figure>
                <div className="absolute bottom-0 p-5">
                  <h2 className="mb-2   text-white-100 text-[26px] font-semibold max-md:text-[18px]">
                    {player.name}
                  </h2>
                  <button className="w-fit h-[35px] px-6 rounded-full  bg-white-200   text-black-100  text-[14px] font-semibold text-center">
                    Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative pt-12 w-full flex flex-col items-center justify-center">
          <figure className="mb-8 w-full h-[275px] max-md:h-[200px]">
            <Image
              src={"/assets/home/give-them.png"}
              width={2200}
              height={2200}
              alt=""
              className="size-full object-cover"
            />
          </figure>

          <div className="w-full p-5 grid grid-cols-3 gap-2 max-md:grid-cols-1 max-md:p-2">
            {scaryProducts.map((item, i) => (
              <div
                key={i}
                className="relative w-full h-[800px] max-fl:h-[700px] max-ds:h-[600px] max-md:h-[500px]"
              >
                <figure className="mb-8 size-full">
                  <Image
                    src={item.src}
                    width={2200}
                    height={2200}
                    alt={item.title}
                    className="size-full object-cover max-md:object-fill"
                  />
                </figure>
                <div className="absolute bottom-0 p-5">
                  <h2 className="  text-white-100 text-[15px] font-semibold">
                    {item.title}
                  </h2>
                  <p className="mb-4   text-white-100 text-[14px] font-medium">
                    {item.description}
                  </p>
                  <button className="w-fit h-[35px] px-6 rounded-full  bg-white-200   text-black-100  text-[14px] font-semibold text-center">
                    Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative pt-12 w-full flex flex-col items-center justify-center">
          <figure className="mb-8 w-full h-[200px] max-md:h-[150px]">
            <Image
              src={"/assets/home/nike-soccer.png"}
              width={2200}
              height={2200}
              alt=""
              className="size-full object-cover"
            />
          </figure>
        </div>

        <div className="relative pt-12 p-5  w-full flex flex-col items-start justify-start max-md:p-2 max-md:pt-12">
          <h2 className="mb-4   text-black-100  text-[32px] font-medium max-md:text-[26px]">
            Federations
          </h2>

          <div className="w-full grid grid-cols-3 gap-2 max-md:grid-cols-1">
            {federations.map((shirt, i) => (
              <div
                key={i}
                className="relative w-full h-[800px] max-fl:h-[700px] max-ds:h-[600px] max-md:h-[500px]"
              >
                <figure className="mb-8 size-full">
                  <Image
                    src={shirt.src}
                    width={600}
                    height={600}
                    alt={shirt.alt}
                    className="size-full object-cover"
                  />
                </figure>
                <div className="absolute bottom-0 p-5">
                  <h2 className="mb-2   text-white-100 text-[26px] font-semibold max-md:text-[18px]">
                    {shirt.title}
                  </h2>
                  <button className="w-fit h-[35px] px-6 rounded-full  bg-white-200   text-black-100  text-[14px] font-semibold text-center">
                    Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-12 p-5 flex flex-col items-center justify-center gap-2 max-md:p-2 max-md:pt-12">
          <p className="  text-black-100  text-[14px] font-semibold text-center">
            Clubs & Federations
          </p>
          <div className="h-fit overflow-hidden">
            <h2
              className="  text-black-100  text-[68px] font-bold uppercase leading-[1] tracking-[-2.5px] text-center
              max-fl:text-[52px] max-lg:text-[44px] max-md:text-[36px] max-fl:tracking-[-2px] max-lg:tracking-[-1px]"
            >
              BEWARE THE BADGE
            </h2>
          </div>
          <p className="mb-4   text-black-100  text-[14px] font-semibold text-center">
            Only those who scare will survive
          </p>
          <div className="mb-8 w-full grid grid-cols-8 max-lg:grid-cols-6 max-md:grid-cols-4 gap-12">
            {clubsAndFederationsLogos.map((logo, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center justify-center gap-4"
              >
                <figure className="w-[50px] h-[50px]">
                  <Image
                    src={logo.src}
                    width={300}
                    height={300}
                    alt={logo.title}
                    className="size-full object-cover"
                  />
                </figure>
                <div className="relative">
                  <h2 className="  text-black-100  text-[12px] font-semibold text-center">
                    {logo.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
          <button className="w-fit h-[35px] px-6 rounded-full  bg-black-100   text-white-100 text-[14px] font-semibold text-center">
            See all
          </button>
        </div>

        <figure className="w-full h-1/2">
          <video
            src={"/assets/home/welcome.mp4"}
            width={800}
            height={800}
            alt=""
            autoPlay
            loop
            className="size-full object-cover"
          />
        </figure>
      </div>
    </motion.div>
  );
};

export default Home;
