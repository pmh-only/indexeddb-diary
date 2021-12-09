import React from 'react'
import ReactDOM from 'react-dom'
import { motion } from 'framer-motion'

import App from './App'
import 'react-calendar/dist/Calendar.css'
import 'suneditor/dist/css/suneditor.min.css'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <App />
    </motion.div>
  </React.StrictMode>,
  document.getElementById('root')
)
