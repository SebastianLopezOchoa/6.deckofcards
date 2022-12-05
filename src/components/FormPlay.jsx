import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import useGame from '../hooks/useGame';
import styles from './FormPlay.module.css';

const FormPlay = () => {
	const { requestCards } = useGame();
	const handleClick = async () => {
		await requestCards();
	};
	const [activeBtn, setActiveBtn] = useState(true);
	useEffect(() => {
		setActiveBtn(true);
		setTimeout(() => {
			setActiveBtn(false);
		}, 1000);
	}, [requestCards]);

	return (
		<Stack gap={2} className='col-md-5 mx-auto'>
			<Button
				onClick={handleClick}
				variant='success'
				className={`${activeBtn ? styles.none : ''}`}
			>
				Let's Play!
			</Button>
			<Button
				variant='danger'
				className={`${styles.loadung} ${activeBtn ? '' : styles.none}`}
			>
				loading ...
			</Button>
		</Stack>
	);
};

export default FormPlay;
