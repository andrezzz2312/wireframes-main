import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Helmet from 'react-helmet'
import { AppContext } from '../context/AppContext'
import Hands from '../assets/images/hands.png'
import Features from '../assets/images/features.png'
import WorkUs from '../assets/images/work-us.png'
import DetailWhite from '../assets/details/bottom-detail.svg'
import DetailCyan from '../assets/details/bottom-detail-cyan.svg'
import styles from '../styles/pages/Nosotros.module.sass'

const Nosotros = () => {
	const { pathname } = useLocation()
	const { language } = useContext(AppContext)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	if(language === 'es') return (
		<main>
			<Helmet>
				<title>Nosotros | Wireframe Reality</title>
			</Helmet>

			{/* Hero */}
			<section className={`${styles.Hero_Container_Fluid} container-fluid`}>
				<div className={`${styles.Hero} container p-0`}>
					<div className="row align-items-start">
						<div className="col-12 col-md-7">
							<img
								src={Hands}
								className={styles.Hero_Image}
								alt="Hands"
								data-aos="zoom-in"
							/>
						</div>
						<div className="col-12 col-md-5 px-4 p-md-0">
							<h1 className={styles.Hero_Title} data-aos="fade-up">Nosotros</h1>
							<p className={styles.Hero_Text} data-aos="fade-up" data-aos-delay="150">
								Somos un equipo especializado en brindar soluciones por medio de
								tecnologías WebXR para proveer una nueva experiencia haciendo que
								tus productos o servicios tengan mejor posicionamiento en el mercado.
							</p>
						</div>
					</div>
				</div>
				<img
					src={DetailCyan}
					className={styles.Hero_Bottom_Detail}
					alt="Wireframes Planet"
				/>
			</section>

			{/* Features */}
			<section className={`${styles.Features_Container_Fluid} container-fluid`}>
				<div className={`${styles.Features} container p-0`}>
					<div className="row h-100 flex-column-reverse flex-lg-row justify-content-between">
						<div className={`${styles.Features_Text_Container} col-12 col-lg-5`}>
							<h2 className={styles.Features_Title} data-aos="fade-up">Nos caracteriza</h2>
							<div className={styles.Features_Items_Container}>
								<div className={styles.Features_Item} data-aos="fade-up">
									<p className={styles.Features_Text}>
										<span className={styles.Features_Text_Magenta}>La calidad, </span>
										nuestros colaboradores y representantes manejan un alto nivel de
										compromiso y profesionalismo, para brindarte lo mejor de lo mejor.
									</p>
								</div>
								<div className={styles.Features_Item} data-aos="fade-up" data-aos-delay="150">
									<p className={styles.Features_Text}>
										<span className={styles.Features_Text_Cyan}>La optimización, </span>
										nuestro equipo conoce los métodos y herramientas para que un buen
										proyecto sea ligero y de fácil acceso.
									</p>
								</div>
								<div className={styles.Features_Item} data-aos="fade-up" data-aos-delay="300">
									<p className={styles.Features_Text}>
										<span className={styles.Features_Text_Orange}>La comunicación, </span>
										nuestro objetivo es mantener un buen ambiente laboral con nuestros
										clientes y colaboradores, por medio de la empatía y la educación.
									</p>
								</div>
							</div>

						</div>
						<div className={`${styles.Features_Image_Container} col-12 col-lg-6`}>
							<img
								src={Features}
								alt='Calidad, Optimización, Comunicación'
								className={styles.Features_Image}
								data-aos="zoom-in"
							/>
						</div>
					</div>
				</div>
				<img
					src={DetailWhite}
					className={styles.Hero_Bottom_Detail}
					alt="Wireframes Planet"
					data-aos="zoom-in"
				/>
			</section>

			{/* Work with us */}
			<section className={`${styles.Work_Container_Fluid} container-fluid py-5`}>
				<div className={`${styles.Work} container`}>
					<div className="row justify-content-between">
						<div className={`${styles.Work_Image_Container} col-12 col-lg-6 ps-0`}>
							<img
								src={WorkUs}
								alt='Únete al equipo'
								className={styles.Work_Image}
								data-aos="fade-up"
							/>
						</div>
						<div className="col-12 col-lg-6 px-0">
							<div className={styles.Work_Text_Container}>
								<h2 className={styles.Work_Title} data-aos="fade-up">Únete al equipo</h2>
								<p className={styles.Work_Text} data-aos="fade-up" data-aos-delay="150">
									Buscamos a creadores, apasionados, y sin miedo a los retos constantes.
									Si eres creativo, amas trabajar en equipo y nunca dejas de aprender:
								</p>
								<a className={styles.Work_Button} href="mailto:info@wireframereality.com" data-aos="fade-up" data-aos-delay="150">
									Envía tu cv
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)

	return (
		<main>
			<Helmet>
				<title>About Us | Wireframe Reality</title>
			</Helmet>

			{/* Hero */}
			<section className={`${styles.Hero_Container_Fluid} container-fluid`}>
				<div className={`${styles.Hero} container p-0`}>
					<div className="row align-items-start">
						<div className="col-12 col-md-7">
							<img
								src={Hands}
								className={styles.Hero_Image}
								alt="Hands"
								data-aos="zoom-in"
							/>
						</div>
						<div className="col-12 col-md-5 p-md-0">
							<h1 className={styles.Hero_Title} data-aos="fade-up">About us</h1>
							<p className={styles.Hero_Text} data-aos="fade-up" data-aos-delay="150">
							We are a team specialized in providing solutions through WebXR technologies
							to bring a new experience making your products or services have better
							positioning in the market.
							</p>
						</div>
					</div>
				</div>
				<img
					src={DetailCyan}
					className={styles.Hero_Bottom_Detail}
					alt="Wireframes Planet"
				/>
			</section>

			{/* Features */}
			<section className={`${styles.Features_Container_Fluid} container-fluid`}>
				<div className={`${styles.Features} container p-0`}>
					<div className="row h-100 flex-column-reverse flex-lg-row justify-content-between">
						<div className={`${styles.Features_Text_Container} col-12 col-lg-5`}>
							<h2 className={styles.Features_Title} data-aos="fade-up">Benefits of working with us</h2>
							<div className={styles.Features_Items_Container}>
								<div className={styles.Features_Item} data-aos="fade-up">
									<p className={styles.Features_Text}>
										<span className={styles.Features_Text_Magenta}>Quality, </span>
										our collaborators and representatives handle a high level of
										commitment and professionalism, to give you the best of the best.
									</p>
								</div>
								<div className={styles.Features_Item} data-aos="fade-up" data-aos-delay="150">
									<p className={styles.Features_Text}>
										<span className={styles.Features_Text_Cyan}>Optimization, </span>
										our team knows the methods and tools to make a good
										project light and easy to access.
									</p>
								</div>
								<div className={styles.Features_Item} data-aos="fade-up" data-aos-delay="300">
									<p className={styles.Features_Text}>
										<span className={styles.Features_Text_Orange}>Communication, </span>
										our goal is to maintain a good working environment with
										our clients and collaborators, through empathy and education.
									</p>
								</div>
							</div>

						</div>
						<div className={`${styles.Features_Image_Container} col-12 col-lg-6`}>
							<img
								src={Features}
								alt='Quality, Optimization, Communication'
								className={styles.Features_Image}
								data-aos="zoom-in"
							/>
						</div>
					</div>
				</div>
				<img
					src={DetailWhite}
					className={styles.Hero_Bottom_Detail}
					alt="Wireframes Planet"
					data-aos="zoom-in"
				/>
			</section>

			{/* Work with us */}
			<section className={`${styles.Work_Container_Fluid} container-fluid py-5`}>
				<div className={`${styles.Work} container`}>
					<div className="row justify-content-between">
						<div className={`${styles.Work_Image_Container} col-12 col-lg-6 ps-0`}>
							<img
								src={WorkUs}
								alt='Join the team'
								className={styles.Work_Image}
								data-aos="fade-up"
							/>
						</div>
						<div className="col-12 col-lg-6 px-0">
							<div className={styles.Work_Text_Container}>
								<h2 className={styles.Work_Title} data-aos="fade-up">Join us</h2>
								<p className={styles.Work_Text} data-aos="fade-up" data-aos-delay="150">
								We are looking for passionate, creative people who are not afraid
								of constant challenges. If you are creative, like to work in a
								team and never stop learning:
								</p>
								<a className={styles.Work_Button} href="mailto:info@wireframereality.com" data-aos="fade-up" data-aos-delay="150">
									Send your cv
								</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Nosotros