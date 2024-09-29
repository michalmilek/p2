"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

export function ContactPage() {
  return (
    <div className="relative z-10 flex justify-center items-center h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-[#2a2a2a] border-[#d4af37]/20 min-w-[300px] md:min-w-[500px] lg:min-w-[700px]">
          <CardHeader>
            <CardTitle className="text-2xl font-cinzel text-white">Send a Raven</CardTitle>
            <CardDescription className="text-[#f0e68c]">Your message will be delivered posthaste.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name" className="text-[#d4af37]">Name</Label>
                  <Input id="name" placeholder="Your name" className="bg-[#1a1a1a] border-[#d4af37]/20 text-[#f0e68c]" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="text-[#d4af37]">Email</Label>
                  <Input id="email" placeholder="Your email" type="email" className="bg-[#1a1a1a] border-[#d4af37]/20 text-[#f0e68c]" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="message" className="text-[#d4af37]">Message</Label>
                  <Textarea id="message" placeholder="Your message" className="bg-[#1a1a1a] border-[#d4af37]/20 text-[#f0e68c]" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-[#d4af37] text-[#1a1a1a] hover:bg-[#f0e68c]">Send Message</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}