"use client";

import Link from "next/link";
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-lg font-bold">F</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Foodie</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Delivering happiness, one meal at a time. The best local restaurants at your fingertips.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-red-400 transition-colors">Home</Link></li>
              <li><Link href="/restaurants" className="hover:text-red-400 transition-colors">Restaurants</Link></li>
              <li><Link href="/cart" className="hover:text-red-400 transition-colors">My Cart</Link></li>
              <li><Link href="/login" className="hover:text-red-400 transition-colors">Sign In</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="hover:text-red-400 transition-colors cursor-pointer">Burgers</span></li>
              <li><span className="hover:text-red-400 transition-colors cursor-pointer">Pizza</span></li>
              <li><span className="hover:text-red-400 transition-colors cursor-pointer">Sushi</span></li>
              <li><span className="hover:text-red-400 transition-colors cursor-pointer">Healthy</span></li>
              <li><span className="hover:text-red-400 transition-colors cursor-pointer">Desserts</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span>support@foodie.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 mt-0.5" />
                <span>123 Foodie Lane, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 Foodie. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
