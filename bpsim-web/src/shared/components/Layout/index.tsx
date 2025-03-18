import { Outlet } from 'react-router-dom'
import './layout.css'
import { Suspense, useState } from 'react'
import Header from './Header'
import { ToastContainer } from 'react-toastify';

interface ILayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: ILayoutProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="main">
        <div className="header">
          <Header />
        </div>
        <div className="page-content">
          <Suspense fallback={<div>Загрузка...</div>}>
            <ToastContainer aria-label={'alert'} autoClose={1500} />
            <Outlet context={{ children, showLoading: setIsLoading }} />
          </Suspense>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Layout
