import { useState } from 'react';
import DeckOfCardsAPI from '../services/deckofcardsapi';
import GameContext from './GameContext';

const GameProvider = ({ children }) => {
	const [idGame, setIdGame] = useState(null);
	const [win, setWin] = useState(false);
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

	const requestCards = async () => {
		const cards = await DeckOfCardsAPI.getCards(idGame, 2);
		setPlayerOne({ ...playerOne, cards: [...playerOne.cards, cards[0]] });
		setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, cards[1]] });
		console.log(cards);
		/*
		const findCardPlayerOne = playerOne.cards.find(
			card => card.value === cards[0].value
		);

		const findCardPlayerTwo = playerTwo.cards.find(
			card => card.value === cards[1].value
		);

		if (findCardPlayerOne || findCardPlayerTwo) {
			setWin(true);
			setShowToast(true);
			setWinName(findCardPlayerOne ? playerOne.name : playerTwo.name);
		}
		*/
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
				firstRequestCards,
				totalCardsOne,
				setTotalCardsOne,
				playCardsOne,
				setPlayCardsOne,
				playCardsTwo,
				setPlayCardsTwo,
				totalCardsTwo,
				setTotalCardsTwo,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
