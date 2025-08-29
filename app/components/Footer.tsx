import {
  Facebook,
  Instagram,
  X,
  Youtube,
  MessageCircle,
  PinIcon as Pinterest,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SecondFooter from "./SecondFooter";

const Footer = () => {
  return (
    <>
      <section className="bg-gray-900 text-white py-16 px-4 md:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">Get in the Know</h2>
        <p className="text-lg max-w-3xl mx-auto mb-8">
          Sign up to our newsletter for information on sales, delightful content
          and new additions to the collection. :
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 max-w-2xl mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-grow bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-full px-6 py-3"
          />
          <Input
            type="tel"
            placeholder="Your mobile number"
            className="flex-grow bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-full px-6 py-3"
          />
          <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
            SUBSCRIBE NOW
          </Button>
        </div>
      </section>
      <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 text-sm">
          {/* ABOUT US */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold mb-2 border-b border-gray-700 pb-2">
              ABOUT US
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  About Our Company
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Offers T&Cs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* WHY VIMAL JEWELLERS? */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold mb-2 border-b border-gray-700 pb-2">
              WHY VIMAL JEWELLERS?
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  15-Day Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Cancel & Refund
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Lifetime Exchange
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  DGRP
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Certified Jewellery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  VIMAL Wallet
                </Link>
              </li>
            </ul>
          </div>

          {/* EXPERIENCE VIMAL JEWELLERS */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold mb-2 border-b border-gray-700 pb-2">
              EXPERIENCE VIMAL JEWELLERS
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Refer And Earn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Stylery Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Video Gallery
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Virtual Try On
                </Link>
              </li>
            </ul>
          </div>

          {/* JEWELLERY GUIDES */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold mb-2 border-b border-gray-700 pb-2">
              JEWELLERY GUIDES
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Diamond Education
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Gemstone Education
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Metal Education
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Gold Rate Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Jewellery Care
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT US */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold mb-2 border-b border-gray-700 pb-2">
              CONTACT US
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li>India +91 22 61066262</li>
              <li>(9am-7pm, 6 days a week)</li>
              <li>
                <Link
                  href="mailto:support@VIMAL JEWELLERS.com"
                  className="hover:text-white"
                >
                  support@VIMAL JEWELLERS.com
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Find Experience Centre
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Kalyan Store Locator
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Kalyan Jewellers Website
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Kalyan Stores
                </Link>
              </li>
            </ul>
          </div>

          {/* FOLLOW US */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold mb-2 border-b border-gray-700 pb-2">
              FOLLOW US
            </h3>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full hover:opacity-80"
              >
                <Facebook className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center bg-pink-600 rounded-full hover:opacity-80"
              >
                <Instagram className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full hover:opacity-80"
              >
                <X className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-full hover:opacity-80"
              >
                <Youtube className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center bg-red-700 rounded-full hover:opacity-80"
              >
                <Pinterest className="w-4 h-4 text-white" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 flex items-center justify-center bg-green-500 rounded-full hover:opacity-80"
              >
                <MessageCircle className="w-4 h-4 text-white" />{" "}
                {/* Using MessageCircle for 'W' */}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} VIMAL JEWELLERS.COM . ALL RIGHTS RESERVED.{" "}
            <Link href="#" className="hover:text-white">
              SITE MAP
            </Link>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
            <span className="font-semibold">WE ACCEPT</span>
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="Visa"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="Mastercard"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="Paytm"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="RuPay"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="Cash on Delivery"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="PayPal"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
            <Image
              src="/placeholder.svg?height=20&width=40"
              alt="American Express"
              width={40}
              height={20}
              className="h-5 object-contain"
            />
          </div>
        </div>
      </footer>

      {/* Collapsible Information Sections */}
      <section className="bg-white py-8 px-4 md:px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                VIMAL JEWELLERS - Online partner of Kalyan Group
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                VIMAL JEWELLERS made its inception in 2013, VIMAL JEWELLERS has come a long way,
                from being an e-commerce startup to partnering with Kalyan Group
                in 2017. In the last 7 years, VIMAL JEWELLERS has grown in length and
                breadth to offer a catalogue of 8000+ diamond jewellery as well
                as gold jewellery products and a steadily increasing list of
                valued customers in India and across the world. With the advent
                of Kalyan Jewellers, we hope to provide you with an experience
                that leaves no gap between the worlds of online shopping and
                retail.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                Trusted Online Jewellery Store
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                VIMAL JEWELLERS by Kalyan Jewellers is the most trusted online jewellery
                store. Shop your diamond and gold jewellery at VIMAL JEWELLERS today and
                come back anytime in future to exchange with any new design you
                find on our site. Choose from a wide range of secure payment
                options to checkout with the design you want.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                Ease of Online Jewellery Shopping
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                So you think you are spoilt for choice and making that final
                decision is becoming a bit tough; we&apos;ve got filters to the
                rescue. You can filter jewellery on the basis of factors like
                the size of diamond, price, setting style, the number of stones,
                the weight of gold, karat of gold and carat of diamond and lots
                more! Leaves no scope for confusion when your choices are
                shortlisted for you!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                Certified Jewellery Online
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                When you spend your &apos;hard-earned&apos; money on a luxury
                item, why would you want to leave any stone unturned in assuring
                satisfaction and peace of mind for your purchase? VIMAL JEWELLERS never
                sells even a single piece of jewellery without proper and valid
                certification from the most trustworthy certifying labs and
                bodies. You trust us, we trust them: GIA, IGI, BIS.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:no-underline">
                Installment on your favourite Diamond & Gold Jewellery Designs
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm leading-relaxed">
                Whoever thought of saving a few thousand on Equated Monthly
                Installment that too on your precious jewellery purchase? Well,
                VIMAL JEWELLERS gives you the liberty to buy the jewellery you love,
                with Double Benefit.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Popular Searches Section */}
      <SecondFooter />
    </>
  );
};

export default Footer;
