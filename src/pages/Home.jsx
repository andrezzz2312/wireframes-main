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
import lamparaA from '../assets/images/lamparaA.png'
import lamparaP from '../assets/images/lamparaP.png'
import texture from '../assets/texture/grid2.png'
import DetailWhite from '../assets/details/bottom-detail.svg'
import DetailDark from '../assets/details/bottom-detail-dark.svg'
import DetailCyan from '../assets/details/bottom-detail-cyan.svg'
import SwiperPrevButton from '../assets/details/swiper-left.svg'
import SwiperNextButton from '../assets/details/swiper-right.svg'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from '../bloom/bloom/UnrealBloomPass.js'

import moon from '../assets/glb/moonLR.glb'
import logoAsset from '../assets/glb/3DLogo.glb'
import edificioAsset from '../assets/glb/Buildings.glb'

const Home = () => {
	const [title, setTitle] = useState(0)
	const titleRef = useRef(null)
	const { pathname } = useLocation()
	const { language } = useContext(AppContext)

	// let target = { targetX: 0, targetY: 0 }
	// let mouse = { mouseX: 0, mouseY: 0 }
	// const windowHalfX = window.innerWidth / 2
	// const windowHalfY = window.innerHeight / 2

	useEffect(() => {
		const canvas = document.createElement('canvas')
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas,
			alpha: true,
		})
		// renderer.setPixelRatio(window.devicePixelRatio)
		renderer.setClearColor(0x000000, 0)
		renderer.toneMapping = THREE.ReinhardToneMapping

		renderer.setScissorTest(true)

		const params = {
			exposure: 1.07,
			bloomStrength: 0.73,
			bloomThreshold: -0.29,
			bloomRadius: -0.46,
		}

		const sceneElements = []
		function addScene(elem, fn) {
			const ctx = document.createElement('canvas').getContext('2d')
			elem.appendChild(ctx.canvas)
			sceneElements.push({ elem, ctx, fn })
		}
		const box = document.querySelector('#box')
		const background = document.querySelector('#background')

		function makeScene(elem) {
			const scene = new THREE.Scene()
			const fov = 50
			var aspect = box.clientWidth / box.clientHeight

			const near = 1
			const far = 100

			const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
			// camera.position.set(0, 0, 3)
			camera.position.z = 3.5
			// camera.position.set(-5, 2.5, -3.5)
			camera.lookAt(0, 0, 0)
			scene.add(camera)

			const controls = new OrbitControls(camera, elem)
			controls.enableZoom = false
			controls.enablePan = false

			{
				const color = 0xffffff
				const intensity = 1
				const light = new THREE.DirectionalLight(color, intensity)
				light.position.set(-1, 2, 4)
				scene.add(light)
			}

			return {
				scene,
				camera,
				controls,
				// target, mouse
			}
		}

		const DISPLACEMENT_PATH =
			'https://res.cloudinary.com/dg5nsedzw/image/upload/v1641657200/blog/vaporwave-threejs-textures/displacement.png'

		const textureLoader = new THREE.TextureLoader()
		const gridtexture = textureLoader.load(texture)
		const terraintexture = textureLoader.load(DISPLACEMENT_PATH)

		const sceneInitFunctionsByName = {
			box: (elem) => {
				const {
					scene,
					camera,
					controls,
					// target, mouse
				} = makeScene(elem)
				var caster = new THREE.Raycaster()
				var mouse = new THREE.Vector2()
				var moonObj
				const gltfloader = new GLTFLoader()
				gltfloader.load(moon, (gltf) => {
					moonObj = gltf.scene
					scene.add(moonObj)
				})

				scene.add(new THREE.AmbientLight(0xffffff, 0.5))
				const pointLight = new THREE.PointLight(0xffffff, 1)
				camera.add(pointLight)

				renderer.toneMapping = THREE.ReinhardToneMapping
				renderer.setClearColor(0x000000, 0)
				// effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
				const unrealBloom = new UnrealBloomPass(
					new THREE.Vector2(box.innerWidth, box.innerHeight),
					1.5,
					0.4,
					0.85
				)
				unrealBloom.threshold = params.bloomThreshold
				unrealBloom.strength = params.bloomStrength
				unrealBloom.radius = params.bloomRadius

				const renderPass = new RenderPass(scene, camera)
				const effectComposer = new EffectComposer(renderer)

				effectComposer.setSize(box.clientWidth, box.clientHeight)
				window.addEventListener('resize', () => {
					camera.aspect = box.clientWidth / box.clientHeight

					renderer.setSize(box.clientWidth, box.clientHeight)
					effectComposer.setSize(box.clientWidth, box.clientHeight)
					renderer.setPixelRatio(box.devicePixelRatio)
					camera.updateProjectionMatrix()
				})
				effectComposer.addPass(renderPass)
				effectComposer.addPass(unrealBloom)

				function onPointerMove(event) {
					mouse.x = (event.clientX / window.innerWidth) * 2 - 1
					mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
					//console.log('x: ' + mouse.x, 'y: ' +mouse.y)
					caster.setFromCamera(mouse, camera)
					//const objetos =[moonObj]
					const intersectObject = caster.intersectObject(moonObj)
					if (intersectObject) {
						// currentObject = intersectObject[0]
						// console.log(currentObject)
					} else {
						// currentObject = null
						//moonObj.rotation.y +=  0.1
					}
				}
				let hover = false
				// let currentObject = null
				box.addEventListener('mouseover', () => {
					hover = true
				})
				box.addEventListener('mouseout', () => {
					hover = false
				})
				window.addEventListener('mousemove', onPointerMove)

				return (time, rect) => {
					// if (moonObj) {
					// 	moonObj.rotation.y = time * 0.1
					// 	moonObj.rotation.x = time * 0.1

					// 	// moonObj.rotation.y += 0.05 * (target.targetX - moonObj.rotation.y)
					// 	// moonObj.rotation.x += 0.05 * (target.targetY - moonObj.rotation.x)
					// }

					if (moonObj) {
						if (hover) {
							moonObj.rotation.y += 0
						} else {
							moonObj.rotation.y += 0.003
							moonObj.rotation.x += 0.003
						}

						// moonObj.rotation.y += 0.05 * (target.targetX - moonObj.rotation.y)
						// moonObj.rotation.x += 0.05 * (target.targetY - moonObj.rotation.x)
					}

					// camera.aspect = box.clientWidth / box.clientHeight
					// camera.updateProjectionMatrix()

					// target.targetX = mouse.mouseX * 0.001
					// target.targetY = mouse.mouseY * 0.001
					controls.update()
					effectComposer.render()
				}
			},
			background: (elem) => {
				const { scene, controls } = makeScene(elem)
				var camera = new THREE.PerspectiveCamera(
					75,
					background.clientWidth / background.clientHeight,
					0.01,
					20
				)

				camera.position.set(0, 0.06, 1.1)

				var geometry = new THREE.PlaneBufferGeometry(1, 3, 24, 24)
				var material = new THREE.MeshStandardMaterial({
					map: gridtexture,
					displacementMap: terraintexture,
					displacementScale: 0.3,
					metalness: 0.95,
					roughness: 0.5,
				})
				let logo
				let edificios
				var loaderAsset = new GLTFLoader()
				//a??adiendo logo y edificio
				loaderAsset.load(logoAsset, function (gltf) {
					const model = gltf.scene

					gltf.scene.scale.set(5, 5, 5)
					gltf.scene.rotation.set(0.15, 1.5, 0)
					gltf.scene.position.set(0, -0.1, 0.5)
					logo = model
					console.log(logo)
					scene.add(model)
				})
				loaderAsset.load(edificioAsset, function (gltf) {
					const model = gltf.scene
					gltf.scene.position.set(0, 0, -0.9)
					gltf.scene.scale.set(10, 25, 30)
					gltf.scene.rotation.set(0, 4.72, 0)
					//edificios.children[0].visible = false
					// gltf.scene.children[1].material.wireframe = true
					// gltf.scene.children[2].material.wireframe = true
					edificios = model
					console.log(edificios)
					// mesh
					var material = new THREE.MeshPhongMaterial({
						color: 0x000c0f,
						polygonOffset: true,
						polygonOffsetFactor: 1, // positive value pushes polygon further away
						polygonOffsetUnits: 1,
					})
					const ex1 = gltf.scene.getObjectByName('Cube022')
					var mesh = new THREE.Mesh(ex1.geometry, material)
					mesh.scale.set(40, 50, 40)
					mesh.rotation.set(0, 4.72, 0)
					mesh.position.set(0.7, -0.5, -2)

					var mesh2 = new THREE.Mesh(ex1.geometry, material)
					mesh2.scale.set(40, 50, 40)
					mesh2.rotation.set(0, 1, 0)
					mesh2.position.set(3, -0.5, -1)

					var mesh3 = new THREE.Mesh(ex1.geometry, material)
					mesh3.scale.set(40, 50, 40)
					mesh3.rotation.set(0, -1, 0)
					mesh3.position.set(-2.2, -0.5, -1.5)

					var geo = new THREE.EdgesGeometry(mesh.geometry) // or WireframeGeometry
					var geo2 = new THREE.EdgesGeometry(mesh2.geometry) // or WireframeGeometry
					var geo3 = new THREE.EdgesGeometry(mesh2.geometry) // or WireframeGeometry
					var mat = new THREE.LineBasicMaterial({ color: 0xffffff })
					var wireframe = new THREE.LineSegments(geo, mat)
					var wireframe2 = new THREE.LineSegments(geo2, mat)
					var wireframe3 = new THREE.LineSegments(geo3, mat)
					// wireframe.scale.set(10, 25, 30)
					mesh.add(wireframe)
					mesh2.add(wireframe2)
					mesh3.add(wireframe3)

					scene.add(mesh)
					scene.add(mesh2)
					scene.add(mesh3)

					// scene.add(model)
				})
				// const controls = new OrbitControls(camera, background)

				controls.enableDamping = true

				// scene.background = new THREE.Color('black')
				var plano = new THREE.Mesh(geometry, material)
				plano.rotation.x = -Math.PI * 0.5
				plano.position.set(0, 0, 0.15)

				var plano2 = new THREE.Mesh(geometry, material)
				plano2.rotation.x = -Math.PI * 0.5
				plano2.position.set(0, 0, -1.85)

				scene.add(plano, plano2)

				const fog = new THREE.Fog('#081c1f', 0.5, 3.5)
				scene.fog = fog
				//luces ambientales
				var ambient = new THREE.AmbientLight(0xffffff, 10)
				//var directional = new THREE.DirectionalLight(0xffffff, 0.9)
				scene.add(ambient)
				const pointLight = new THREE.PointLight(0xffffff, 1)
				camera.add(pointLight)
				// const spotlight = new THREE.SpotLight(
				// 	'#ffffff',
				// 	50,
				// 	3,
				// 	Math.PI * 0.1,
				// 	0.25
				// )
				// spotlight.position.set(0, 1, 2)
				// // Target the spotlight to a specific point to the left of the scene
				// spotlight.target.position.x = 0
				// spotlight.target.position.y = 0
				// spotlight.target.position.z = 0
				// spotlight.position.set(0.5, 0.75, 2.2)
				// // Target the spotlight to a specific point to the left of the scene
				// spotlight.target.position.x = -0.25
				// spotlight.target.position.y = 0.25
				// spotlight.target.position.z = 0.25
				// scene.add(spotlight)
				// scene.add(spotlight.target)
				// const spotlight2 = new THREE.SpotLight(
				// 	'#ffffff',
				// 	50,
				// 	3,
				// 	Math.PI * 0.1,
				// 	0.25
				// )

				// spotlight2.position.set(-0.5, 0.75, 2.2)
				// // Target the spotlight to a specific point to the right side of the scene
				// spotlight2.target.position.x = 0.25
				// spotlight2.target.position.y = 0.25
				// spotlight2.target.position.z = 0.25
				// scene.add(spotlight2)
				// scene.add(spotlight2.target)

				const unrealBloom = new UnrealBloomPass(
					new THREE.Vector2(background.offsetWidth, background.offsetHeight),
					1.5,
					0.4,
					0.85
				)
				unrealBloom.threshold = params.bloomThreshold
				unrealBloom.strength = 0.55
				unrealBloom.radius = params.bloomRadius

				const renderPass = new RenderPass(scene, camera)
				const effectComposer = new EffectComposer(renderer)
				effectComposer.setSize(background.clientWidth, background.clientHeight)
				effectComposer.addPass(renderPass)
				effectComposer.addPass(unrealBloom)

				// const effectComposer = new EffectComposer(renderer)
				// effectComposer.setSize(background.clientWidth, background.clientHeight)

				// const renderPass = new RenderPass(scene, camera)
				// effectComposer.addPass(renderPass)
				// effectComposer.addPass(unrealBloom)

				// const rgbShiftPass = new ShaderPass(RGBShiftShader)
				// rgbShiftPass.uniforms['amount'].value = 0.0015

				// effectComposer.addPass(rgbShiftPass)

				// const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
				// effectComposer.addPass(gammaCorrectionPass)
				const clock = new THREE.Clock()

				return () => {
					const elapsedTime = clock.getElapsedTime()
					camera.updateProjectionMatrix()
					if (logo) {
						logo.rotation.y = elapsedTime * 0.75
					}
					controls.update()
					// renderer.render(scene, camera)
					effectComposer.render(scene, camera)

					// renderer.render(scene, camera)

					plano.position.z = (elapsedTime * 0.15) % 2

					plano2.position.z = ((elapsedTime * 0.15) % 2) - 2
				}
			},
		}

		document.querySelectorAll('[data-diagram]').forEach((elem) => {
			const sceneName = elem.dataset.diagram
			const sceneInitFunction = sceneInitFunctionsByName[sceneName]
			const sceneRenderFunction = sceneInitFunction(elem)
			addScene(elem, sceneRenderFunction)
		})

		function render(time) {
			time *= 0.001

			for (const { elem, fn, ctx } of sceneElements) {
				// get the viewport relative position of this element
				const rect = elem.getBoundingClientRect()
				const { left, right, top, bottom, width, height } = rect
				const rendererCanvas = renderer.domElement

				const isOffscreen =
					bottom < 0 ||
					top > window.innerHeight ||
					right < 0 ||
					left > window.innerWidth

				if (!isOffscreen) {
					// make sure the renderer's canvas is big enough
					if (rendererCanvas.width < width || rendererCanvas.height < height) {
						renderer.setSize(width, height, false)
					}

					// make sure the canvas for this area is the same size as the area
					if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
						ctx.canvas.width = width
						ctx.canvas.height = height
					}

					renderer.setScissor(0, 0, width, height)
					renderer.setViewport(0, 0, width, height)

					fn(time, rect)

					// copy the rendered scene to this element's canvas
					ctx.globalCompositeOperation = 'copy'
					ctx.drawImage(
						rendererCanvas,
						0,
						rendererCanvas.height - height,
						width,
						height, // src rect
						0,
						0,
						width,
						height
					) // dst rect
				}
			}

			requestAnimationFrame(render)
		}

		requestAnimationFrame(render)
	}, [])

	// function onDocumentMouseMove(event) {
	// 	mouse.mouseX = event.clientX - windowHalfX
	// 	mouse.mouseY = event.clientY - windowHalfY
	// }
	// document.addEventListener('mousemove', onDocumentMouseMove)

	function show() {
		const lamparaP = document.getElementById('lamparaP')
		lamparaP.style.opacity = '1'
	}
	function hide() {
		const lamparaP = document.getElementById('lamparaP')
		lamparaP.style.opacity = '0'
	}
	const sectors = [
		{
			title: 'Industria Automotriz',
			description:
				'Muestra a tu cliente c??mo es o ser?? su veh??culo sin la necesidad de que est??n f??sicamente en el sitio.',
			image: Sector1,
			width: 124,
			height: 100,
			animationDelay: 150,
		},
		{
			title: 'Salud',
			description:
				'Los profesionales de la salud pueden usar modelos virtuales como parte del entrenamiento. Existen tratamientos efectivos para tratar la ansiedad o algunos des??rdenes post-traum??ticos.',
			image: Sector2,
			width: 126,
			height: 126,
			animationDelay: 300,
		},
		{
			title: 'Turismo',
			description:
				'Con las tecnolog??as de Realidad Virtual, puedes conocer lugares tur??sticos recreados en 3D y tener acceso completo a vistas 360.',
			image: Sector3,
			width: 127,
			height: 127,
			animationDelay: 450,
		},
		{
			title: 'Bienes Ra??ces',
			description:
				'Presenta la propiedad que deseas sin salir de casa, mant??n a tus clientes seguros. Hazles saber que te preocupas por su seguridad y comodidad.',
			image: Sector4,
			width: 130,
			height: 120,
			animationDelay: 150,
		},
		{
			title: 'Arquitectura',
			description:
				'Experimenta y siente el dise??o antes de construirlo f??sicamente. La realidad virtual te permite experimentar el sitio como si ya estuviera hecho.',
			image: Sector5,
			width: 115,
			height: 118,
			animationDelay: 300,
		},
		{
			title: 'Educaci??n',
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
				{
					x: -400,
					opacity: 0,
					duration: 2,
					delay: 2,
					onComplete() {
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
					},
				}
			)
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
								<div data-aos='fade-up' data-aos-delay='500'>
									<Link
										to='/contacto'
										className={`${styles.Hero_Link} transition-all`}
									>
										Cont??ctanos
									</Link>
								</div>
							</div>
							<div className={styles.threed}>
								<span
									id='box'
									data-diagram='box'
									className={` ${styles.box}`}
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
									??Conoce{' '}
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
									<h4 className={styles.Visor_Data_Title}>Tecnolog??a</h4>
									<p className={styles.Visor_Data_Text}>
										Soluciones innovadoras con tecnolog??a WebXR
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
										Trabajamos junto a empresas de Estados Unidos, Canad??,
										Dub??i, U.K. entre otros.
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
										educaci??n, arquitectura, etc.
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
												podr?? experimentar a trav??s del uso de gafas VR.
											</p>
										</div>
										<Link
											to='/servicio/realidad-virtual'
											className={styles.ServiceCard_Link}
										>
											Ver m??s
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
												proyectar en la realidad a trav??s de un dispositivo
												tecnol??gico.
											</p>
										</div>
										<Link
											to='/servicio/realidad-aumentada'
											className={styles.ServiceCard_Link}
										>
											Ver m??s
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
												Con nosotros vivir??s la experiencia de poder visualizar
												tus productos estrella en 3d a trav??s de una p??gina web.
											</p>
										</div>
										<Link
											to='/servicio/experiencias-3D'
											className={styles.ServiceCard_Link}
										>
											Ver m??s
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
												proyectar en la realidad a trav??s de un dispositivo
												tecnol??gico.
											</p>
										</div>
										<Link
											to='/servicio/realidad-aumentada'
											className={styles.ServiceCard_Link}
										>
											Ver m??s
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
												virtual, donde podr??s interactuar con otros usuarios en
												l??nea.
											</p>
										</div>
										<Link
											to='/servicio/metaverso'
											className={styles.ServiceCard_Link}
										>
											Ver m??s
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
					<div className={styles.Idea_ImageContainer}>
						<img
							className={styles.Idea_Image}
							src={lamparaA}
							width={200}
							alt='??Tienes una idea brillante?'
						/>
						<img
							className={`${styles.Idea_Image} ${styles.Idea_lamparaP}`}
							src={lamparaP}
							width={530}
							id='lamparaP'
							alt='??Tienes una idea brillante?'
						/>
					</div>

					<div className={styles.Idea_Text_Container}>
						<h2 className={styles.Idea_Title} data-aos='fade-up'>
							??Tienes una idea brillante?
						</h2>
						<p className={styles.Idea_Text} data-aos='fade-up'>
							??no sabes c??mo desarrollarla?
						</p>
						<div data-aos='fade-up' data-aos-delay='250'>
							<Link
								to='/contacto'
								className={styles.Idea_Button}
								onMouseEnter={show}
								onMouseLeave={hide}
							>
								Conversemos
							</Link>
						</div>
					</div>
					<img
						src={DetailWhite}
						className={styles.Hero_Bottom_Detail}
						alt='White Detail'
					/>
				</section>

				{/* Contact */}
				<div className={`${styles.Contact_Fluid_Container} `}>
					<span
						id='background'
						data-diagram='background'
						className={`${styles.background} `}
					></span>
					{/* <div className={`${styles.Contact} container `}>
					<Form />
				</div> */}
				</div>
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
							<div data-aos='fade-up' data-aos-delay='500'>
								<Link
									to='/contacto'
									className={`${styles.Hero_Link} transition-all`}
								>
									Contact Us
								</Link>
							</div>
						</div>
						<div className={styles.threed}>
							<span
								id='box'
								data-diagram='box'
								className={` ${styles.box}`}
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
								Come and{' '}
								<span className={styles.Visor_Text_Highlight}>
									check our work!
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
				<div className={styles.Idea_ImageContainer}>
					<img
						className={styles.Idea_Image}
						src={lamparaA}
						width={200}
						alt='Do you have a good idea?'
					/>
					<img
						className={`${styles.Idea_Image} ${styles.Idea_lamparaP}`}
						src={lamparaP}
						width={530}
						id='lamparaP'
						alt='and don???t know how to develop it?'
					/>
				</div>

				<div className={styles.Idea_Text_Container}>
					<h2 className={styles.Idea_Title} data-aos='fade-up'>
						Do you have a good idea
					</h2>
					<p className={styles.Idea_Text} data-aos='fade-up'>
						and don???t know how to develop it?
					</p>

					<div data-aos='fade-up' data-aos-delay='250'>
						<Link
							to='/contacto'
							className={styles.Idea_Button}
							onMouseEnter={show}
							onMouseLeave={hide}
						>
							LET???S TALK
						</Link>
					</div>
				</div>
				<img
					src={DetailWhite}
					className={styles.Hero_Bottom_Detail}
					alt='White Detail'
				/>
			</section>

			{/* Contact */}
			<div className={`${styles.Contact_Fluid_Container} `}>
				<span
					id='background'
					data-diagram='background'
					className={`${styles.background} `}
				></span>
				{/* <div className={`${styles.Contact} container `}>
					<Form />
				</div> */}
			</div>
		</main>
	)
}

export default Home
