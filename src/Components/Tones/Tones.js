import React from 'react';
import styles from './Tones.module.scss';
import UIFx from 'uifx';
import bellSound from '../audioFiles/tubularBell.mp3';
import announcementSound from '../audioFiles/announcement-sound-4-21464.mp3';
import bigImpact from '../audioFiles/big-impact-7054.mp3';
import buzzer from '../audioFiles/buzzer-or-wrong-answer-20582.mp3';
import fastSwoosh from '../audioFiles/clean-fast-swooshaiff-14784.mp3';
import decide from '../audioFiles/decidemp3-14575.mp3';
import dingIdea from '../audioFiles/ding-idea-40142.mp3';
import notifiction from '../audioFiles/notification-sound-7062.mp3';
import thriller from '../audioFiles/sound-effect-thriller-1-108404.mp3';
import tubularBell from '../audioFiles/tubularBell.mp3';
const Tones = (props) => {
	const bell = new UIFx(bellSound, { volume: 0.4, throttleMs: 100 });
	const announcement = new UIFx(announcementSound, { volume: 0.4, throttleMs: 100 });
	const impact = new UIFx(bigImpact, { volume: 0.4, throttleMs: 100 });
	const buzzerSound = new UIFx(buzzer, { volume: 0.4, throttleMs: 100 });
	const swoosh = new UIFx(fastSwoosh, { volume: 0.4, throttleMs: 100 });
	const decision = new UIFx(decide, { volume: 0.4, throttleMs: 100 });
	const ding = new UIFx(dingIdea, { volume: 0.4, throttleMs: 100 });
	const notifictions = new UIFx(notifiction, { volume: 0.4, throttleMs: 100 });
	const thrill = new UIFx(thriller, { volume: 0.4, throttleMs: 100 });
	const tubular_Bell = new UIFx(tubularBell, { volume: 0.4, throttleMs: 100 });

	const tones = [];
	for (let i = 0; i <= 10; i++) {
		tones.push(i);
	}
	console.log(tones);
	return (
		<div className={styles.TonesWrapper}>
			<div className={styles.tone} onClick={() => bell.play()}>
				<span>Bell</span>
			</div>
			<div className={styles.tone} onClick={() => announcement.play()}>
				<span>Announcement</span>
			</div>
			<div className={styles.tone} onClick={() => impact.play()}>
				<span>Impact</span>
			</div>
			<div className={styles.tone} onClick={() => buzzerSound.play()}>
				<span>Buzzer</span>
			</div>
			<div className={styles.tone} onClick={() => swoosh.play()}>
				<span>Swoosh</span>
			</div>
			<div className={styles.tone} onClick={() => thrill.play()}>
				<span>Thrill</span>
			</div>
			<div className={styles.tone} onClick={() => decision.play()}>
				<span>Decision</span>
			</div>
			<div className={styles.tone} onClick={() => ding.play()}>
				<span>Ding</span>
			</div>
			<div className={styles.tone} onClick={() => notifictions.play()}>
				<span>Notification</span>
			</div>
			<div className={styles.tone} onClick={() => tubular_Bell.play()}>
				<span>Tubular Bell</span>
			</div>
		</div>
	);
};

export default Tones;
