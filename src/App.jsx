
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './pages/page_resource/Youth.css'
import Overview from './pages/Overview.jsx'
import Youths from './pages/Youths.jsx'
import Accounts from './pages/Accounts.jsx'
import Post from './pages/Post.jsx'
import Notification from './pages/Notification.jsx'
import Settings from './pages/Settings.jsx'
import Layout from './Layout.jsx'
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Overview />} />
              <Route path="/youths" element={<Youths />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/post" element={<Post />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
