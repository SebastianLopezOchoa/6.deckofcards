import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormPlay from '../components/FormPlay';
import ListCards from '../components/ListCards';
import ToastWinner from '../components/ToastWinner';
import useGame from '../hooks/useGame';
import { useEffect } from 'react';
const GamePage = () => {
	const {
		firstRequestCards,
		playerOne,
		playerTwo,
		totalCardsOne,
		setTotalCardsOne,
		totalCardsTwo,
		setTotalCardsTwo,
		playCardsOne,
		setPlayCardsOne,
		playCardsTwo,
		setPlayCardsTwo,
		setShowToast,
		setWinName,
	} = useGame();
	useEffect(() => {
		const fetchCards = async () => {
			await firstRequestCards();
		};
		fetchCards();
	}, []);

	const changeValues = player => {
		const ACE = player.cards.map(card =>
			card.value === 'ACE' ? { ...card, value: '1' } : card
		);
		const JACK = ACE.map(card =>
			card.value === 'JACK' ? { ...card, value: '11' } : card
		);
		const QUEEN = JACK.map(card =>
			card.value === 'QUEEN' ? { ...card, value: '12' } : card
		);
		const KING = QUEEN.map(card =>
			card.value === 'KING' ? { ...card, value: '13' } : card
		);
		return KING;
	};

	const totalCards = player => {
		const arr = [];
		for (let i = 1; i < 14; i++) {
			const cardsCount = player.cards
				.filter(card => card.value === String(i))
				.reduce((prev, act) => (prev += 1), 0);
			arr[i] = cardsCount;
		}
		const total = [
			{ id: 1, total: arr[1] },
			{ id: 2, total: arr[2] },
			{ id: 3, total: arr[3] },
			{ id: 4, total: arr[4] },
			{ id: 5, total: arr[5] },
			{ id: 6, total: arr[6] },
			{ id: 7, total: arr[7] },
			{ id: 8, total: arr[8] },
			{ id: 9, total: arr[9] },
			{ id: 10, total: arr[10] },
			{ id: 11, total: arr[11] },
			{ id: 12, total: arr[12] },
			{ id: 13, total: arr[13] },
		];
		return total;
	};

	const winner = (player, totalCards) => {
		const ternas = totalCards.filter(card => card.total === 3);
		const cuarta = totalCards.filter(card => card.total === 4);
		// si tiene 2 ternas y 1 cuarta gana el juego
		if (ternas.length === 2 && cuarta.length === 1) {
			setShowToast(true);
			setWinName(
				player.name +
					' Winner. TERNAS: ' +
					ternas[0].id +
					' y ' +
					ternas[1].id +
					' . CUARTA: ' +
					cuarta[0].id +
					'.'
			);
		}
	};

	useEffect(() => {
		setPlayCardsOne({ ...playerOne, cards: changeValues(playerOne) });
		setPlayCardsTwo({ ...playerTwo, cards: changeValues(playerTwo) });
	}, [playerOne, playerTwo]);

	useEffect(() => {
		setTotalCardsOne(totalCards(playCardsOne));
		setTotalCardsTwo(totalCards(playCardsTwo));
	}, [playCardsOne, playCardsTwo]);

	useEffect(() => {
		winner(playerOne, totalCardsOne);
		winner(playerTwo, totalCardsTwo);
	}, [totalCardsOne, totalCardsTwo]);

	return (
		<>
			<Container className='my-4'>
				<Row className='justify-content-md-center'>
					<Col xs={16} md={16}>
						<FormPlay />
					</Col>
					<Col>
						<ListCards />
					</Col>
				</Row>
				<Row>
					<Col>
						<ToastWinner />
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default GamePage;
