import { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Helmet from 'react-helmet'
import { AppContext } from '../context/AppContext'
import Companies from '../components/Companies'
import Project1 from '../assets/portfolio/project-1.png'
import Project2 from '../assets/portfolio/project-2.png'
import Project3 from '../assets/portfolio/project-3.png'
import Project4 from '../assets/portfolio/project-4.png'
import Project5 from '../assets/portfolio/project-5.png'
import Project6 from '../assets/portfolio/project-6.png'
import Project7 from '../assets/portfolio/project-7.png'
import Project8 from '../assets/portfolio/project-8.png'
import Project9 from '../assets/portfolio/project-9.png'
import styles from '../styles/pages/Portafolio.module.sass'

const Portafolio = () => {
	const { pathname } = useLocation()
	const { language } = useContext(AppContext)

	const projects = [
		{
			title: 'Luxury Apartment',
			topic: 'Virtual Reality',
			image: Project1,
			link: 'https://wireframereality.com/webprojects/luxury_apt/',
		},
		{
			title: 'Galaxy',
			topic: '3D Web Experiencies',
			image: Project2,
			link: 'https://wireframereality.com/webprojects/galaxy/',
		},
		{
			title: 'Green Filters',
			topic: '3D Web Experiencies',
			image: Project3,
			link: 'https://wireframereality.com/webprojects/filters/',
		},
		{
			title: 'Machine Showcase',
			topic: '3D Web Experiencies',
			image: Project4,
			link: 'https://wireframereality.com/webprojects/RPC-HV/',
		},
		{
			title: 'Legion Mansion',
			topic: 'Metaverse Services',
			image: Project5,
			link: 'https://wireframereality.com/webprojects/legion-masion/  ',
		},
		{
			title: 'Laptop',
			topic: '3D Web Experiencies',
			image: Project6,
			link: 'https://wireframereality.com/webprojects/laptop',
		},
		{
			title: 'A/R Furniture',
			topic: 'Augmented Reality',
			image: Project7,
			link: 'https://wireframereality.com/webprojects/recliner/',
		},
		{
			title: 'Furniture Configurator',
			topic: '3D Web Experiencies',
			image: Project8,
			link: 'https://wireframereality.com/webprojects/furniture_configurator_v2/',
		},
		{
			title: 'Syringe Assenbly Simulation',
			topic: '3D Web Experiencies',
			image: Project9,
			link: 'https://wireframereality.com/webprojects/lab_simulation/',
		},
	]

	const projectsEn = [
		{
			title: 'Luxury Apartment',
			topic: 'Virtual Reality',
			image: Project1,
			link: 'https://wireframereality.com/webprojects/studio_apartment/',
		},
		{
			title: 'Galaxy',
			topic: 'Metaverse Services',
			image: Project2,
			link: 'https://wireframereality.com/webprojects/galaxy/',
		},
		{
			title: 'Green Filters',
			topic: '3D Web Experiencies',
			image: Project3,
			link: '',
		},
		{
			title: 'Machine Showcase',
			topic: 'Metaverse Services',
			image: Project4,
			link: '',
		},
		{
			title: 'Legion Mansion',
			topic: 'Metaverse Services',
			image: Project5,
			link: 'https://wireframereality.com/webprojects/legion-masion/  ',
		},
		{
			title: 'Laptop',
			topic: '3D Web Experiencies',
			image: Project6,
			link: 'https://wireframereality.com/webprojects/laptop',
		},
		{
			title: 'A/R Furniture',
			topic: 'Augmented Reality',
			image: Project7,
			link: 'https://wireframereality.com/webprojects/recliner/',
		},
		{
			title: 'Furniture Configurator',
			topic: '3D Web Experiencies',
			image: Project8,
			link: 'https://wireframereality.com/webprojects/furniture_configurator_v2/',
		},
		{
			title: 'Syringe Assenbly Simulation',
			topic: '3D Web Experiencies',
			image: Project9,
			link: 'https://wireframereality.com/webprojects/lab_simulation/',
		},
	]

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	if (language === 'es')
		return (
			<main className={styles.main}>
				<Helmet>
					<title>Portafolio | Wireframe Reality</title>
				</Helmet>

				{/* Hero */}
				<section className={`${styles.Hero_Container_Fluid} container-fluid`}>
					<div className={`${styles.Hero} container`}>
						<h1 className={styles.Hero_Title} data-aos='fade-up'>
							Nuestros Proyectos
						</h1>
						<p
							className={styles.Hero_Text}
							data-aos='fade-up'
							data-aos-delay='150'
						>
							Conoce un poco sobre nuestro desempeño, y cómo hemos implementado
							la realidad virtual y la realidad aumentada.
						</p>
					</div>
				</section>

				{/* Projects */}
				<section className={`${styles.Hero_Container_Fluid} container-fluid`}>
					<div className={`${styles.Project_Cards_Container} row`}>
						{projects.map((project, index) => (
							<a
								className={`${styles.Project_Card_Link} col-12 col-sm-6 col-md-4 p-0`}
								key={`Project-Card-${index}`}
								href={project.link}
							>
								<div data-aos='zoom-in'>
									<div className={styles.Project_Card}>
										<img
											className={styles.Project_Image}
											src={project.image}
											alt={project.title}
											title={project.title}
										/>
										<div className={styles.Project_Topic_Container}>
											<span className={styles.Project_Topic}>
												{project.topic}
											</span>
										</div>
										<div className={styles.Project_Title_Container}>
											<h4 className={styles.Project_Title}>{project.title}</h4>
										</div>
									</div>
								</div>
							</a>
						))}
					</div>
				</section>

				<section className={`${styles.Companies} container-fluid`}>
					<div className='container py-5'>
						<Companies />
					</div>
				</section>
			</main>
		)

	return (
		<main className={styles.main}>
			<Helmet>
				<title>Portfolio | Wireframe Reality</title>
			</Helmet>

			{/* Hero */}
			<section className={`${styles.Hero_Container_Fluid} container-fluid`}>
				<div className={`${styles.Hero} container`}>
					<h1 className={styles.Hero_Title} data-aos='fade-up'>
						Our projects
					</h1>
					<p
						className={styles.Hero_Text}
						data-aos='fade-up'
						data-aos-delay='150'
					>
						Learn a little about our performance, and how we have implemented
						virtual reality and augmented reality.
					</p>
				</div>
			</section>

			{/* Projects */}
			<section className={`${styles.Project_Container_Fluid} container-fluid`}>
				<div className={`${styles.Project_Cards_Container} row`}>
					{projectsEn.map((project, index) => {
						if (project.link)
							return (
								<a
									className={`${styles.Project_Card_Link} col-12 col-sm-6 col-md-4 p-0`}
									key={`Project-Card-${index}`}
									href={project.link}
								>
									<div className={styles.Project_Card} data-aos='zoom-in'>
										<img
											className={styles.Project_Image}
											src={project.image}
											alt={project.title}
											title={project.title}
										/>
										<div className={styles.Project_Topic_Container}>
											<span className={styles.Project_Topic}>
												{project.topic}
											</span>
										</div>
										<div className={styles.Project_Title_Container}>
											<h4 className={styles.Project_Title}>{project.title}</h4>
										</div>
									</div>
								</a>
							)
					})}
				</div>
			</section>

			<section className={`${styles.Companies} container-fluid`}>
				<div className='container py-5'>
					<Companies />
				</div>
			</section>
		</main>
	)
}

export default Portafolio
