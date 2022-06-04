import styles from './LiWithArrow.module.css'

interface Props {
	children: React.ReactNode
}

export const LiWithArrow: React.FC<Props> = ({ children }) => {
	return <li className={styles.arrow}>{children}</li>
}
