"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

const blogPosts = [
  { id: 1, title: "The Art of Monster Tracking in Web Development", date: "1272, Velen", excerpt: "Uncover the secrets of efficient code organization and bug hunting." },
  { id: 2, title: "Brewing Potions: Optimizing Web Performance", date: "1273, Novigrad", excerpt: "Learn the alchemical techniques to enhance your website's speed and responsiveness." },
  { id: 3, title: "Signs and Spells: Mastering CSS Animations", date: "1274, Skellige", excerpt: "Harness the power of CSS to create captivating visual effects in your projects." },
]

export function BlogPage() {
  return (
    <div className="relative z-10">
      <motion.h1 
        className="text-4xl font-bold mb-8 font-cinzel text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Chronicles of a Code Witcher (placeholder currently)
      </motion.h1>
      <div className="space-y-6">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Card className="bg-[#2a2a2a] border-[#d4af37]/20 overflow-hidden group">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-2 font-cinzel text-white">{post.title}</h2>
                <p className="text-sm text-[#f0e68c] mb-4">{post.date}</p>
                <p className="text-[#d4af37]">{post.excerpt}</p>
                <div className="mt-4 h-1 w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-full"></div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
