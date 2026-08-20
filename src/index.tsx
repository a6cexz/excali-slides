import React from 'react'
import { createRoot } from 'react-dom/client'
import { SlidesList } from './SlidesList'
import 'normalize.css'

const root = createRoot(document.getElementById('app')!)
root.render(<SlidesList />)
