import React, { useState } from 'react'

import TopMenu from './components/TopMenu'
import Floating from './components/Floating'
import Container from './components/Container'
import Card from './components/Card'
import Calendar from 'react-calendar'
import { IndexedDB, initDB, ObjectStoreMeta } from 'react-indexed-db'
import { motion } from 'framer-motion'

const meta: ObjectStoreMeta = {
  store: 'diary',
  storeConfig: { keyPath: 'id', autoIncrement: false },
  storeSchema: [
    { name: 'content', keypath: 'content', options: { unique: false } },
    { name: 'date', keypath: 'date', options: { unique: false } }
  ]
}

initDB({
  name: 'DB',
  version: 1,
  objectStoresMeta: [meta]
})

export default function App () {
  const [value, onChange] = useState(new Date())

  return (
    <IndexedDB name="DB" version={1} objectStoresMeta={[meta]}>
      <Floating />
      <TopMenu />
      <Container>
        <div className="py-3 flex gap-5">
          <motion.div initial={{ translateX: '-200%' }} animate={{ translateX: 0 }} transition={{ delay: 1, duration: 0.3 }} className="w-1/3">
            <div className="font-pen text-4xl mb-3">날짜를 선택해 주세요</div>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ bounce: 1 }}>
              <Calendar calendarType="US" locale="ko-KR" onChange={onChange} value={value}/>
            </motion.div>
            <div className="py-10">
              만든이: 박민혁, 응원한사람: 김성희
            </div>
          </motion.div>
          <Card year={value.getFullYear()} month={value.getMonth() + 1} day={value.getDate()}/>
        </div>
      </Container>
    </IndexedDB>
  )
}
