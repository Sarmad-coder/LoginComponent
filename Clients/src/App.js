import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import Signup from "./Components/signup/signup"
import Login from "./Components/login/login"
import { Provider } from "react-redux"
import myStore from "./store/store"
import Dashboard from "./Components/dashboard/dashboard"
function App() {
  return <BrowserRouter>
    <Provider store={myStore}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/:id" element={<Login />} />

        <Route path="/sign-up" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Provider>
  </BrowserRouter>
}
export default App
