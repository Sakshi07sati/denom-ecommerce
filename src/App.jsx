
import { BrowserRouter } from "react-router-dom"
import AllRoutes from "./routes/routes"
import ScrollToTop from './components/common/ScrollToTop';


const App = () => {
  return (
  <BrowserRouter>
      <ScrollToTop />
      
      <AllRoutes />
  </BrowserRouter>
  )
}
export default App;
