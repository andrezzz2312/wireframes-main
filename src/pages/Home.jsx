import { useState, useEffect, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Helmet from 'react-helmet'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { gsap } from 'gsap'
import { AppContext } from '../context/AppContext'
import Companies from '../components/Companies'
import Form from '../components/Form'
import styles from '../styles/pages/Home.module.sass'
import Planet from '../assets/images/planet.png'
import PlayIcon from '../assets/images/visor-button-icon.png'
import Service1 from '../assets/services/service-1.png'
import Service2 from '../assets/services/service-2.png'
import Service3 from '../assets/services/service-3.png'
import Service4 from '../assets/services/service-4.png'
import ServiceHover1 from '../assets/services/service-1-hover.png'
import ServiceHover2 from '../assets/services/service-2-hover.png'
import ServiceHover3 from '../assets/services/service-3-hover.png'
import ServiceHover4 from '../assets/services/service-4-hover.png'
import Sector1 from '../assets/sectors/sector-1.png'
import Sector2 from '../assets/sectors/sector-2.png'
import Sector3 from '../assets/sectors/sector-3.png'
import Sector4 from '../assets/sectors/sector-4.png'
import Sector5 from '../assets/sectors/sector-5.png'
import Sector6 from '../assets/sectors/sector-6.png'
import Lampara from '../assets/images/lampara.png'
import DetailWhite from '../assets/details/bottom-detail.svg'
import DetailDark from '../assets/details/bottom-detail-dark.svg'
import DetailCyan from '../assets/details/bottom-detail-cyan.svg'
import SwiperPrevButton from '../assets/details/swiper-left.svg'
import SwiperNextButton from '../assets/details/swiper-right.svg'
import * as THREE from 'three'

const Home = () => {
	const [title, setTitle] = useState(0)
	const titleRef = useRef(null)
	const { pathname } = useLocation()
	const { language } = useContext(AppContext)
	useEffect(() => {
		const canvas = document.querySelector('#c')
		const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
		function makeScene(elem) {
			const scene = new THREE.Scene()
			const fov = 45
			const aspect = canvas.innerWidth / canvas.innerHeight // the canvas default
			const near = 0.1
			const far = 5
			const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
			camera.position.set(0, 1, 2)
			camera.lookAt(0, 0, 0)
			{
				const color = 0xffffff
				const intensity = 1
				const light = new THREE.DirectionalLight(color, intensity)
				light.position.set(-1, 2, 4)
				scene.add(light)
			}
			return { scene, camera, elem }
		}
		function setupScene1() {
			const sceneInfo = makeScene(document.querySelector('#box'))
			const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
			const material = new THREE.MeshPhongMaterial({ color: 'red' })
			const mesh = new THREE.Mesh(geometry, material)
			sceneInfo.scene.add(mesh)
			sceneInfo.mesh = mesh
			return sceneInfo
		}
		function setupScene2() {
			const sceneInfo = makeScene(document.querySelector('#pyramid'))
			const radius = 0.8
			const widthSegments = 4
			const heightSegments = 2
			const geometry = new THREE.SphereBufferGeometry(
				radius,
				widthSegments,
				heightSegments
			)
			const material = new THREE.MeshPhongMaterial({
				color: 'blue',
				flatShading: true,
			})
			const mesh = new THREE.Mesh(geometry, material)
			sceneInfo.scene.add(mesh)
			sceneInfo.mesh = mesh
			return sceneInfo
		}
		const sceneInfo1 = setupScene1()
		const sceneInfo2 = setupScene2()
		function resizeRendererToDisplaySize(renderer) {
			const canvas = renderer.domElement
			const width = canvas.clientWidth
			const height = canvas.clientHeight
			const needResize = canvas.width !== width || canvas.height !== height
			if (needResize) {
				renderer.setSize(width, height, false)
			}
			return needResize
		}
		function rendenerSceneInfo(sceneInfo) {
			const { scene, camera, elem } = sceneInfo
			// get the viewport relative position opf this element
			const { left, right, top, bottom, width, height } =
				elem.getBoundingClientRect()
			const isOffscreen =
				bottom < 0 ||
				top > renderer.domElement.clientHeight ||
				right < 0 ||
				left > renderer.domElement.clientWidth
			if (isOffscreen) {
				return
			}
			camera.aspect = width / height
			camera.updateProjectionMatrix()
			const positiveYUpBottom = renderer.domElement.clientHeight - bottom
			renderer.setScissor(left, positiveYUpBottom, width, height)
			renderer.setViewport(left, positiveYUpBottom, width, height)
			renderer.render(scene, camera)
		}
		function render(time) {
			time *= 0.001
			resizeRendererToDisplaySize(renderer)
			renderer.setScissorTest(false)
			renderer.clear(true, true)
			renderer.setScissorTest(true)
			sceneInfo1.mesh.rotation.y = time * 0.1
			sceneInfo2.mesh.rotation.y = time * 0.1
			rendenerSceneInfo(sceneInfo1)
			rendenerSceneInfo(sceneInfo2)
			requestAnimationFrame(render)
		}
		requestAnimationFrame(render)
	}, [])

	const sectors = [
		{
			title: 'Industria Automotriz',
			description:
				'Muestra a tu cliente cómo es o será su vehículo sin la necesidad de que estén físicamente en el sitio.',
			image: Sector1,
			width: 124,
			height: 100,
			animationDelay: 150,
		},
		{
			title: 'Salud',
			description:
				'Los profesionales de la salud pueden usar modelos virtuales como parte del entrenamiento. Existen tratamientos efectivos para tratar la ansiedad o algunos desórdenes post-traumáticos.',
			image: Sector2,
			width: 126,
			height: 126,
			animationDelay: 300,
		},
		{
			title: 'Turismo',
			description:
				'Con las tecnologías de Realidad Virtual, puedes conocer lugares turísticos recreados en 3D y tener acceso completo a vistas 360.',
			image: Sector3,
			width: 127,
			height: 127,
			animationDelay: 450,
		},
		{
			title: 'Bienes Raíces',
			description:
				'Presenta la propiedad que deseas sin salir de casa, mantén a tus clientes seguros. Hazles saber que te preocupas por su seguridad y comodidad.',
			image: Sector4,
			width: 130,
			height: 120,
			animationDelay: 150,
		},
		{
			title: 'Arquitectura',
			description:
				'Experimenta y siente el diseño antes de construirlo físicamente. La realidad virtual te permite experimentar el sitio como si ya estuviera hecho.',
			image: Sector5,
			width: 115,
			height: 118,
			animationDelay: 300,
		},
		{
			title: 'Educación',
			description:
				'El clima o las distancias ya no son un problema, explora tus laboratorios y haz tus experimentos sin estar presente en la escuela.',
			image: Sector6,
			width: 130,
			height: 128,
			animationDelay: 450,
		},
	]
	const sectorsEn = [
		{
			title: 'Automotive industry',
			description:
				'Show your client how their vehicle will be without being physically on site.',
			image: Sector1,
			width: 124,
			height: 100,
			animationDelay: 150,
		},
		{
			title: 'Health',
			description:
				'Healthcare professionals can use virtual models as part of training. There are effective treatments to treat anxiety or some post-traumatic disorders.',
			image: Sector2,
			width: 126,
			height: 126,
			animationDelay: 300,
		},
		{
			title: 'Tourism',
			description:
				'With Virtual Reality technologies, you can see touristic places recreated in 3D and have full access to 360 views',
			image: Sector3,
			width: 127,
			height: 127,
			animationDelay: 450,
		},
		{
			title: 'Real State',
			description:
				'Show the property you want without leaving home, keep your clients safe. Let them know you care about their safety and comfort.',
			image: Sector4,
			width: 130,
			height: 120,
			animationDelay: 150,
		},
		{
			title: 'Architecture',
			description:
				'Experiment and feel the design before building it. Virtual reality allows you to experience the site as if it were already made.',
			image: Sector5,
			width: 115,
			height: 118,
			animationDelay: 300,
		},
		{
			title: 'Education',
			description:
				'Weather or distances are no longer a problem, explore your labs and do your experiments without being at school.',
			image: Sector6,
			width: 130,
			height: 128,
			animationDelay: 450,
		},
	]
	const titles = [
		'Metaverso',
		'Realidad Virtual',
		'Realidad Aumentada',
		'Experiencias Web',
	]
	const titlesEn = [
		'Metaverse',
		'Virtual Reality',
		'Augmented Reality',
		'Web Experiencies',
	]

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	useEffect(() => {
		if (titleRef.current) {
			gsap.fromTo(
				titleRef.current,
				{ x: 0, opacity: 1 },
				{ x: -400, opacity: 0, duration: 2, delay: 2 }
			)
			setTimeout(() => {
				if (title === 3) {
					setTitle(0)
					gsap.fromTo(
						titleRef.current,
						{ x: 200, opacity: 0 },
						{ x: 0, opacity: 1, duration: 1 }
					)
				} else {
					setTitle(title + 1)

					gsap.fromTo(
						titleRef.current,
						{ x: 200, opacity: 0 },
						{ x: 0, opacity: 1, duration: 1 }
					)
				}
			}, [4000])
		}
	}, [titleRef, title])

	if (language === 'es')
		return (
			<main>
				<Helmet>
					<title>Wireframe Reality</title>
				</Helmet>

				{/* Hero */}
				<section className={`${styles.Hero_Container_Fluid} container-fluid`}>
					<div className={`${styles.Hero} container p-0`}>
						<div className={styles.Hero_Banner}>
							<div className={styles.Hero_Title_Container}>
								<h1 className={styles.Hero_Title} data-aos='fade-up'>
									Servicios de <br />
									<div className={styles.Hero_Title_Variable} ref={titleRef}>
										{titles[title]}
									</div>
								</h1>
								<h3
									className={styles.Hero_Caption}
									data-aos='fade-up'
									data-aos-delay='250'
								>
									Un nuevo mundo de{' '}
									<span className={styles.Hero_Caption_Highlight}>
										soluciones digitales
									</span>
								</h3>

								<Link
									to='/contacto'
									className={styles.Hero_Link}
									data-aos='fade-up'
									data-aos-delay='500'
								>
									Contáctanos
								</Link>
							</div>
							{/* <img
							src={Planet}
							className={styles.Hero_Image}
							alt="Wireframes Planet"
							data-aos="zoom-in"
						/> */}
							<canvas id='c' className={styles.c}></canvas>
							<div className={styles.threed}>
								<span
									id='box'
									className={`${styles.diagram} ${styles.left}`}
								></span>
							</div>
							<div className={styles.threed}>
								<span
									id='pyramid'
									className={`${styles.diagram} ${styles.right}`}
								></span>
							</div>
						</div>
					</div>

					<div className='container'>
						<div className={`${styles.Visor_Container} row`}>
							<div
								className={`${styles.Visor} col-12 col-lg-6`}
								data-aos='fade-up'
							>
								<span className={styles.Visor_Text}>
									¡Conoce{' '}
									<span className={styles.Visor_Text_Highlight}>
										nuestro trabajo!
									</span>
								</span>
								<Link to='/portafolio' className={styles.Visor_Button}>
									<img
										src={PlayIcon}
										className={styles.Visor_Button_Icon}
										alt='Wireframes Visor'
									/>
								</Link>
							</div>
							<div className={`${styles.Visor_Data} col-12 col-lg-6 py-2`}>
								<div
									className={styles.Visor_Data_Item}
									data-aos='fade-up'
									data-aos-delay='150'
								>
									<h4 className={styles.Visor_Data_Title}>Tecnología</h4>
									<p className={styles.Visor_Data_Text}>
										Soluciones innovadoras con tecnología WebXR
									</p>
								</div>
								<div
									className={styles.Visor_Data_Item}
									data-aos='fade-up'
									data-aos-delay='300'
								>
									<h4 className={styles.Visor_Data_Title}>Posicionamiento</h4>
									<p className={styles.Visor_Data_Text}>
										Proveemos nuevas experiencias para que sus productos o
										servicios tengan mejor visibilidad en el mercado.
									</p>
								</div>
								<div
									className={styles.Visor_Data_Item}
									data-aos='fade-up'
									data-aos-delay='450'
								>
									<h4 className={styles.Visor_Data_Title}>
										Sociedad Internacional
									</h4>
									<p className={styles.Visor_Data_Text}>
										Trabajamos junto a empresas de Estados Unidos, Canadá,
										Dubái, U.K. entre otros.
									</p>
								</div>
								<div
									className={styles.Visor_Data_Item}
									data-aos='fade-up'
									data-aos-delay='600'
								>
									<h4 className={styles.Visor_Data_Title}>Versatilidad</h4>
									<p className={styles.Visor_Data_Text}>
										Empleamos la realidad virtual en beneficio de la medicina,
										educación, arquitectura, etc.
									</p>
								</div>
							</div>
						</div>
					</div>

					<img
						src={DetailWhite}
						className={styles.Hero_Bottom_Detail}
						alt='White Detail'
					/>
				</section>

				{/* Services */}
				<section
					className={`${styles.Services_Container_Fluid} container-fluid`}
				>
					<div className={`${styles.Services} container`}>
						<h2 className={styles.Services_Title} data-aos='fade-up'>
							Nuestros Servicios
						</h2>
						<h3
							className={styles.Services_Caption}
							data-aos='fade-up'
							data-aos-delay='500'
						>
							Brindamos la mejor experiencia interactiva por medio de Realidad
							Aumentada (AR), Realidad Virtual (VR) Y Realidad Mixta (MR).
						</h3>

						<div
							className={`${styles.ServicesCards} row pt-4 pt-md-5 pb-0 pb-md-4`}
						>
							<div className='col-12 col-lg-6 px-0 pe-lg-4 d-flex flex-column justify-content-center'>
								<div className={styles.ServiceCard} data-aos='fade-up'>
									<div className={styles.ServiceCard_Image_Container_1}>
										<img
											className={styles.ServiceCard_Image}
											src={Service1}
											alt='Realidad Virtual'
											title='Realidad Virtual'
										/>
										<img
											className={styles.ServiceCard_Hover_Image}
											src={ServiceHover1}
											alt='Realidad Virtual'
											title='Realidad Virtual'
										/>
									</div>
									<div className={styles.ServiceCard_Text_Container}>
										<div>
											<h4 className={styles.ServiceCard_Title}>
												Realidad Virtual
											</h4>
											<p className={styles.ServiceCard_Text}>
												Rehacemos ambientes tridimensionales, donde el usuario
												podrá experimentar a través del uso de gafas VR.
											</p>
										</div>
										<Link
											to='/servicio/realidad-virtual'
											className={styles.ServiceCard_Link}
										>
											Ver más
										</Link>
									</div>
									<img
										className={styles.ServiceCard_Detail_White}
										src={DetailWhite}
										alt='White Detail'
									/>
								</div>

								<div
									className={`${styles.ServiceCard} d-flex d-lg-none`}
									data-aos='fade-up'
								>
									<div className={styles.ServiceCard_Image_Container_3}>
										<img
											className={styles.ServiceCard_Image}
											src={Service2}
											alt='Realidad Aumentada'
											title='Realidad Aumentada'
										/>
										<img
											className={styles.ServiceCard_Hover_Image}
											src={ServiceHover2}
											alt='Realidad Aumentada'
											title='Realidad Aumentada'
										/>
									</div>
									<div className={styles.ServiceCard_Text_Container}>
										<div>
											<h4 className={styles.ServiceCard_Title}>
												Realidad Aumentada
											</h4>
											<p className={styles.ServiceCard_Text}>
												Hacemos posible que un elemento virtual se pueda
												proyectar en la realidad a través de un dispositivo
												tecnológico.
											</p>
										</div>
										<Link
											to='/servicio/realidad-aumentada'
											className={styles.ServiceCard_Link}
										>
											Ver más
										</Link>
									</div>
									<img
										src={DetailDark}
										className={styles.ServiceCard_Detail_Dark}
										alt='Dark Detail'
									/>
								</div>

								<div
									className={styles.ServiceCard}
									data-aos='fade-up'
									data-aos-delay='250'
								>
									<div className={styles.ServiceCard_Image_Container_2}>
										<img
											className={styles.ServiceCard_Image}
											src={Service3}
											alt='Experiencias 3D en la Web'
											title='Experiencias 3D en la Web'
										/>
										<img
											className={styles.ServiceCard_Hover_Image}
											src={ServiceHover3}
											alt='Experiencias 3D en la Web'
											title='Experiencias 3D en la Web'
										/>
									</div>
									<div className={styles.ServiceCard_Text_Container}>
										<div>
											<h4 className={styles.ServiceCard_Title}>
												Experiencias 3D en la Web
											</h4>
											<p className={styles.ServiceCard_Text}>
												Con nosotros vivirás la experiencia de poder visualizar
												tus productos estrella en 3d a través de una página web.
											</p>
										</div>
										<Link
											to='/servicio/experiencias-3D'
											className={styles.ServiceCard_Link}
										>
											Ver más
										</Link>
									</div>
									<img
										src={DetailWhite}
										className={styles.ServiceCard_Detail_White}
										alt='White Detail'
									/>
								</div>
							</div>

							<div className='col-12 col-lg-6 px-0 ps-lg-4 d-flex flex-column justify-content-center'>
								<div
									className={`${styles.ServiceCard} d-none d-lg-flex`}
									data-aos='fade-up'
								>
									<div className={styles.ServiceCard_Image_Container_3}>
										<img
											className={styles.ServiceCard_Image}
											src={Service2}
											alt='Realidad Aumentada'
											title='Realidad Aumentada'
										/>
										<img
											className={styles.ServiceCard_Hover_Image}
											src={ServiceHover2}
											alt='Realidad Aumentada'
											title='Realidad Aumentada'
										/>
									</div>
									<div className={styles.ServiceCard_Text_Container}>
										<div>
											<h4 className={styles.ServiceCard_Title}>
												Realidad Aumentada
											</h4>
											<p className={styles.ServiceCard_Text}>
												Hacemos posible que un elemento virtual se pueda
												proyectar en la realidad a través de un dispositivo
												tecnológico.
											</p>
										</div>
										<Link
											to='/servicio/realidad-aumentada'
											className={styles.ServiceCard_Link}
										>
											Ver más
										</Link>
									</div>
									<img
										className={styles.ServiceCard_Detail_Dark}
										src={DetailDark}
										alt='Dark Detail'
									/>
								</div>
								<div
									className={styles.ServiceCard}
									data-aos='fade-up'
									data-aos-delay='250'
								>
									<div className={styles.ServiceCard_Image_Container_4}>
										<img
											src={Service4}
											className={styles.ServiceCard_Image}
											alt='Metaverso'
											title='Metaverso'
										/>
										<img
											className={styles.ServiceCard_Hover_Image}
											src={ServiceHover4}
											alt='Metaverso'
											title='Metaverso'
										/>
									</div>
									<div className={styles.ServiceCard_Text_Container}>
										<div>
											<h4 className={styles.ServiceCard_Title}>
												Servicios de Metaverso
											</h4>
											<p className={styles.ServiceCard_Text}>
												Recreamos tu negocio, tu propio universo en un ambiente
												virtual, donde podrás interactuar con otros usuarios en
												línea.
											</p>
										</div>
										<Link
											to='/servicio/metaverso'
											className={styles.ServiceCard_Link}
										>
											Ver más
										</Link>
									</div>
									<img
										className={styles.ServiceCard_Detail_Dark}
										src={DetailDark}
										alt='Dark Detail'
									/>
								</div>
							</div>
						</div>
					</div>
					<img
						src={DetailCyan}
						className={styles.Hero_Bottom_Detail}
						alt='Cyan Detail'
					/>
				</section>

				{/* Sectors */}
				<section
					className={`${styles.Sectors_Container_Fluid} container-fluid`}
				>
					<div className={`${styles.Sectors} container`}>
						<h2 className={styles.Sectors_Title} data-aos='fade-up'>
							Sectores
						</h2>
						<h3
							className={styles.Sectors_Caption}
							data-aos='fade-up'
							data-aos-delay='250'
						>
							Lo que abarcamos en el mercado nacional / internacional.
						</h3>

						<div className={`${styles.Sector_Card_Container} d-none d-sm-grid`}>
							{sectors.map((sector, index) => (
								<div
									className={styles.SectorCard}
									key={`Sector-Card-${index}`}
									data-aos='fade-up'
									data-aos-delay={sector.animationDelay}
								>
									<img
										src={sector.image}
										className={styles.SectorCard_Image}
										alt={sector.title}
										title={sector.title}
									/>
									<h4 className={styles.SectorCard_Title}>{sector.title}</h4>
									<p className={styles.SectorCard_Description}>
										{sector.description}
									</p>
								</div>
							))}
						</div>

						<Swiper
							modules={[Navigation]}
							className={styles.Sector_Swiper}
							slidesPerView={1}
							spaceBetween={80}
							// autoplay={{ delay: 4000, disableOnInteraction: false }}
							navigation={{
								prevEl: '.Sector_Swiper_Prev',
								nextEl: '.Sector_Swiper_Next',
							}}
							loop
							speed={1000}
						>
							<div
								className={`${styles.Sector_Swiper_Prev} Sector_Swiper_Prev`}
							>
								<img src={SwiperPrevButton} alt='Previus Sector' />
							</div>
							<div
								className={`${styles.Sector_Swiper_Next} Sector_Swiper_Next`}
							>
								<img src={SwiperNextButton} alt='Next Sector' />
							</div>
							{sectors.map((sector, index) => (
								<SwiperSlide
									key={`Sector-Card-${index}`}
									className={styles.Sector_Slide}
								>
									<div className={styles.SectorCard}>
										<img
											src={sector.image}
											className={styles.SectorCard_Image}
											alt={sector.title}
											title={sector.title}
										/>
										<h4 className={styles.SectorCard_Title}>{sector.title}</h4>
										<p className={styles.SectorCard_Description}>
											{sector.description}
										</p>
									</div>
								</SwiperSlide>
							))}
						</Swiper>

						<Companies />
					</div>
				</section>

				{/* Idea */}
				<section className={styles.Idea}>
					<img
						className={styles.Idea_Image}
						src={Lampara}
						width={250}
						alt='¿Tienes una idea brillante?'
					/>
					<div className={styles.Idea_Text_Container}>
						<h2 className={styles.Idea_Title} data-aos='fade-up'>
							¿Tienes una idea brillante
						</h2>
						<p className={styles.Idea_Text} data-aos='fade-up'>
							y no sabes cómo desarrollarla?
						</p>

						<Link
							to='/contacto'
							className={styles.Idea_Button}
							data-aos='fade-up'
							data-aos-delay='250'
						>
							Conversemos
						</Link>
					</div>
					<img
						src={DetailWhite}
						className={styles.Hero_Bottom_Detail}
						alt='White Detail'
					/>
				</section>

				{/* Contact */}
				<section
					className={`${styles.Contact_Fluid_Container} container-fluid py-5`}
				>
					<div className={`${styles.Contact} container p-0`}>
						<Form />
					</div>
				</section>
			</main>
		)

	return (
		<main>
			<Helmet>
				<title>Wireframe Reality</title>
			</Helmet>

			{/* Hero */}
			<section className={`${styles.Hero_Container_Fluid} container-fluid`}>
				<div className={`${styles.Hero} container p-0`}>
					<div className={styles.Hero_Banner}>
						<div className={styles.Hero_Title_Container}>
							<h1 className={styles.Hero_Title} data-aos='fade-up'>
								<div className={styles.Hero_Title_Variable} ref={titleRef}>
									{titlesEn[title]}
								</div>
								<br />
								Services
							</h1>
							<h3
								className={styles.Hero_Caption}
								data-aos='fade-up'
								data-aos-delay='250'
							>
								a new world of{' '}
								<span className={styles.Hero_Caption_Highlight}>
									digital solutions
								</span>
							</h3>
							<Link
								to='/contacto'
								className={styles.Hero_Link}
								data-aos='fade-up'
								data-aos-delay='500'
							>
								Contact Us
							</Link>
						</div>
						<img
							src={Planet}
							className={styles.Hero_Image}
							alt='Wireframes Planet'
							data-aos='zoom-in'
						/>
					</div>
				</div>

				<div className='container'>
					<div className={`${styles.Visor_Container} row`}>
						<div
							className={`${styles.Visor} col-12 col-lg-6`}
							data-aos='fade-up'
						>
							<span className={styles.Visor_Text}>
								Come and{' '}
								<span className={styles.Visor_Text_Highlight}>
									see our work!
								</span>
							</span>
							<Link to='/portafolio' className={styles.Visor_Button}>
								<img
									src={PlayIcon}
									className={styles.Visor_Button_Icon}
									alt='Wireframes Visor'
								/>
							</Link>
						</div>
						<div className={`${styles.Visor_Data} col-12 col-lg-6 py-2`}>
							<div
								className={styles.Visor_Data_Item}
								data-aos='fade-up'
								data-aos-delay='150'
							>
								<h4 className={styles.Visor_Data_Title}>Technology</h4>
								<p className={styles.Visor_Data_Text}>
									Innovative solutions with WebXR technology.
								</p>
							</div>
							<div
								className={styles.Visor_Data_Item}
								data-aos='fade-up'
								data-aos-delay='300'
							>
								<h4 className={styles.Visor_Data_Title}>Positioning</h4>
								<p className={styles.Visor_Data_Text}>
									We provide new experiences so that your products or services
									have better visibility in the market.
								</p>
							</div>
							<div
								className={styles.Visor_Data_Item}
								data-aos='fade-up'
								data-aos-delay='450'
							>
								<h4 className={styles.Visor_Data_Title}>
									International Network
								</h4>
								<p className={styles.Visor_Data_Text}>
									We work with companies from USA, Canada, Dubai, UK, among
									others.
								</p>
							</div>
							<div
								className={styles.Visor_Data_Item}
								data-aos='fade-up'
								data-aos-delay='600'
							>
								<h4 className={styles.Visor_Data_Title}>Versatility</h4>
								<p className={styles.Visor_Data_Text}>
									We use Virtual Reality on benefit of medicine, education,
									architecture, etc.
								</p>
							</div>
						</div>
					</div>
				</div>

				<img
					src={DetailWhite}
					className={styles.Hero_Bottom_Detail}
					alt='White Detail'
				/>
			</section>

			{/* Services */}
			<section className={`${styles.Services_Container_Fluid} container-fluid`}>
				<div className={`${styles.Services} container`}>
					<h2 className={styles.Services_Title} data-aos='fade-up'>
						Our Services
					</h2>
					<h3
						className={styles.Services_Caption}
						data-aos='fade-up'
						data-aos-delay='500'
					>
						We provide the best interactive experience through Augmented Reality
						(AR), Virtual Reality (VR) and Mixed Reality (MR).
					</h3>

					<div
						className={`${styles.ServicesCards} row pt-4 pt-md-5 pb-0 pb-md-4`}
					>
						<div className='col-12 col-lg-6 px-0 pe-lg-4 d-flex flex-column justify-content-center'>
							<div className={styles.ServiceCard} data-aos='fade-up'>
								<div className={styles.ServiceCard_Image_Container_1}>
									<img
										className={styles.ServiceCard_Image}
										src={Service1}
										alt='Virtual Reality'
										title='Virtual Reality'
									/>
									<img
										className={styles.ServiceCard_Hover_Image}
										src={ServiceHover1}
										alt='Virtual Reality'
										title='Virtual Reality'
									/>
								</div>
								<div className={styles.ServiceCard_Text_Container}>
									<div>
										<h4 className={styles.ServiceCard_Title}>
											Virtual Reality
										</h4>
										<p className={styles.ServiceCard_Text}>
											We recreate three- dimensional environments, that the user
											can experience through VR headsets.
										</p>
									</div>
									<Link
										to='/servicio/realidad-virtual'
										className={styles.ServiceCard_Link}
									>
										See more
									</Link>
								</div>
								<img
									className={styles.ServiceCard_Detail_White}
									src={DetailWhite}
									alt='White Detail'
								/>
							</div>

							<div
								className={`${styles.ServiceCard} d-flex d-lg-none`}
								data-aos='fade-up'
							>
								<div className={styles.ServiceCard_Image_Container_3}>
									<img
										className={styles.ServiceCard_Image}
										src={Service2}
										alt='Augmented Reality'
										title='Augmented Reality'
									/>
									<img
										className={styles.ServiceCard_Hover_Image}
										src={ServiceHover2}
										alt='Augmented Reality'
										title='Augmented Reality'
									/>
								</div>
								<div className={styles.ServiceCard_Text_Container}>
									<div>
										<h4 className={styles.ServiceCard_Title}>
											Augmented Reality
										</h4>
										<p className={styles.ServiceCard_Text}>
											We make possible for a virtual element to be projected
											into reality through a mobile device.
										</p>
									</div>
									<Link
										to='/servicio/realidad-aumentada'
										className={styles.ServiceCard_Link}
									>
										See more
									</Link>
								</div>
								<img
									src={DetailDark}
									className={styles.ServiceCard_Detail_Dark}
									alt='Dark Detail'
								/>
							</div>

							<div
								className={styles.ServiceCard}
								data-aos='fade-up'
								data-aos-delay='250'
							>
								<div className={styles.ServiceCard_Image_Container_2}>
									<img
										className={styles.ServiceCard_Image}
										src={Service3}
										alt='3D Web Experiences'
										title='3D Web Experiences'
									/>
									<img
										className={styles.ServiceCard_Hover_Image}
										src={ServiceHover3}
										alt='3D Web Experiences'
										title='3D Web Experiences'
									/>
								</div>
								<div className={styles.ServiceCard_Text_Container}>
									<div>
										<h4 className={styles.ServiceCard_Title}>
											3D Web Experiences
										</h4>
										<p className={styles.ServiceCard_Text}>
											With us you&apos;ll live the experience of being able to
											visualize your Star products in 3D through a website.
										</p>
									</div>
									<Link
										to='/servicio/experiencias-3D'
										className={styles.ServiceCard_Link}
									>
										See more
									</Link>
								</div>
								<img
									src={DetailWhite}
									className={styles.ServiceCard_Detail_White}
									alt='White Detail'
								/>
							</div>
						</div>

						<div className='col-12 col-lg-6 px-0 ps-lg-4 d-flex flex-column justify-content-center'>
							<div
								className={`${styles.ServiceCard} d-none d-lg-flex`}
								data-aos='fade-up'
							>
								<div className={styles.ServiceCard_Image_Container_3}>
									<img
										className={styles.ServiceCard_Image}
										src={Service2}
										alt='Augmented Reality'
										title='Augmented Reality'
									/>
									<img
										className={styles.ServiceCard_Hover_Image}
										src={ServiceHover2}
										alt='Augmented Reality'
										title='Augmented Reality'
									/>
								</div>
								<div className={styles.ServiceCard_Text_Container}>
									<div>
										<h4 className={styles.ServiceCard_Title}>
											Augmented Reality
										</h4>
										<p className={styles.ServiceCard_Text}>
											We make possible for a virtual element to be projected
											into reality through a mobile device.
										</p>
									</div>
									<Link
										to='/servicio/realidad-aumentada'
										className={styles.ServiceCard_Link}
									>
										See more
									</Link>
								</div>
								<img
									className={styles.ServiceCard_Detail_Dark}
									src={DetailDark}
									alt='Dark Detail'
								/>
							</div>
							<div
								className={styles.ServiceCard}
								data-aos='fade-up'
								data-aos-delay='250'
							>
								<div className={styles.ServiceCard_Image_Container_4}>
									<img
										src={Service4}
										className={styles.ServiceCard_Image}
										alt='Metaverse'
										title='Metaverse'
									/>
									<img
										className={styles.ServiceCard_Hover_Image}
										src={ServiceHover4}
										alt='Metaverse'
										title='Metaverse'
									/>
								</div>
								<div className={styles.ServiceCard_Text_Container}>
									<div>
										<h4 className={styles.ServiceCard_Title}>
											Metaverse Services
										</h4>
										<p className={styles.ServiceCard_Text}>
											We recreate your business, your own universe in a virtual
											environment, where you can interact with other users
											online.
										</p>
									</div>
									<Link
										to='/servicio/metaverso'
										className={styles.ServiceCard_Link}
									>
										See more
									</Link>
								</div>
								<img
									className={styles.ServiceCard_Detail_Dark}
									src={DetailDark}
									alt='Dark Detail'
								/>
							</div>
						</div>
					</div>
				</div>
				<img
					src={DetailCyan}
					className={styles.Hero_Bottom_Detail}
					alt='Cyan Detail'
				/>
			</section>

			{/* Sectors */}
			<section className={`${styles.Sectors_Container_Fluid} container-fluid`}>
				<div className={`${styles.Sectors} container`}>
					<h2 className={styles.Sectors_Title} data-aos='fade-up'>
						Departments
					</h2>
					<h3
						className={styles.Sectors_Caption}
						data-aos='fade-up'
						data-aos-delay='250'
					>
						What we embrace in the national / international market
					</h3>

					<div className={`${styles.Sector_Card_Container} d-none d-sm-grid`}>
						{sectorsEn.map((sector, index) => (
							<div
								className={styles.SectorCard}
								key={`Sector-Card-${index}`}
								data-aos='fade-up'
								data-aos-delay={sector.animationDelay}
							>
								<img
									src={sector.image}
									className={styles.SectorCard_Image}
									alt={sector.title}
									title={sector.title}
								/>
								<h4 className={styles.SectorCard_Title}>{sector.title}</h4>
								<p className={styles.SectorCard_Description}>
									{sector.description}
								</p>
							</div>
						))}
					</div>

					<Swiper
						modules={[Navigation]}
						className={styles.Sector_Swiper}
						slidesPerView={1}
						spaceBetween={80}
						// autoplay={{ delay: 4000, disableOnInteraction: false }}
						navigation={{
							prevEl: '.Sector_Swiper_Prev',
							nextEl: '.Sector_Swiper_Next',
						}}
						loop
						speed={1000}
					>
						<div className={`${styles.Sector_Swiper_Prev} Sector_Swiper_Prev`}>
							<img src={SwiperPrevButton} alt='Previus Sector' />
						</div>
						<div className={`${styles.Sector_Swiper_Next} Sector_Swiper_Next`}>
							<img src={SwiperNextButton} alt='Next Sector' />
						</div>
						{sectorsEn.map((sector, index) => (
							<SwiperSlide
								key={`Sector-Card-${index}`}
								className={styles.Sector_Slide}
							>
								<div className={styles.SectorCard}>
									<img
										src={sector.image}
										className={styles.SectorCard_Image}
										alt={sector.title}
										title={sector.title}
									/>
									<h4 className={styles.SectorCard_Title}>{sector.title}</h4>
									<p className={styles.SectorCard_Description}>
										{sector.description}
									</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>

					<Companies />
				</div>
			</section>

			{/* Idea */}
			<section className={styles.Idea}>
				<img
					className={styles.Idea_Image}
					src={Lampara}
					width={250}
					alt='¿Tienes una idea brillante?'
				/>
				<div className={styles.Idea_Text_Container}>
					<h2 className={styles.Idea_Title} data-aos='fade-up'>
						Do you have a good idea
					</h2>
					<p className={styles.Idea_Text} data-aos='fade-up'>
						and don’t know how to develop it?
					</p>

					<Link
						to='/contacto'
						className={styles.Idea_Button}
						data-aos='fade-up'
						data-aos-delay='250'
					>
						LET’S TALK
					</Link>
				</div>
				<img
					src={DetailWhite}
					className={styles.Hero_Bottom_Detail}
					alt='White Detail'
				/>
			</section>

			{/* Contact */}
			<section
				className={`${styles.Contact_Fluid_Container} container-fluid py-5`}
			>
				<div className={`${styles.Contact} container p-0`}>
					<Form />
				</div>
			</section>
		</main>
	)
}

export default Home
