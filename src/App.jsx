
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './pages/page_resource/Portal.css'
import './pages/page_resource/Post.css'
import './pages/page_resource/Notif.css'
import './pages/page_resource/Youth.css'
import './pages/page_resource/Acc.css'
import Overview from './pages/Overview.jsx'
import Youths from './pages/Youths.jsx'
import Accounts from './pages/Accounts.jsx'
import Post from './pages/Post.jsx'
import Portal from './pages/Portal.jsx'
import Notification from './pages/Notification.jsx'
import Settings from './pages/Settings.jsx'
import Layout from './Layout.jsx'
import PublicLayout from './PublicLayout.jsx'
import PortalManage from './pages/PortalManage.jsx'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="/youths" element={<Youths />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/post" element={<Post />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/portal/manage" element={<PortalManage />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/portal" element={<Portal />} />
          <Route path="/login" element={<Portal />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
