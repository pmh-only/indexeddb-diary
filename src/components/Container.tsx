import React from 'react'

export default function Container ({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="container px-3">
        {children}
      </div>
    </div>
  )
}
