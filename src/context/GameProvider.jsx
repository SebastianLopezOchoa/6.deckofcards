import { useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	const [idGame, setIdGame] = useState(null);
	const [active, setActive] = useState(true);
	const [showToast, setShowToast] = useState(false);
	const [winName, setWinName] = useState('');
	const [playerOne, setPlayerOne] = useState({
		name: '',
		cards: [],
	});
	const [playerTwo, setPlayerTwo] = useState({
		name: '',
		cards: [],
	});

	const [totalCardsOne, setTotalCardsOne] = useState([]);
	const [totalCardsTwo, setTotalCardsTwo] = useState([]);
	const [playCardsOne, setPlayCardsOne] = useState({
		name: '',
		cards: [],
	});
	const [playCardsTwo, setPlayCardsTwo] = useState({
		name: '',
		cards: [],
	});

	const playGame = async () => {
		setIdGame(await DeckOfCardsAPI.getIdGame());
	};

	const rulesGame = (
		cards,
		request,
		player,
		playCards,
		totalCards,
		setPlayer
	) => {
		// busca si la carta que llega cuantas veces esta
		const someCardPlayer = player.cards.filter(
			card => card.value === cards[request].value
		);
		console.log('¿carta encontrada repetida?=' + someCardPlayer.length);
		// si la carta que llega no tiene alguna repetida no se ingresa (se descarta)
		if (someCardPlayer.length !== 0) {
			// buscar elemento a eliminar que tiene 1 carta repetida
			const findCardPlayer = totalCards.find(card => card.total === 1);
			if (findCardPlayer) {
				// elimino el elemento que tiene 1 carta repetida
				let array = playCards.cards.filter(
					card => card.value !== String(findCardPlayer.id)
				);
				array = [...array, cards[request]];
				// agrego el nuevo elemento
				setPlayer({ ...player, cards: array });
			} else {
				// buscar elemento a eliminar que tiene 2 cartas repetidas
				const findCardPlayer = totalCards.find(card => card.total === 2);
				if (findCardPlayer) {
					// elimino 2 cartas repetidas
					let array = playCards.cards.filter(
						card => card.value !== String(findCardPlayer.id)
					);
					// como tengo 2 cartas repetidas y solo quiero eliminar una, voy y encuentro los dos elementos a eliminar
					const repeatedCard = playCards.cards.filter(
						card => card.value === String(findCardPlayer.id)
					);
					// ingreso el segundo elemento en llegar de la carta repetida
					array = [...array, repeatedCard[1], cards[request]];
					setPlayer({ ...player, cards: array });
				}
			}
		}
	};

	const requestCards = async () => {
		setActive(!active);
		const cards = await DeckOfCardsAPI.getCards(idGame, 2);
		rulesGame(cards, 0, playerOne, playCardsOne, totalCardsOne, setPlayerOne);
		rulesGame(cards, 1, playerTwo, playCardsTwo, totalCardsTwo, setPlayerTwo);
		console.log(cards);
	};
	const firstRequestCards = async () => {
		const cards = await DeckOfCardsAPI.getCards(idGame, 20);
		setPlayerOne({
			...playerOne,
			cards: [
				...playerOne.cards,
				cards[0],
				cards[1],
				cards[2],
				cards[3],
				cards[4],
				cards[5],
				cards[6],
				cards[7],
				cards[8],
				cards[9],
			],
		});
		setPlayerTwo({
			...playerTwo,
			cards: [
				...playerTwo.cards,
				cards[10],
				cards[11],
				cards[12],
				cards[13],
				cards[14],
				cards[15],
				cards[16],
				cards[17],
				cards[18],
				cards[19],
			],
		});

		console.log(cards);
	};

	return (
		<GameContext.Provider
			value={{
				playGame,
				requestCards,
				playerOne,
				setPlayerOne,
				playerTwo,
				setPlayerTwo,
				showToast,
				setShowToast,
				winName,
				setWinName,
				firstRequestCards,
				totalCardsOne,
				setTotalCardsOne,
				playCardsOne,
				setPlayCardsOne,
				playCardsTwo,
				setPlayCardsTwo,
				totalCardsTwo,
				setTotalCardsTwo,
				active,
				setActive,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
