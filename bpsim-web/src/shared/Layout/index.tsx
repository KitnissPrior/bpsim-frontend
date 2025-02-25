import { Outlet } from 'react-router-dom'
import './layout.css'
import { Suspense } from 'react'

interface ILayoutProps {
  children?: React.ReactNode
}

const Layout = ({ children }: ILayoutProps = {}) => {

  return (
    <>
      <div className="main">
        <div className="top">
          навбар
        </div>
        <div className="page-content">
          <Suspense fallback={<div>Загрузка...</div>}>
            <Outlet context={children} />
          </Suspense>
        </div>
        <div className="footer">
          подвал
        </div>
      </div>
    </>
  )
}

export default Layout
