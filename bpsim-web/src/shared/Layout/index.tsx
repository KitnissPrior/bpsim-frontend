import { Outlet } from 'react-router-dom'
import './layout.css'
import { Suspense } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

interface ILayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: ILayoutProps = {}) => {

  return (
    <>
      <div className="main">
        <div className="top">
          <Navbar />
        </div>
        <div className="page-content">
          <Suspense fallback={<div>Загрузка...</div>}>
            <Outlet context={children} />
          </Suspense>
        </div>
        <hr />
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
