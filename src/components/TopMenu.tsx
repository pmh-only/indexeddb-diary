import React, { useState } from 'react'

import Container from './Container'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'

export default function TopMenu () {
  const [date] = useState(new Date())
  const [emoji, setEmoji] = useState(false)

  function onMouseEnter () {
    setEmoji(!emoji)
  }

  return (
    <motion.div initial={{ translateY: -10 }} animate={{ translateY: 0 }} className="shadow select-none sticky z-50">
      <Container>
        <div className="flex justify-between font-pen text-2xl py-3">
          <div onMouseEnter={onMouseEnter} className="cursor-default">{emoji ? '🌙' : '⭐'} All Day Diary</div>
          <div className="hidden sm:block">
            오늘은&nbsp;
            <CountUp delay={1} duration={0.5} end={date.getMonth() + 1}/>월&nbsp;
            <CountUp delay={1} duration={0.5} end={date.getDate()}/>일
          </div>
        </div>
      </Container>
    </motion.div>
  )
}
