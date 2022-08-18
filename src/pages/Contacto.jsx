import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Helmet from 'react-helmet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faInstagram, faTiktok, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { AppContext } from '../context/AppContext'
import Form from '../components/Form'
import styles from '../styles/pages/Contacto.module.sass'

const Contacto = () => {
	const { language } = useContext(AppContext)
	const { pathname } = useLocation()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [pathname])

	if(language === 'es') return (
		<main>
			<Helmet>
				<title>Contacto | Wireframe Reality</title>
			</Helmet>

			<section className={`${styles.Container_Fluid} container-fluid`}>
				<div className={`${styles.Container} container`}>
					<div className={`${styles.Row} row py-5`}>
						<div className={`${styles.Data} col-12 col-md-6 px-0`}>
							<h1 className={styles.Title} data-aos="fade-up">
								Contáctanos
							</h1>
							<p className={styles.Text} data-aos="fade-up" data-aos-delay="150">
								¡Queremos conocerte! Con gusto<br/>
								te apoyamos a crear, desarrollar e<br/>
								implementar tu idea.
							</p>
							<div className={styles.Data_Container} data-aos="fade-up" data-aos-delay="300">
								<FontAwesomeIcon icon={faEnvelope}/>
								<a className={styles.Data_Item} href="mailto:info@wireframereality.com">info@wireframereality.com</a>
								<FontAwesomeIcon icon={faPhone}/>
								<a className={styles.Data_Item} href="tel:+0984886441">0984886441</a>
								<FontAwesomeIcon icon={faPhone}/>
								<a className={styles.Data_Item} href="tel:+593 4-504-5717">593 4-504-5717</a>
								<FontAwesomeIcon icon={faLocationDot}/>
								<span className={styles.Data_Item}>Oficina 703 Piso 7 - City Office</span>
							</div>
							<div className={styles.Data_Networks} data-aos="fade-up" data-aos-delay="450" data-aos-offset="100">
								<a
									className={styles.Data_Network_Item_Facebook}
									href="https://www.facebook.com/Wireframe-Reality-111678261391750"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faFacebookF}/>
								</a>
								<a
									className={styles.Data_Network_Item_Twitter}
									href="https://twitter.com/wireframe_ec"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faTwitter}/>
								</a>
								<a
									className={styles.Data_Network_Item_Instagram}
									href="https://www.instagram.com/wireframereality/reels/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faInstagram}/>
								</a>
								<a
									className={styles.Data_Network_Item_TikTok}
									href="https://www.tiktok.com/@wireframerealitysas"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faTiktok}/>
								</a>
								<a
									className={styles.Data_Network_Item_Linkedin}
									href="https://www.linkedin.com/company/wireframe-reality/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faLinkedinIn}/>
								</a>
								<a
									className={styles.Data_Network_Item_YouTube}
									href="https://www.youtube.com/channel/UCSbZ_vjG7798mOxECk_-orQ/featured"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faYoutube}/>
								</a>
							</div>
						</div>
						<div className="col-12 col-md-6 px-0">
							<Form/>
						</div>
					</div>
				</div>
			</section>
		</main>
	)

	return (
		<main>
			<Helmet>
				<title>Contact | Wireframe Reality</title>
			</Helmet>

			<section className={`${styles.Container_Fluid} container-fluid`}>
				<div className={`${styles.Container} container`}>
					<div className={`${styles.Row} row py-5`}>
						<div className={`${styles.Data} col-12 col-md-6 px-0`}>
							<h1 className={styles.Title} data-aos="fade-up">
								Contact us
							</h1>
							<p className={styles.Text} data-aos="fade-up" data-aos-delay="150">
								We want to meet you! We are<br/>
								happy to help you create, develop<br/>
								and implement your idea.
							</p>
							<div className={styles.Data_Container} data-aos="fade-up" data-aos-delay="300">
								<FontAwesomeIcon icon={faEnvelope}/>
								<a className={styles.Data_Item} href="mailto:info@wireframereality.com">info@wireframereality.com</a>
								<FontAwesomeIcon icon={faPhone}/>
								<a className={styles.Data_Item} href="tel:+0984886441">0984886441</a>
								<FontAwesomeIcon icon={faPhone}/>
								<a className={styles.Data_Item} href="tel:+593 4-504-5717">593 4-504-5717</a>
								<FontAwesomeIcon icon={faLocationDot}/>
								<span className={styles.Data_Item}>Office 703 Piso 7 - City Office</span>
							</div>
							<div className={styles.Data_Networks} data-aos="fade-up" data-aos-delay="450" data-aos-offset="100">
								<a
									className={styles.Data_Network_Item_Facebook}
									href="https://www.facebook.com/Wireframe-Reality-111678261391750"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faFacebookF}/>
								</a>
								<a
									className={styles.Data_Network_Item_Twitter}
									href="https://twitter.com/wireframe_ec"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faTwitter}/>
								</a>
								<a
									className={styles.Data_Network_Item_Instagram}
									href="https://www.instagram.com/wireframereality/reels/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faInstagram}/>
								</a>
								<a
									className={styles.Data_Network_Item_TikTok}
									href="https://www.tiktok.com/@wireframerealitysas"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faTiktok}/>
								</a>
								<a
									className={styles.Data_Network_Item_Linkedin}
									href="https://www.linkedin.com/company/wireframe-reality/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faLinkedinIn}/>
								</a>
								<a
									className={styles.Data_Network_Item_YouTube}
									href="https://www.youtube.com/channel/UCSbZ_vjG7798mOxECk_-orQ/featured"
									target="_blank"
									rel="noopener noreferrer"
								>
									<FontAwesomeIcon icon={faYoutube}/>
								</a>
							</div>
						</div>
						<div className="col-12 col-md-6 px-0">
							<Form/>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}

export default Contacto