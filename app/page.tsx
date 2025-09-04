"use client";
import ReduxProvider from "@/components/redux-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardCarousel } from "@/components/ui/card-carousel";
import {
  Baby,
  Bookmark,
  Cake,
  Calendar,
  CalendarDays,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  Gift,
  Heart,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  MessageCircle,
  RefreshCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const sectionImages = [
  "https://www.candere.com/media/home_page_images/bannerTop/International-Flair_100625.jpg",
  "https://www.candere.com/media/home_page_images/bannerTop/Tradition-Reimagined_100625.jpg",
  "https://www.candere.com/media/home_page_images/bannerTop/Curated_100625.jpg",
];

export default function Component() {
  const [Active, setActive] = useState(0);

  return (
    <ReduxProvider>
  <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
        {/* Top Header */}

        {/* Hero Section */}
        <section className="relative w-full h-[600px] sm:h-[500px] md:h-[400px] lg:h-[600px] bg-gradient-to-r from-[#006666] to-[#009999] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://www.candere.com/media/home_page_images/slider/Banner_170725.jpg"
              alt="Shah Rukh Khan with jewelry"
              fill
              className="object-cover object-center sm:object-[center_top] md:object-[center_top] lg:object-[center_top] rounded-b-3xl shadow-2xl"
              style={{ objectPosition: "center -100px" }}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
            />
          </div>
        </section>

        {/* Showrooms Banner */}
        <section className="bg-gray-900 text-white py-4 px-4 md:px-8 text-center text-lg font-semibold">
          82+ SHOWROOMS ACROSS INDIA
        </section>

        {/* Sparkle Seeker Banner */}
        <section className="bg-black text-white py-12 px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Hey Sparkle Seeker,</h2>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light">
            Come, explore a world where diamonds aren&apos;t just for occasions,
            they&apos;re for every day, every mood, and every you.
          </p>
        </section>

        {/* Jewellery Flair Section */}
        <section className="bg-white py-16 px-4 md:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <Button
              onClick={() => setActive(0)}
              className={`text-lg font-semibold text-gray-900 bg-transparent hover:bg-transparent pb-1 ${
                Active === 0 ? "border-b-2 border-[#FADDA0]" : ""
              }`}
            >
              International Flair
            </Button>
            <Button
              onClick={() => setActive(1)}
              className={`text-lg font-semibold text-gray-900 bg-transparent hover:bg-transparent pb-1 ${
                Active === 1 ? "border-b-2 border-[#FADDA0]" : ""
              }`}
            >
              Tradition Reimagined
            </Button>
            <Button
              onClick={() => setActive(2)}
              className={`text-lg font-semibold text-gray-900 bg-transparent hover:bg-transparent pb-1 ${
                Active === 2 ? "border-b-2 border-[#FADDA0]" : ""
              }`}
            >
              Curated for the Bold
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">
            <div className="relative w-full h-auto rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
              <Image
                src={sectionImages[Active]}
                alt="International Flair"
                width={320}
                height={320}
                className="object-cover w-full h-full rounded-full shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Shop By Category */}
        <section className="bg-white py-16 px-4 md:px-8 text-center">
          <h2 className="text-5xl font-extrabold mb-2 text-gray-900 tracking-tight">Shop By Category</h2>
          <p className="text-xl text-gray-500 mb-10 font-light">So that you don't run out of options to choose from!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-5xl mx-auto">
            {[
              {
                name: "Charming Rings",
                slug: "rings",
                image: "https://www.candere.com/media/home_page_images/product_categories/Rings.png",
              },
              {
                name: "Pretty Pendants",
                slug: "mangalsutras-pendants",
                image: "https://www.candere.com/media/home_page_images/product_categories/Pendants.png",
              },
              {
                name: "Chains of Charm",
                slug: "necklace",
                image: "https://www.candere.com/media/home_page_images/product_categories/Chains.png",
              },
              {
                name: "Dreamy Necklaces",
                slug: "necklace",
                image: "https://www.candere.com/media/home_page_images/product_categories/Necklace_140525.png",
              },
              {
                name: "Versatile Earrings",
                slug: "earrings",
                image: "https://www.candere.com/media/home_page_images/product_categories/Chains.png",
              },
              {
                name: "Stylish Bracelets",
                slug: "bangles-bracelets",
                image: "https://www.candere.com/media/home_page_images/product_categories/Necklace_140525.png",
              },
            ].map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-6 transition-transform hover:-translate-y-1 hover:shadow-2xl duration-200"
                style={{ minWidth: 240, borderRadius: '1.5rem', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-6">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={320}
                    height={320}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-2xl text-gray-800 text-center" style={{ fontFamily: 'Pacifico, cursive' }}>
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Men's Jewellery Banner */}
        <section className="bg-black text-white py-20 px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
            Jewellery that speaks strength. Discover bold designs for modern men
          </h2>
          <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold">
            EXPLORE
          </Button>
        </section>

        {/* Collections You'll Love */}
  <section className="bg-black py-16 px-4 md:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-white tracking-tight">Collections You'll Love</h2>
          <p className="text-xl text-white/80 mb-10 font-light">Let's take a glimpse at our featured collections before diving in!</p>
          <div className="max-w-4xl mx-auto">
            <CardCarousel
              images={[
                { src: "https://www.candere.com/media/home_page_images/featured_collection/Evil-Eye.jpg", alt: "Evil Eye" },
                { src: "https://www.candere.com/media/home_page_images/featured_collection/Honey-Bee.jpg", alt: "Honey Bee" },
                { src: "https://www.candere.com/media/home_page_images/featured_collection/Glo.jpg", alt: "Glo" },
                { src: "https://www.candere.com/media/home_page_images/featured_collection/Peacock.jpg", alt: "Peacock" },
                { src: "https://www.candere.com/media/home_page_images/featured_collection/Aruna.jpg", alt: "Aruna" },
              ]}
              autoplayDelay={2000}
              showPagination={true}
              showNavigation={true}
            />
          </div>
        </section>

        {/* Gifts that speak the Occasion */}
        <section className="bg-white py-16 px-4 md:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-100">
            <Image
              src="https://www.candere.com/static/version1754375066/frontend/Codilar/candere_desktop/en_US/Magento_Cms/images/homepageNew/GiftSectionbg.png?height=800&width=1600"
              alt="Background pattern"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-2">
              Gifts that speak the Occasion
            </h2>
            <p className="text-gray-600 mb-12">
              Not seeing your moment here? Don&apos;t worry, there&apos;s a gift
              for that too.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto mb-12">
              {[
                {
                  icon: Cake,
                  name: "Birthday",
                  desc: "Celebrate another year with a thoughtful gift.",
                },
                {
                  icon: Calendar,
                  name: "Anniversary",
                  desc: "Love and Togetherness.",
                },
                {
                  icon: Star,
                  name: "Personal Milestones",
                  desc: "Let yours be unforgettable",
                },
                {
                  icon: Gift,
                  name: "Just Because",
                  desc: "Spontaneous gifts to show affection.",
                },
                {
                  icon: Baby,
                  name: "Baby Showers",
                  desc: "Welcome new life with meaningful jewellery.",
                },
                {
                  icon: Sparkles,
                  name: "Festive",
                  desc: "Make every festival special",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center text-center p-4"
                >
                  <item.icon className="w-12 h-12 text-gray-900 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 rounded-full text-lg font-semibold">
              FIND IT HERE!
            </Button>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="bg-gray-900 text-white py-8 px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-7xl mx-auto text-center">
            {[
              { icon: CheckCircle, text: "Certified Jewellery" },
              { icon: RefreshCcw, text: "Lifetime Exchange" },
              { icon: Star, text: "100% Refund*" },
              { icon: Truck, text: "International Shipping" },
              { icon: ShieldCheck, text: "Trust of Kalyan Jewellers" },
              { icon: CalendarDays, text: "DGRP" },
              { icon: Clock, text: "15 Day Return" },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center p-2">
                <item.icon className="w-8 h-8 text-white mb-2" />
                <span className="text-xs font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Discover In-Person Section */}
        <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
          <Image
            src="https://www.candere.com/static/version1754375066/frontend/Codilar/candere_desktop/en_US/Magento_Cms/images/homepageNew/StoreSection.png?height=600&width=1200"
            alt="Jewelry store interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-gray-900 bg-opacity-90 p-8 rounded-lg shadow-xl text-white text-center max-w-xl w-full">
              <h2 className="text-3xl font-bold mb-6">
                Discover the magic In-Person! at a Store Near You!
              </h2>
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold flex-grow">
                  DISCOVER NOW!
                </Button>
                <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold flex-grow">
                  BOOK AN APPOINTMENT
                </Button>
              </div>
              <div className="flex justify-center gap-6">
                <Link href="#" className="text-white hover:text-gray-300">
                  <Instagram className="w-8 h-8" />
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Facebook className="w-8 h-8" />
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Youtube className="w-8 h-8" />
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Twitter className="w-8 h-8" />
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <Linkedin className="w-8 h-8" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Classy Solitaires Banner */}
        <section className="relative w-full h-[400px] bg-gradient-to-r from-[#003366] to-[#006699] flex items-center justify-center overflow-hidden">
          <Image
            src="https://www.candere.com/media/home_page_images/bannerPromo/Solitaire_020725.jpg?height=400&width=1200"
            alt="Background pattern"
            fill
            className="object-cover"
          />
        </section>

        {/* Real Stories & Smiles */}
        <section className="bg-gray-50 py-16 px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="md:w-1/3 text-center md:text-left">
            <h2 className="text-5xl font-extrabold leading-tight text-gray-900 tracking-tight">
              1 Lakh+ Real Stories & Real Smiles
            </h2>
          </div>
          <div className="md:w-2/3 flex justify-center relative">
            <div className="relative w-64 h-[400px] bg-gray-900 rounded-[2.5rem] shadow-xl flex items-center justify-center p-2">
              <div className="absolute top-0 w-24 h-6 bg-gray-800 rounded-b-xl"></div>
              <div className="absolute bottom-2 w-16 h-1.5 bg-gray-800 rounded-full"></div>
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col items-center justify-start p-4">
                <div className="flex items-center justify-between w-full mb-4">
                  <Menu className="w-6 h-6 text-gray-700" />
                  <span className="text-lg font-bold text-gray-900">
                    CANDERE
                  </span>
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 text-gray-700" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </div>
                </div>
                <div className="text-center mb-4">
                  <div className="flex justify-center text-yellow-500 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    4.7{" "}
                    <span className="text-base font-normal">
                      out of 5 stars
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    15,917 Customer Ratings
                  </p>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <div className="bg-gray-100 p-3 rounded-lg text-left">
                    <div className="flex text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-800 line-clamp-3">
                      This gold earring is simple yet elegant. It&apos;s the
                      perfect balance of understated beauty and a touch of
                      sparkle.
                    </p>
                    <p className="text-xs font-semibold text-gray-700 mt-2">
                      Siddharth Bakshi
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-left">
                    <div className="flex text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-800 line-clamp-3">
                      The Platinum jewelry has a brilliant shine and retains its
                      beauty even with daily use.
                    </p>
                    <p className="text-xs font-semibold text-gray-700 mt-2">
                      Dipesh Shaha
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg text-left">
                    <div className="flex text-yellow-500 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-800 line-clamp-3">
                      I purchase fabulous diamond ring from infiniti mall and
                      cndr kj staff very polite and co-operative like...
                    </p>
                    <p className="text-xs font-semibold text-gray-700 mt-2">
                      Kaira Rana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fresh Off the Feed */}
        <section className="bg-black text-white py-16 px-4 md:px-8 text-center">
          <h2 className="text-5xl font-extrabold mb-12 tracking-tight">Fresh Off the Feed</h2>
          <div className="relative max-w-7xl mx-auto overflow-x-auto">
            <div className="flex gap-10 md:gap-14 lg:gap-20 items-end justify-center min-w-[1100px]">
              {[
                {
                  user: "Canderejewellery",
                  img: "https://www.candere.com/media/home_page_images/social/01.png",
                },
                {
                  user: "Canderejewellery",
                  img: "https://www.candere.com/media/home_page_images/social/02.png",
                },
                {
                  user: "Canderejewellery",
                  img: "https://www.candere.com/media/home_page_images/social/03.png",
                },
                {
                  user: "Canderejewellery",
                  img: "https://www.candere.com/media/home_page_images/social/04.png",
                },
                {
                  user: "Canderejewellery",
                  img: "https://www.candere.com/media/home_page_images/social/05.png",
                },
              ].map((post, idx) => {
                // More pronounced zig-zag effect
                const marginTops = ["mt-0", "mt-12", "mt-24", "mt-12", "mt-0"];
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-center w-[320px] ${marginTops[idx % marginTops.length]}`}
                    style={{zIndex: 10 - Math.abs(2-idx)}}
                  >
                    <Image
                      src={post.img}
                      alt="Instagram Post"
                      width={320}
                      height={320}
                      className="object-contain w-full h-[320px] rounded-2xl border border-gray-100 shadow-xl bg-white"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* <Footer/> */}
      </div>
    </ReduxProvider>
  );
}
