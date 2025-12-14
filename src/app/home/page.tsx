'use client';

import { WishListItemsTable } from '@/components/WishListPage/ui/WIshListItemsTable/WishListItemsTable';
import { Button } from '@/components/ui/button';
import { GiftItem } from '@/types/wishList';

import { motion } from 'framer-motion';
import { ArrowRight, Gift, Share2 } from 'lucide-react';
import Link from 'next/link';

// Mock data for the showcase
const mockGifts: GiftItem[] = [
  {
    _id: '1',
    name: 'Sony A7IV Camera',
    price: 2499.0,
    currency: 'USD',
    priority: 'High',
    status: 'Reserved',
    url: 'https://example.com/camera',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    wishListId: 'demo',
    userId: 'demo',
    reservedBy: 'demo',
  },
  {
    _id: '2',
    name: 'Herman Miller Aeron',
    price: 1450.0,
    currency: 'USD',
    url: 'https://example.com/chair',
    priority: 'Medium',
    status: 'Available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    wishListId: 'demo',
    userId: 'demo',
    reservedBy: 'demo',
  },
  {
    _id: '3',
    reservedBy: 'demo',
    name: 'MacBook Pro M3',
    price: 1999.0,
    currency: 'USD',
    priority: 'High',
    status: 'Available',
    url: 'https://example.com/macbook',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    wishListId: 'demo',
    userId: 'demo',
  },
];

export default function HomePage() {
  const noop = () => {};

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-gray-300 font-sans selection:bg-white/20">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0C0C0C]/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">
              SkyWishes
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Button
              asChild
              className="bg-white text-black hover:bg-gray-200 rounded-full px-6 h-8 text-sm font-medium"
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 container mx-auto px-6">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-32 relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -z-10" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              The Wishlist, <br /> Reimagined.
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Experience a new way to organize your desires.
              <br />
              Minimal, fast, and intelligent.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="bg-white  text-black hover:bg-gray-200 rounded-full px-8 h-12 text-base font-medium min-w-[160px]"
              >
                <Link href="/register">
                  Start Wishing <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white/10 text-black hover:bg-white/5 hover:text-white rounded-full px-8 h-12 text-base font-medium min-w-[160px]"
              >
                View Demo
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Bento Grid Features - Redesigned */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {/* Large Card - App Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 lg:col-span-3 row-span-2 bg-[#0C0C0C] border border-white/10 rounded-3xl p-1 overflow-hidden group shadow-2xl"
          >
            <div className="bg-white/5 rounded-[20px] p-6 h-full border border-white/5">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Your Wishes
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Clean, organized, and beautiful.
                  </p>
                </div>
                {/* Fake UI controls to adding realism */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40">
                <WishListItemsTable
                  gifts={mockGifts}
                  isOwner={true}
                  deleteGift={noop}
                  editGift={noop}
                  sortGifts={noop}
                  reserveGift={noop}
                />
              </div>
            </div>
          </motion.div>

          {/* Feature: Gift Tracking */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-colors"
          >
            <Gift className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Gift Tracking</h3>
            <p className="text-sm text-gray-400">
              Never receive duplicate gifts again. Status tracking built-in.
            </p>
          </motion.div>

          {/* Feature: Social Sharing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-colors"
          >
            <Share2 className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Social Sharing
            </h3>
            <p className="text-sm text-gray-400">
              Share with family or keep it private. You have full control.
            </p>
          </motion.div>

          {/* Third card filler to balance the grid if needed, or leave as 2 cols below */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-colors"
          >
            <div className="flex items-center justify-center h-full">
              <Link
                href="/register"
                className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
              >
                Join SkyWishes <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-16 flex flex-col md:flex-row justify-between items-center bg-[#0C0C0C]">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            © 2026 SkyWishes Inc. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
