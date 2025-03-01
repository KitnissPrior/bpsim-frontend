import { Outlet } from 'react-router-dom'
import './layout.css'
import { Suspense } from 'react'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';

interface ILayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: ILayoutProps = {}) => {

  return (
    <>
      <div className="main">
        <div className="header">
          <Header />
        </div>
        <div className="page-content">
          <Suspense fallback={<div>Загрузка...</div>}>
            <ToastContainer aria-label={'alert'} autoClose={1500} />
            <Outlet context={children} />
          </Suspense>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
