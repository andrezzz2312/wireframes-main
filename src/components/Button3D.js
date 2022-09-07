import { useEffect, useState } from 'react'
import { motion, useCycle } from 'framer-motion'
import styles from '../styles/containers/Footer.module.sass'

export default function Button({ props }) {
	const [hover, setHover] = useState(false)
	const [tap, setTap] = useCycle(false, true)
	const [initial, setInitial] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setInitial(false)
		}, 2000)
	}, [])

	const variants = {
		hoverfront: {
			translateX: 6,
			translateY: -6,
		},
		initialfront: {
			translateX: 3,
			translateY: -3,
			transition: {
				ease: 'easeInOut',
			},
		},
		hovershadow: {
			opacity: 1,
			translateY: 7,
			scaleX: 0.98,
		},
		initialshadow: {
			opacity: 1,
			translateY: 3,
		},
		shadowtap: {
			translateY: 0,
		},
		initfront: {
			translateX: [0, 6, 0, 3],
			translateY: [0, -6, 0, -3],
			opacity: [0, 1, 1, 1],

			transition: {
				delay: 1,
				duration: 1,
				ease: 'easeInOut',
			},
		},
		initshadow: {
			opacity: [0, 1, 1, 1],
			translateY: [0, 6, 0, 3],
			transition: {
				delay: 1,
				duration: 1,
				ease: 'easeInOut',
			},
		},
		initpush: {
			opacity: [0, 1],
			transition: {
				delay: 1,
				duration: 1,
				ease: 'easeInOut',
			},
		},
	}

	return (
		<motion.button
			onTapStart={() => {
				setTap()
			}}
			onTap={() => {
				setTap()
			}}
			className={styles.button}
		>
			<motion.span
				style={props.style ? props.style : { opacity: 1 }}
				variants={variants}
				initial={'initialshadow'}
				animate={
					initial
						? 'initshadow'
						: tap
						? 'shadowtap'
						: 'initialshadow' && hover
						? 'hovershadow'
						: 'initialshadow'
				}
				className={styles.shadow}
			></motion.span>

			<motion.span
				style={props.style ? props.style : { opacity: 1 }}
				animate={{
					opacity: [0, 1, 1, 1],
					transition: { duration: 1, delay: 1 },
				}}
				className={styles.pushable}
			></motion.span>

			<motion.a
				style={props.style ? props.style : { opacity: 1 }}
				download={props.download ? props.download : null}
				href={props.href}
				target={props.target ? props.target : null}
				animate={initial ? 'initfront' : 'initialfront'}
				whileHover={hover ? 'hoverfront' : 'initialfront'}
				whileTap={{ translateX: 0, translateY: 0 }}
				onHoverStart={() => setHover(true)}
				onHoverEnd={() => setHover(false)}
				variants={variants}
				className={styles.front}
			>
				{props.content}
			</motion.a>
		</motion.button>
	)
}
