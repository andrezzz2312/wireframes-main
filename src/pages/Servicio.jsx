import { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Helmet from 'react-helmet'
import { useParams } from 'react-router-dom'
import Service1 from '../assets/services/service-1.png'
import Service1Item1 from '../assets/services/service-1-item-1.png'
import Service1Item2 from '../assets/services/service-1-item-2.png'
import Service1CaptionImage from '../assets/services/service-1-caption-image.png'
import Service2 from '../assets/services/service-2.png'
import Service2Item1 from '../assets/services/service-2-item-1.png'
import Service2CaptionImage from '../assets/services/service-2-caption-image.png'
import Service3 from '../assets/services/service-3.png'
import Service3Item1 from '../assets/services/service-3-item-1.png'
import Service3Item2 from '../assets/services/service-3-item-2.png'
import Service3CaptionImage from '../assets/services/service-3-caption-image.png'
import Service4 from '../assets/services/service-4.png'
import Service4Item1 from '../assets/services/service-4-item-1.png'
import Service4Item2 from '../assets/services/service-4-item-2.png'
import Service4CaptionImage from '../assets/services/service-4-caption-image.png'
import DetailWhite from '../assets/details/bottom-detail.svg'
import DetailCyan from '../assets/details/bottom-detail-cyan.svg'
import styles from '../styles/pages/Servicios.module.sass'
import Companies from '../components/Companies'
import { AppContext } from '../context/AppContext'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js'
//import headset from '../assets/scene/headset.gltf'
import meta from '../assets/glb/infinite.glb'
import headset from '../assets/glb/headset.glb'
import iphone from '../assets/glb/iphone.glb'
import pantalla from '../assets/glb/pantalla.glb'

//import headsetColor from '../assets/scene/textures/material_baseColor.png'
//import textureRoughn from '../assets/scene/textures/material_metallicRoughness.png'
//import textureNormal from '../assets/scene/textures/material_normal.png'
let scene, camera, renderer, canvas
let metaScene = false
let headsetScene = false
let iphoneScene = false
let pantallaScene = false
let cd = true
const gltfloader = new GLTFLoader()
const Servicio = () => {
	const [data, setData] = useState('')
	const { language } = useContext(AppContext)
	const { service } = useParams()
	const { pathname } = useLocation()
	// const [threeModel, setThreeModel] = useState()
	const [webInit, setWebInit] = useState(false)

	function init() {
		scene = new THREE.Scene()
		canvas = document.getElementById('three')

		camera = new THREE.OrthographicCamera(
			// 75,
			// canvas.offsetWidth / canvas.offsetHeight,
			// 0.1,
			// 1000
			canvas.offsetWidth / -2,
			canvas.offsetWidth / 2,
			canvas.offsetHeight / 2,
			canvas.offsetHeight / -2,
			-200,
			1000
		)

		renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
		let ambient = new THREE.AmbientLight(0xffffff, 4)
		scene.add(ambient)
		var directional = new THREE.DirectionalLight(0xffffff, 5)
		scene.add(directional)
		renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

		canvas.appendChild(renderer.domElement)

		// gltfloader.load(meta, (gltfScene) => {
		// 	const model = gltfScene.scene
		// 	// gltfScene.scene.rotation.y = Math.PI / 8
		// 	gltfScene.scene.position.y = 0
		// 	gltfScene.scene.scale.set(150, 150, 150)
		// 	scene.add(model)
		// 	metaScene = model
		// })
	}

	function loadGLTF(object) {
		if (metaScene) scene.remove(metaScene)
		if (headsetScene) scene.remove(headsetScene)
		if (iphoneScene) scene.remove(iphoneScene)
		if (pantallaScene) scene.remove(pantallaScene)

		gltfloader.load(object, (gltfScene) => {
			const model = gltfScene.scene
			// gltfScene.scene.rotation.y = Math.PI / 8
			if (object === meta) {
				gltfScene.scene.position.y = 0
				gltfScene.scene.scale.set(150, 150, 150)
				metaScene = model
			}
			if (object === headset) {
				gltfScene.scene.position.y = 0
				gltfScene.scene.rotation.y = 7
				gltfScene.scene.rotation.x = 0
				gltfScene.scene.scale.set(150, 150, 150)
				headsetScene = model
			}
			if (object === iphone) {
				gltfScene.scene.position.y = 0
				gltfScene.scene.scale.set(1500, 1500, 1500)
				iphoneScene = model
			}
			if (object === pantalla) {
				gltfScene.scene.position.y = -80
				gltfScene.scene.position.z = -50
				gltfScene.scene.scale.set(450, 450, 450)
				pantallaScene = model
			}
			scene.add(model)
		})
	}
	function animate() {
		requestAnimationFrame(animate)
		TWEEN.update()
		renderer.render(scene, camera)
		if (metaScene) {
			// console.log(metaScene.rotation.y)
			console.log(Math.abs(metaScene.rotation.y))
		}
	}
	useEffect(() => {
		if (data) {
			if (!webInit) {
				init()
				animate()
				setWebInit(true)
			}
		}
	}, [data])

	function onWindowResize() {
		// camera.aspect = canvas.offsetWidth / canvas.offsetHeight
		// a
		renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)

		camera.updateProjectionMatrix()
	}
	window.addEventListener('resize', onWindowResize)

	const services = [
		{
			three: headset,
			title: 'Realidad Virtual',
			description:
				'Rehacemos ambientes tridimensionales, dondel el usuario podrá experimentar a través del uso de gafas VR',
			title_image: Service1,
			title_image_width: 245,
			title_image_height: 266,
			items: [
				{
					title: 'VR para arquitectura y contrucción',
					description:
						'Diseñamos un showroom virtual,  el cual permitirá que muestres a tus clientes los espacios arquitectónicos antes de su adquisición, e inclusive antes de ser construídos.',
					image: Service1Item1,
				},
				{
					title: 'VR para capacitaciones',
					description:
						'Capacita a tu personal con experiencias inmersivas que les permitirán aprender y comprender algunos procesos de forma interactiva sin necesidad de estar presentes físicamente.',
					image: Service1Item2,
				},
			],
			caption: '¿Por qué implementar la',
			caption_highlight: 'Realidad Virtual?',
			caption_image: Service1CaptionImage,
			caption_items: [
				{
					text: 'Nos permite recrear espacios en un entorno digital, generando interacción y actividades que el usuario experimentá como en la vida real.',
				},
				{
					text: 'Se generará un impacto directo  en el usuario, gracias a la experiencia única e inmersiva que quedará grabada en su memoria.',
				},
				{
					text: 'Es una experiencia virtual que da la libertad de crear los espacios más utópicos que puedas imaginar, no hay límite para la creatividad.',
				},
			],
		},
		{
			three: iphone,
			title: 'Realidad Aumentada',
			description:
				'Agregamos a nuestra realidad elementos virtuales que se pueden visualizar a través de la cámara de dispositivos móviles.',
			title_image: Service2,
			title_image_width: 250,
			title_image_height: 265,
			items: [
				{
					title: 'AR para retail',
					description:
						'Permite que el usuario conozca tus productos como un modelado 3D a tamaño real dentro del entorno antes de que sean adquiridos.',
					image: Service2Item1,
				},
			],
			caption: '¿Por qué implementar la',
			caption_highlight: 'Realidad Aumentada?',
			caption_image: Service2CaptionImage,
			caption_items: [
				{
					text: 'Permite a los usuarios acceder a la visualización del producto de forma interactiva sin necesidad de desplazarse al punto de venta.',
				},
				{
					text: 'Permite a los usuarios verificar información complementaria sobre el producto de manera dinámica.',
				},
				{
					text: 'Permite agregar objetos a nuestra realidad para transmitir el mensaje que desees. ',
				},
			],
		},
		{
			three: pantalla,
			title: 'Experiencias 3D en la Web',
			description:
				'Creamos contenido interactivo 3D para visualizarse desde una página web.',
			title_image: Service3,
			title_image_width: 250,
			title_image_height: 195,
			items: [
				{
					title: 'Experiencia Web 3D de productos',
					description:
						'Diseños 3D que permiten a los usuarios ver cuál es el aspecto de su próxima adquisición desde una página web, mostrando detalles como sus medidas, características, y modo de uso.',
					image: Service3Item1,
				},
				{
					title: 'Experiencia Web 3D para espacios',
					description:
						'Espacios 3D creados con el objetivo de que el usuario pueda recorrer, experimentar y personalizar el espacio acorde a sus necesidades.',
					image: Service3Item2,
				},
			],
			caption: '¿Por qué implementar las',
			caption_highlight: 'Experiencias 3D en la Web?',
			caption_image: Service3CaptionImage,
			caption_items: [
				{
					text: 'Permite dar a conocer tus productos, sin la necesidad de desplazarse a un espacio físico.',
				},
				{
					text: 'Permite a los usuarios conocer e interactuar con el producto de una forma más cercana a la realidad.',
				},
				{
					text: 'Brinda una experiencia 3D sin la necesidad de descargar una aplicación.',
				},
			],
		},
		{
			three: meta,
			title: 'Servicios de Metaverso',
			description:
				'Creamos, desarrollamos e implementamos ambientes virtuales interactivos y optimizados.',
			title_image: Service4,
			title_image_width: 280,
			title_image_height: 175,
			items: [
				{
					title: 'Ambientes Virtuales Interactivos',
					description:
						'Diseño de ambientes virtuales, en el cual los usuarios podrán navegar e interactuar desde un ordenador o dispositivo móvil.',
					image: Service4Item1,
				},
				{
					title: 'Ambientes Virtuales Comerciales',
					description:
						'Diseño de ambientes virtuales, en el cual los usuarios podrán navegar y comercializar productos tangibles o no tangibles desde un ordenador o dispositivo móvil.',
					image: Service4Item2,
				},
			],
			caption: '¿Por qué implementar',
			caption_highlight: 'El Metaverso?',
			caption_image: Service4CaptionImage,
			caption_items: [
				{
					text: 'Tienes la disposición de crear tu propio mundo, tu propio universo.',
				},
				{
					text: 'Puedes crear un ambiente optimizado, en el cual organizar reuniones digitales y  conocer personas de todos los rincones del planeta.',
				},
				{
					text: 'Permite desarrollar un ambiente en el cual puedas realizar actividades comerciales, presentaciones o streamings con tu avatar.',
				},
			],
		},
	]
	const servicesEn = [
		{
			title: 'Virtual Reality',
			description:
				'We recreate 3D environments, where the user can experience through using VR headsets.',
			title_image: Service1,
			title_image_width: 245,
			title_image_height: 266,
			items: [
				{
					title: 'VR for architecture and construction',
					description:
						'We designed a virtual showroom, which will allow you to show your clients the architectural spaces before their acquisition, and even before they are built.',
					image: Service1Item1,
				},
				{
					title: 'VR for trainings',
					description:
						'Train your staff with immersive experiences that will allow them to learn and understand some processes interactively without the need to be physically present.',
					image: Service1Item2,
				},
			],
			caption: 'Why implement',
			caption_highlight: 'Virtual Reality?',
			caption_image: Service1CaptionImage,
			caption_items: [
				{
					text: 'It allows us to recreate spaces in a digital environment, generating interaction and activities that the user experiences as in real life.',
				},
				{
					text: 'A direct impact will be generated on the user, thanks to the unique and immersive experience that will remain etched in their memory.',
				},
				{
					text: 'It is a virtual experience that gives you the freedom to create the most utopian spaces you can imagine, there is no limit to creativity.',
				},
			],
		},
		{
			title: 'Augmented Reality',
			description:
				'We add to our reality virtual elements that can be viewed through the camera of mobile devices.',
			title_image: Service2,
			title_image_width: 250,
			title_image_height: 265,
			items: [
				{
					title: 'AR for retail',
					description:
						'Let the user know your products as a real-size 3D model within the environment, before they are purchased.',
					image: Service2Item1,
				},
			],
			caption: 'Why implement',
			caption_highlight: 'Augmented Reality?',
			caption_image: Service2CaptionImage,
			caption_items: [
				{
					text: 'Allows users to access the product display interactively without the need to go to the point of sale.',
				},
				{
					text: 'Allows users to verify complementary information about the product in a dynamic way.',
				},
				{
					text: 'Allows you to add objects to our reality to convey the message you want.',
				},
			],
		},
		{
			title: '3D Web Experiences',
			description:
				'We create 3D interactive content to be viewed from a website.',
			title_image: Service3,
			title_image_width: 250,
			title_image_height: 195,
			items: [
				{
					title: 'Product 3D Web Experience',
					description:
						'3D designs that allow users to see what their next acquisition will look like from a website, showing details such as its measurements, characteristics, and how to use it.',
					image: Service3Item1,
				},
				{
					title: '3D web experience for spaces',
					description:
						'3D spaces created with the aim that the user can explore, experience and customize the space according to their needs.',
					image: Service3Item2,
				},
			],
			caption: 'Why implement',
			caption_highlight: '3D Experiences on the Web?',
			caption_image: Service3CaptionImage,
			caption_items: [
				{
					text: 'It allows you to publicize your products, without the need to travel to a physical space.',
				},
				{
					text: 'It allows users to know and interact with the product in a way that is closer to reality.',
				},
				{
					text: 'Provides a 3D experience without the need to download an application.',
				},
			],
		},
		{
			title: 'Metaverse Services',
			description:
				'We create, develop and implement interactive and optimized virtual environments.',
			title_image: Service4,
			title_image_width: 280,
			title_image_height: 175,
			items: [
				{
					title: 'Interactive Virtual Environments',
					description:
						'Virtual Environments design, in which users can navigate and interact from a computer or mobile device.',
					image: Service4Item1,
				},
				{
					title: 'Commercial Virtual Environments',
					description:
						'Design of virtual environments, in which users will be able to navigate and commercialize tangible or non-tangible products from a computer or mobile device.',
					image: Service4Item2,
				},
			],
			caption: 'Why implement ',
			caption_highlight: 'The Metaverse?',
			caption_image: Service4CaptionImage,
			caption_items: [
				{
					text: 'You have the disposition to create your own world, your own universe.',
				},
				{
					text: 'You can create an optimized environment in which to organize digital meetings and meet people from all over the world.',
				},
				{
					text: 'It allows you to develop an environment in which you can perform commercial activities, presentations or streaming with your avatar.',
				},
			],
		},
	]

	useEffect(() => {
		let index = 0

		switch (service) {
			case 'realidad-virtual':
				index = 0
				loadGLTF(headset)
				break
			case 'realidad-aumentada':
				index = 1
				loadGLTF(iphone)

				break
			case 'experiencias-3D':
				index = 2
				loadGLTF(pantalla)
				break
			case 'metaverso':
				index = 3
				loadGLTF(meta)
				break

			default:
				break
		}

		if (language === 'es') {
			setData(services[index])
		} else {
			setData(servicesEn[index])
		}
	}, [service])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	if (!data) return null

	return (
		<main>
			<Helmet>
				<title>
					{language === 'es' ? 'Servicios' : 'Service'} | Wireframe Reality
				</title>
			</Helmet>

			<section className={`${styles.Hero_Container_Fluid} container-fluid`}>
				<div className={`${styles.Hero} container p-0`}>
					<div className={`${styles.Hero_Row} row`} data-aos='fade-up'>
						<div className='col-12 col-md-6'>
							<h1 className={styles.Hero_Title}>{data.title}</h1>
							<p className={styles.Hero_Text}>{data.description}</p>
						</div>
						{/* <div className={`${styles.Hero_Image_Container} col-12 col-md-6`}> */}

						<div
							className={`${styles.three} col-12 col-md-6 `}
							id='three'
							onMouseOver={() => {
								if (cd) {
									if (metaScene) {
										cd = false
										var eyebrow = new TWEEN.Tween(metaScene.rotation)
											.to({ z: 0.5 }, 500)
											.easing(TWEEN.Easing.Quintic.InOut)
											.start()
										var eyebrowback = new TWEEN.Tween(metaScene.rotation)
											.to({ z: 0 }, 500)
											.easing(TWEEN.Easing.Quintic.InOut)

										var up = new TWEEN.Tween(metaScene.position)
											.to({ y: 100 }, 500)
											.easing(TWEEN.Easing.Quintic.InOut)
											.start()
										var down = new TWEEN.Tween(metaScene.position)
											.to({ y: 0 }, 500)
											.easing(TWEEN.Easing.Quintic.InOut)

										eyebrow.chain(eyebrowback)

										up.chain(down)

										var tween = new TWEEN.Tween(metaScene.rotation)
											.to({ y: '-' + Math.PI }, 1000)
											.delay(300)
											.easing(TWEEN.Easing.Exponential.InOut)
											// .delay(1000)
											.onComplete(function () {
												console.log('-' + Math.PI / 1)
												cd = true
												if (Math.abs(metaScene.rotation.y) >= 2 * Math.PI) {
													metaScene.rotation.y =
														metaScene.rotation.y % (2 * Math.PI)
													console.log('checkers')
												}
											})
											.start()
									}
									if (headsetScene) {
										cd = false
										eyebrow = new TWEEN.Tween(headsetScene.rotation)

											.to({ x: -0.8 }, 500)
											.delay(500)
											.easing(TWEEN.Easing.Quintic.InOut)

										eyebrowback = new TWEEN.Tween(headsetScene.rotation)
											.to({ x: 0 }, 500)
											.easing(TWEEN.Easing.Quintic.InOut)

										up = new TWEEN.Tween(headsetScene.position)
											.to({ y: 100 }, 500)

											.easing(TWEEN.Easing.Quintic.InOut)
											.start()
										down = new TWEEN.Tween(headsetScene.position)
											.to({ y: 0 }, 500)
											.easing(TWEEN.Easing.Quintic.InOut)

										eyebrow.chain(eyebrowback)

										up.chain(down)

										tween = new TWEEN.Tween(headsetScene.rotation)
											.to({ z: '-' + Math.PI / 0.5 }, 1000)

											.easing(TWEEN.Easing.Back.InOut)
											// .delay(1000)
											.onComplete(function () {
												cd = true
												if (Math.abs(headsetScene.rotation.y) >= 2 * Math.PI) {
													headsetScene.rotation.y =
														headsetScene.rotation.y % (2 * Math.PI)
												}
											})
											.start()
									}
									if (iphoneScene) {
										cd = false
										eyebrow = new TWEEN.Tween(iphoneScene.rotation)
											.to({ z: 0.4 }, 250)
											.easing(TWEEN.Easing.Back.Out)
											.start()
										eyebrowback = new TWEEN.Tween(iphoneScene.rotation)
											.to({ z: -0.4 }, 250)
											.easing(TWEEN.Easing.Back.Out)
										var reset = new TWEEN.Tween(iphoneScene.rotation)
											.to({ z: 0 }, 250)
											.easing(TWEEN.Easing.Back.Out)

										tween = new TWEEN.Tween(iphoneScene.children[3].rotation)
											.to({ x: '-' + Math.PI / 0.5 }, 1000)

											.easing(TWEEN.Easing.Quadratic.InOut)
											// .delay(1000)
											.onComplete(function () {
												cd = true
												// if (Math.abs(iphoneScene.rotation.y) >= 2 * Math.PI) {
												// 	iphoneScene.rotation.y =
												// 		iphoneScene.rotation.y % (2 * Math.PI)
												// }
											})
										var rotoscopio = new TWEEN.Tween(
											iphoneScene.children[3].position
										)
											.to({ x: 0.15 }, 800)
											.easing(TWEEN.Easing.Quadratic.InOut)
										var zoomclone = new TWEEN.Tween(
											iphoneScene.children[3].scale
										)
											.to({ x: 1.5, y: 1.5, z: 1.5 }, 800)
											.easing(TWEEN.Easing.Quadratic.InOut)
										var resetzoom = new TWEEN.Tween(
											iphoneScene.children[3].scale
										)
											.to({ x: 1, y: 1, z: 1 }, 800)
											.easing(TWEEN.Easing.Quadratic.InOut)
										var zoom = new TWEEN.Tween(iphoneScene.children[3].scale)
											.to({ x: 1.5, y: 1.5, z: 1.5 }, 800)
											.easing(TWEEN.Easing.Quadratic.InOut)
										var zoom2 = new TWEEN.Tween(iphoneScene.children[3].scale)
											.to({ x: 1, y: 1, z: 1 }, 800)
											.easing(TWEEN.Easing.Quadratic.InOut)
										var zoom3 = new TWEEN.Tween(iphoneScene.children[3].scale)
											.to({ x: 0.5, y: 0.5, z: 0.5 }, 800)
											.easing(TWEEN.Easing.Quadratic.InOut)
										var rotoscopio2 = new TWEEN.Tween(
											iphoneScene.children[3].position
										)
											.to({ x: 0, z: -0.1 }, 800)
											.easing(TWEEN.Easing.Quadratic.InOut)
										var rotoscopio3 = new TWEEN.Tween(
											iphoneScene.children[3].position
										)
											.to({ x: -0.15 }, 800)
											.easing(TWEEN.Easing.Quadratic.InOut)
										var rotoscopio4 = new TWEEN.Tween(
											iphoneScene.children[3].position
										)
											.to({ x: 0, z: 0.07 }, 800)
											.easing(TWEEN.Easing.Quadratic.InOut)

										tween.repeat(4)
										eyebrow.chain(eyebrowback)
										eyebrowback.chain(reset)
										reset.chain(tween, zoom)
										zoom.chain(rotoscopio, zoom2)
										rotoscopio.chain(rotoscopio2, zoom3)
										rotoscopio2.chain(rotoscopio3, zoom2)
										rotoscopio3.chain(rotoscopio4, zoomclone)
										rotoscopio4.chain(resetzoom)
										// reset.chain(rotoscopio)

										// .start()
									}
									if (pantallaScene) {
										cd = false

										tween = new TWEEN.Tween(pantallaScene.children[3].rotation)
											.to(
												{ x: 0, y: pantallaScene.children[3].rotation.y - 0.4 },
												1000
											)
											.easing(TWEEN.Easing.Quadratic.InOut)
											// .delay(1000)
											.onComplete(function () {
												cd = true
												// if (Math.abs(pantallaScene.rotation.y) >= 2 * Math.PI) {
												// 	pantallaScene.rotation.y =
												// 		pantallaScene.rotation.y % (2 * Math.PI)
												// }
											})
											.start()

										down = new TWEEN.Tween(pantallaScene.children[3].position)
											.to({ y: -0.01 }, 1000)
											.easing(TWEEN.Easing.Bounce.Out)
											// .delay(1000)
											.onComplete(function () {
												cd = true
												// if (Math.abs(pantallaScene.rotation.y) >= 2 * Math.PI) {
												// 	pantallaScene.rotation.y =
												// 		pantallaScene.rotation.y % (2 * Math.PI)
												// }
											})
											.start()
										up = new TWEEN.Tween(pantallaScene.children[3].position)
											.to({ x: 0, y: 0.2 }, 200)
											.delay(300)
											.easing(TWEEN.Easing.Quadratic.InOut)
										// .delay(1000)

										var left = new TWEEN.Tween(
											pantallaScene.children[3].position
										)
											.to({ x: -0.3 }, 1000)
											.easing(TWEEN.Easing.Back.InOut)
										// .delay(1000)

										var spin = new TWEEN.Tween(
											pantallaScene.children[3].rotation
										)
											.to(
												{
													x: Math.abs('-' + Math.PI / 0.44),
													y: Math.abs('-' + Math.PI / 0.573),
												},
												1000
											)

											.easing(TWEEN.Easing.Back.InOut)
											// .delay(1000)
											.onComplete(function () {
												cd = true

												if (
													Math.abs(pantallaScene.children[3].rotation.y) >=
													2 * Math.PI
												) {
													pantallaScene.children[3].rotation.y =
														pantallaScene.children[3].rotation.y % (2 * Math.PI)
												}
											})
										down.chain(left)
										left.chain(spin, up)

										// tween.chain(down)
									}
								}
							}}
						></div>

						{/* <img
                src={data.title_image}
                alt={data.title}
                className={styles.Hero_Image}
              /> */}
						{/* </div> */}
					</div>
				</div>
				<img
					src={DetailCyan}
					className={styles.Hero_Bottom_Detail}
					alt='Wireframes Planet'
				/>
			</section>

			<section className={`${styles.Item_Container} container py-4`}>
				<div className='row'>
					{data.items[1] ? (
						<>
							<div
								className={`${styles.Item_Card_Left} col-12 pt-5 pb-0 pb-md-5 px-3 px-md-0`}
							>
								<img
									src={data.items[0].image}
									alt={data.items[0].title}
									className={styles.Item_Image}
									data-aos='fade-right'
								/>

								<div className={styles.Item_Text_Container} data-aos='fade-up'>
									<h3 className={styles.Item_Title}>{data.items[0].title}</h3>
									<p className={styles.Item_Text}>
										{data.items[0].description}
									</p>
								</div>
							</div>
							<div
								className={`${styles.Item_Card_Right} col-12 pt-5 pb-3 pb-md-5 px-3 px-md-0`}
							>
								<div className={styles.Item_Text_Container} data-aos='fade-up'>
									<h3 className={styles.Item_Title}>{data.items[1].title}</h3>
									<p className={styles.Item_Text}>
										{data.items[1].description}
									</p>
								</div>

								<img
									src={data.items[1].image}
									alt={data.items[1].title}
									className={styles.Item_Image}
									data-aos='fade-left'
								/>
							</div>
						</>
					) : (
						<div
							className={`${styles.Item_Card_Unique} col-12 py-5 px-3 px-md-0`}
						>
							<img
								src={data.items[0].image}
								alt={data.items[0].title}
								className={styles.Item_Image}
								data-aos='fade-right'
							/>

							<div className={styles.Item_Text_Container} data-aos='fade-up'>
								<h3 className={styles.Item_Title}>{data.items[0].title}</h3>
								<p className={styles.Item_Text}>{data.items[0].description}</p>
							</div>
						</div>
					)}
				</div>
				<img
					src={DetailWhite}
					className={styles.Hero_Bottom_Detail}
					alt='Wireframes Planet'
				/>
			</section>

			<section className={`${styles.Extra_Container_Fluid} container-fluid`}>
				<div className={`${styles.Extra} container py-5 px-0`}>
					<h2 className={styles.Extra_Caption} data-aos='fade-up'>
						{data.caption}{' '}
						<span className={styles.Extra_Caption_Highlight}>
							{data.caption_highlight}
						</span>
					</h2>
					<div
						className={`${styles.Extra_Row} row py-5 justify-content-center justify-content-lg-start`}
					>
						<div
							className={`${styles.Extra_Image_Container} col-12 col-md-6`}
							data-aos='zoom-in'
						>
							<img
								src={data.caption_image}
								alt={data.caption + ' ' + data.caption_highlight}
								title={data.caption + ' ' + data.caption_highlight}
								className={styles.Extra_Image}
							/>
							<img
								src={data.caption_image}
								alt={data.caption + ' ' + data.caption_highlight}
								title={data.caption + ' ' + data.caption_highlight}
								className={styles.Extra_Image_Back}
							/>
						</div>
						<div
							className={`${styles.Extra_Text_Container} col-12 col-md-6 pt-5 pt-lg-0`}
						>
							{data.caption_items.map((item, index) => (
								<div
									key={`${data.title}-${index}`}
									className={styles.Extra_Item}
									data-aos='fade-up'
									data-aos-delay={index * 250}
								>
									<div className={styles.Extra_Number}>{index + 1}</div>
									<p className={styles.Extra_Text}>{item.text}</p>
								</div>
							))}
						</div>
					</div>
					<Companies />
				</div>
			</section>
		</main>
	)
}

export default Servicio
