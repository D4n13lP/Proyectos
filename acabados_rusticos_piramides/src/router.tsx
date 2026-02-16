import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<h1>Home</h1>} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
