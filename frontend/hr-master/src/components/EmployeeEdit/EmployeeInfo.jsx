import styles from './EmployeeInfo.module.css';

export default function EmployeeInfo() {
	return (
		<div className={styles.infoContainer}>
			<h3>개인정보</h3>
			<form className={styles.infoForm}></form>
		</div>
	);
}
