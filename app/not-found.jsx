"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Compass, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/80 text-foreground">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="inline-block mb-8"
        >
          <Compass size={80} className="text-primary" />
        </motion.div>
        <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
        <p className="text-xl mb-8">It seems you've ventured into uncharted territory.</p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/">
            <Button size="lg" className="font-semibold">
              <Home className="mr-2" size={20} />
              Return to Home
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <p className="text-muted-foreground">Need help navigating your career? CareerCraft AI is here to guide you.</p>
        <p className="text-muted-foreground mt-2">Explore our tools and resources to craft your perfect career path.</p>
      </motion.div>
    </div>
  )
}

export default NotFound

