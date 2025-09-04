"use client";
import { HeaderCartIcon } from "@/components/header-cart-icon";
import { Button } from "@/components/ui/button";
import { AnimatedSearchInput } from "@/components/AnimatedSearchInput";
import { UserDropdown } from "@/components/user-dropdown";
import { ChevronDown, FileText, Headset, Heart, MapPin, Menu, Search, Store, Truck } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    "BESTSELLERS",
    "NEW ARRIVALS", 
    "RINGS",
    "EARRINGS",
    "NECKLACE",
    "BANGLES & BRACELETS",
    "SOLITAIRES",
    "MANGALSUTRAS & PENDANTS",
    "OTHER JEWELLERY",
    "GIFTS",
  ];

  const megaMenuData = {
    EARRINGS: {
      shopByStyle: [
        { name: "STUDS", icon: "💎" },
        { name: "JHUMKA", icon: "👂" },
        { name: "DANGLES", icon: "💫" },
        { name: "HOOPS", icon: "⭕" },
        { name: "SUI DHAGA", icon: "✨" },
        { name: "SOLITAIRE", icon: "💍" },
        { name: "NAVRATNA", icon: "🌈" },
      ],
      shopByMaterial: [
        { name: "DIAMOND", icon: "💎" },
        { name: "PLATINUM", icon: "⚪" },
        { name: "GEMSTONE", icon: "🔮" },
        { name: "GOLD", icon: "🟡" },
      ],
      shopFor: [
        "UNDER ₹10K",
        "₹10K - ₹20K", 
        "₹20K - ₹30K",
        "₹30K - ₹50K",
        "₹50K - ₹75K",
        "ABOVE ₹75K",
        "WOMEN",
        "MEN",
        "KIDS",
      ],
      shopByOccasion: [
        { name: "DAILY WEAR", icon: "☀️" },
        { name: "CASUAL OUTINGS", icon: "👥" },
        { name: "FESTIVE", icon: "🎉" },
        { name: "ANNIVERSARY", icon: "💕" },
        { name: "WEDDING", icon: "💒" },
      ],
    },
    RINGS: {
      shopByStyle: [
        { name: "SOLITAIRE", icon: "💍" },
        { name: "BAND RINGS", icon: "💫" },
        { name: "COCKTAIL", icon: "🍸" },
        { name: "ETERNITY", icon: "♾️" },
        { name: "STACKABLE", icon: "📚" },
      ],
      shopByMaterial: [
        { name: "DIAMOND", icon: "💎" },
        { name: "PLATINUM", icon: "⚪" },
        { name: "GEMSTONE", icon: "🔮" },
        { name: "GOLD", icon: "🟡" },
      ],
      shopFor: [
        "UNDER ₹10K",
        "₹10K - ₹20K",
        "₹20K - ₹30K", 
        "₹30K - ₹50K",
        "₹50K - ₹75K",
        "ABOVE ₹75K",
        "WOMEN",
        "MEN",
        "KIDS",
      ],
      shopByOccasion: [
        { name: "ENGAGEMENT", icon: "💍" },
        { name: "WEDDING", icon: "💒" },
        { name: "ANNIVERSARY", icon: "💕" },
        { name: "DAILY WEAR", icon: "☀️" },
        { name: "PARTY", icon: "🎉" },
      ],
    },
    NECKLACE: {
      shopByStyle: [
        { name: "CHOKER", icon: "💎" },
        { name: "PENDANT", icon: "🔗" },
        { name: "CHAIN", icon: "⛓️" },
        { name: "STATEMENT", icon: "✨" },
        { name: "LAYERED", icon: "📚" },
      ],
      shopByMaterial: [
        { name: "DIAMOND", icon: "💎" },
        { name: "PLATINUM", icon: "⚪" },
        { name: "GEMSTONE", icon: "🔮" },
        { name: "GOLD", icon: "🟡" },
      ],
      shopFor: [
        "UNDER ₹10K",
        "₹10K - ₹20K",
        "₹20K - ₹30K",
        "₹30K - ₹50K", 
        "₹50K - ₹75K",
        "ABOVE ₹75K",
        "WOMEN",
        "MEN",
        "KIDS",
      ],
      shopByOccasion: [
        { name: "WEDDING", icon: "💒" },
        { name: "FESTIVE", icon: "🎉" },
        { name: "PARTY", icon: "🍾" },
        { name: "DAILY WEAR", icon: "☀️" },
        { name: "OFFICE", icon: "💼" },
      ],
    },
    "BANGLES & BRACELETS": {
      shopByStyle: [
        { name: "BANGLES", icon: "🪙" },
        { name: "BRACELETS", icon: "🔗" },
        { name: "KADA", icon: "🦾" },
        { name: "DELICATE", icon: "✨" },
        { name: "ETERNITY", icon: "♾️" },
      ],
      shopByMaterial: [
        { name: "DIAMOND", icon: "💎" },
        { name: "PLATINUM", icon: "⚪" },
        { name: "GEMSTONE", icon: "🔮" },
        { name: "GOLD", icon: "🟡" },
      ],
      shopFor: [
        "UNDER ₹10K",
        "₹10K - ₹20K",
        "₹20K - ₹30K",
        "₹30K - ₹50K",
        "₹50K - ₹75K",
        "ABOVE ₹75K",
        "WOMEN",
        "MEN",
        "KIDS",
      ],
      shopByOccasion: [
        { name: "DAILY WEAR", icon: "☀️" },
        { name: "FESTIVE", icon: "🎉" },
        { name: "WEDDING", icon: "💒" },
        { name: "PARTY", icon: "🍾" },
      ],
    },
    SOLITAIRES: {
      shopByStyle: [
        { name: "RINGS", icon: "💍" },
        { name: "PENDANTS", icon: "🔗" },
        { name: "EARRINGS", icon: "👂" },
        { name: "NOSE PINS", icon: "👃" },
        { name: "NECKLACE", icon: "📿" },
      ],
      shopByMaterial: [
        { name: "DIAMOND", icon: "💎" },
        { name: "PLATINUM", icon: "⚪" },
        { name: "GEMSTONE", icon: "🔮" },
        { name: "GOLD", icon: "🟡" },
      ],
      shopFor: [
        "UNDER ₹10K",
        "₹10K - ₹20K",
        "₹20K - ₹30K",
        "₹30K - ₹50K",
        "₹50K - ₹75K",
        "ABOVE ₹75K",
        "WOMEN",
        "MEN",
        "KIDS",
      ],
      shopByOccasion: [
        { name: "ENGAGEMENT", icon: "💍" },
        { name: "WEDDING", icon: "💒" },
        { name: "ANNIVERSARY", icon: "💕" },
        { name: "DAILY WEAR", icon: "☀️" },
      ],
    },
    "MANGALSUTRAS & PENDANTS": {
      shopByStyle: [
        { name: "MANGALSUTRA", icon: "🧿" },
        { name: "PENDANT", icon: "🔗" },
        { name: "CHAIN", icon: "⛓️" },
        { name: "BRACELET", icon: "🔗" },
      ],
      shopByMaterial: [
        { name: "DIAMOND", icon: "💎" },
        { name: "PLATINUM", icon: "⚪" },
        { name: "GEMSTONE", icon: "🔮" },
        { name: "GOLD", icon: "🟡" },
      ],
      shopFor: [
        "UNDER ₹10K",
        "₹10K - ₹20K",
        "₹20K - ₹30K",
        "₹30K - ₹50K",
        "₹50K - ₹75K",
        "ABOVE ₹75K",
        "WOMEN",
        "MEN",
        "KIDS",
      ],
      shopByOccasion: [
        { name: "WEDDING", icon: "💒" },
        { name: "FESTIVE", icon: "🎉" },
        { name: "DAILY WEAR", icon: "☀️" },
        { name: "ANNIVERSARY", icon: "💕" },
      ],
    },
    "OTHER JEWELLERY": {
      shopByStyle: [
        { name: "PEACOCK", icon: "🦚" },
        { name: "CHAFA", icon: "🌸" },
        { name: "BUTTERFLY", icon: "🦋" },
        { name: "EVIL EYE", icon: "👁️" },
        { name: "MIRACLE PLATE", icon: "✨" },
      ],
      shopByMaterial: [
        { name: "DIAMOND", icon: "💎" },
        { name: "PLATINUM", icon: "⚪" },
        { name: "GEMSTONE", icon: "🔮" },
        { name: "GOLD", icon: "🟡" },
      ],
      shopFor: [
        "UNDER ₹10K",
        "₹10K - ₹20K",
        "₹20K - ₹30K",
        "₹30K - ₹50K",
        "₹50K - ₹75K",
        "ABOVE ₹75K",
        "WOMEN",
        "MEN",
        "KIDS",
      ],
      shopByOccasion: [
        { name: "FESTIVE", icon: "🎉" },
        { name: "DAILY WEAR", icon: "☀️" },
        { name: "PARTY", icon: "🍾" },
        { name: "ANNIVERSARY", icon: "💕" },
      ],
    },
  };

  const renderMegaMenu = (category: string) => {
    const menuData = megaMenuData[category as keyof typeof megaMenuData];
    if (!menuData) return null;

    return (
      <div className="sticky top-[112px] left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-5 gap-8">
            {/* Shop by Style */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#FADDA0]">
                SHOP BY STYLE
              </h3>
              <div className="space-y-3">
                {menuData.shopByStyle.map((item) => (
                  <Link
                    key={item.name}
                    href={`/category/${item.name.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 text-sm"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop by Material */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#FADDA0]">
                SHOP BY MATERIAL
              </h3>
              <div className="space-y-3">
                {menuData.shopByMaterial.map((item) => (
                  <Link
                    key={item.name}
                    href={`/category/${item.name.toLowerCase()}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 text-sm"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop For */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#FADDA0]">
                SHOP FOR
              </h3>
              <div className="space-y-3">
                {menuData.shopFor.map((item) => (
                  <Link
                    key={item}
                    href={`/category/${item.toLowerCase().replace(/[₹\s-]/g, '')}`}
                    className="block text-gray-600 hover:text-gray-900 text-sm"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {/* Shop by Occasion */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-[#FADDA0]">
                SHOP BY OCCASION
              </h3>
              <div className="space-y-3">
                {menuData.shopByOccasion.map((item) => (
                  <Link
                    key={item.name}
                    href={`/category/${item.name.toLowerCase().replace(/ /g, '-')}`}
                    className="flex items-center gap-3 text-gray-600 hover:text-gray-900 text-sm"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Product */}
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg p-6 text-white">
              <div className="mb-4">
                <Image
                  src="https://www.candere.com/media/jewellery/images/C022008_1.jpg"
                  alt="Featured Earrings"
                  width={120}
                  height={120}
                  className="mx-auto rounded-lg"
                />
              </div>
              <p className="text-sm mb-4 text-center">
                Subtle and glamorous {category.toLowerCase()} to complete your outfit!
              </p>
              <Link
                href={`/category/${category.toLowerCase()}/all`}
                className="block text-center text-sm font-medium underline hover:no-underline"
              >
                VIEW ALL DESIGNS
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <header className="bg-black text-white py-2 px-4 md:px-8 flex justify-between items-center text-xs">
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-1 text-gray-400 hover:text-white"
          >
            <Truck className="w-3 h-3" />
            <span>ORDER TRACKING</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-1 text-gray-400 hover:text-white"
          >
            <Headset className="w-3 h-3" />
            <span>CONTACT US</span>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-1 text-gray-400 hover:text-white"
          >
            <FileText className="w-3 h-3" />
            <span>BLOG</span>
          </Link>
        </div>
      </header>

      {/* Main Navigation (Sticky) */}
      <nav className="bg-black py-4 px-4 md:px-8 border-b border-gray-800 flex items-center justify-between sticky top-0 z-40 shadow-lg">
        <div className="flex-1 flex items-center gap-6">
          <div className="hidden md:block w-96">
            <AnimatedSearchInput
              suggestions={["Search for Rings", "Search for Earrings", "Search for Necklaces", "Search for Bracelets", "Search for Mangalsutra"]}
            />
          </div>
        </div>
        <div className="flex flex-col items-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Vimal Jewellers Logo"
            width={60}
            height={60}
            className="object-cover h-auto mx-auto"
            priority
          />
          <span className="block text-xs mt-1 font-normal text-[#3ed6e0] tracking-widest" style={{ letterSpacing: '0.2em' }}>
            VIMAL JEWELLERS
          </span>
          <span className="block text-[10px] font-light text-white tracking-widest" style={{ letterSpacing: '0.15em' }}>
            LIFESTYLE JEWELLERY
          </span>
        </div>
        <div className="flex-1 flex items-center justify-end gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <MapPin className="w-5 h-5 text-[#FADDA0]" />
            <span className="sr-only">Pincode</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Store className="w-5 h-5 text-[#FADDA0]" />
            <span className="sr-only">Store Locator</span>
          </Button>
          <UserDropdown />
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Heart className="w-5 h-5 text-[#FADDA0]" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
            <span className="sr-only">Wishlist</span>
          </Button>
          <HeaderCartIcon />
        </div>
      </nav>

  {/* Category Navigation with Mega Menu (Sticky) */}
  <div className="bg-black py-3 px-4 md:px-8 border-b border-gray-800 sticky top-[72px] z-30">
        <div className="flex justify-center overflow-x-auto whitespace-nowrap scrollbar-hide">
          {categories.map((item) => (
            <div
              key={item}
              className="relative"
              onMouseEnter={() => setHoveredCategory(item)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                href={`/category/${item
                  .toLowerCase()
                  .replace(/ & /g, "-")
                  .replace(/ /g, "-")}`}
                className={`px-3 py-1 text-xs font-medium block ${
                  item === "NEW ARRIVALS"
                    ? "text-[#FADDA0]"
                    : "text-white hover:text-gray-300"
                }`}
              >
                {item}
              </Link>
            </div>
          ))}
          <Button
            variant="outline"
            className="border-[#FADDA0] text-[#FADDA0] px-3 py-1 text-xs font-medium rounded-md ml-4 bg-transparent"
          >
            OFFERS
          </Button>
          <Button
            variant="outline"
            className="border-[#FADDA0] text-[#FADDA0] px-3 py-1 text-xs font-medium rounded-md ml-2 flex items-center bg-transparent"
          >
            FEATURES <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
        </div>

        {/* Mega Menu */}
        {hoveredCategory && (
          <div
            onMouseEnter={() => setHoveredCategory(hoveredCategory)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            {renderMegaMenu(hoveredCategory)}
          </div>
        )}
      </div>

      {/* Mobile Menu Toggle and Responsive Categories */}
      <div className="md:hidden bg-black py-4 px-4 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <AnimatedSearchInput
              suggestions={["Search for Rings", "Search for Earrings", "Search for Necklaces", "Search for Bracelets", "Search for Mangalsutra"]}
            />
          </div>
          <div>
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="outline"
              className="border-[#FADDA0] text-[#FADDA0] rounded-md"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 bg-black rounded-lg shadow-md">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category
                  .toLowerCase()
                  .replace(/ & /g, "-")
                  .replace(/ /g, "-")}`}
                className="block px-4 py-2 text-sm font-medium text-white hover:bg-[#FADDA0] hover:text-black transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
