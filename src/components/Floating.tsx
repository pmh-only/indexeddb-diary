import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Floating () {
  const [isVisible, setVisiblity] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setVisiblity(false)
    }, 1500)
  }, [])

  return (
    <div>
      {isVisible && (
        <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 1 }}
        style={{ backgroundColor: '#282c34' }}
        className="font-pen cursor-none py-4 h-screen w-screen absolute flex flex-col gap-2 items-center justify-center">

          <motion.h1 initial={{ rotate: -50, scale: 1.2 }} animate={{ rotate: 0, scale: 1 }} className="text-8xl mb-2">🌙.</motion.h1>
          <p className="text-4xl font-bold">All Day Diary</p>
          <p>by min &amp; sung</p>

        </motion.div>
      )}
    </div>
  )
}
