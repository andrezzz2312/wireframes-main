import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Servicio from './pages/Servicio.jsx'
import Portafolio from './pages/Portafolio.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Contacto from './pages/Contacto.jsx'
import Layout from './layout/Layout.jsx'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './styles/globals.sass'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/bundle'
import AppContextProvider from './context/AppContext.js'

const App = () => {
	config.autoAddCss = false

	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: 'ease-out',
			once: true,
		})
	}, [])

	return (
		<AppContextProvider>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/servicio/:service' element={<Servicio />} />
						<Route path='/portafolio' element={<Portafolio />} />
						<Route path='/nosotros' element={<Nosotros />} />
						<Route path='/contacto' element={<Contacto />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</AppContextProvider>
	)
}

export default App
