import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AlarmTone.module.scss';
import { HiChevronLeft } from 'react-icons/hi';
import Tones from '../Tones/Tones';
const AlarmTones = (props) => {
	return (
		<div className={styles.AlarmTonesWrapper}>
			<header className={styles.AlarmToneHeader}>
				<Link to={-1} className={styles.backLink}>
					<HiChevronLeft className={styles.goBackIcon} />
				</Link>
				<h3 className={styles.AlarmHeader}>Work Alarm</h3>
			</header>
			<Tones />
		</div>
	);
};
export default AlarmTones;
