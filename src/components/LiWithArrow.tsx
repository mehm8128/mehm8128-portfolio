import styles from './LiWithArrow.module.css'

interface Props {
	children: React.ReactNode
}

export default function LiWithArrow({ children }: Props) {
	return <li className={styles.arrow}>{children}</li>
}
