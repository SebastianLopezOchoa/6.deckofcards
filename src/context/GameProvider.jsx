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
		//busca si la carta que llega cuantas veces esta
		const someCardPlayerOne = playerOne.cards.filter(
			card => card.value == cards[0].value
		);
		const someCardPlayerTwo = playerTwo.cards.filter(
			card => card.value == cards[1].value
		);
		console.log('¿repetida carta 1?=' + someCardPlayerOne.length);
		console.log('¿repetida carta 2?=' + someCardPlayerTwo.length);
		//si la carta que llega no tiene ni una repetida no se ingresa(se descarta)
		if (someCardPlayerOne.length !== 0) {
			//buscar elemento a eliminar
			const hii = totalCardsOne.find(card => card.total === 1);
			console.log('find1=' + hii);
			if (hii) {
				let ar = playCardsOne.cards.filter(
					card => card.value !== String(hii.id)
				);
				//agrego el nuevo elemento
				ar = [...ar, cards[0]];
				setPlayerOne({ ...playerOne, cards: ar });
			} else {
				const hi = totalCardsOne.find(card => card.total === 2);
				if (hi) {
					let ar = playCardsOne.cards.filter(
						card => card.value !== String(hi.id)
					);
					//como tengo 2 solo quiero eliminar uno haci que encuentro el primero para no eliminarlo
					const f = playCardsOne.cards.filter(
						card => card.value === String(hi.id)
					);
					ar = [...ar, f[1], cards[0]];
					setPlayerOne({ ...playerOne, cards: ar });
				} else {
					const ho = totalCardsOne.find(card => card.total === 3);
					if (ho) {
						let ar = playCardsOne.cards.filter(
							card => card.value !== String(ho.id)
						);
						ar = [...ar, cards[0]];
						setPlayerOne({ ...playerOne, cards: ar });
					}
				}
			}
		}
		if (someCardPlayerTwo.length !== 0) {
			//buscar elemento a eliminar
			const hi = totalCardsTwo.find(card => card.total === 1);
			console.log('find2=' + hi);
			if (hi) {
				//elimina el elemento que solo tiene una copia
				let ar = playCardsTwo.cards.filter(
					card => card.value !== String(hi.id)
				);
				ar = [...ar, cards[1]];
				setPlayerTwo({ ...playerTwo, cards: ar });
			} else {
				const hi = totalCardsTwo.find(card => card.total === 2);
				if (hi) {
					let ar = playCardsTwo.cards.filter(
						card => card.value !== String(hi.id)
					);
					//como tengo 2 solo quiero eliminar uno haci que encuentro el primero para no eliminarlo
					const f = playCardsTwo.cards.filter(
						card => card.value === String(hi.id)
					);
					ar = [...ar, f[1], cards[0]];
					setPlayerTwo({ ...playerTwo, cards: ar });
				} else {
					const ho = totalCardsTwo.find(card => card.total === 3);
					if (ho) {
						let ar = playCardsTwo.cards.filter(
							card => card.value !== String(ho.id)
						);
						ar = [...ar, cards[1]];
						setPlayerTwo({ ...playerTwo, cards: ar });
					}
				}
			}
		}

		//setPlayerOne({ ...playerOne, cards: [...playerOne.cards, cards[0]] });
		//setPlayerTwo({ ...playerTwo, cards: [...playerTwo.cards, cards[1]] });
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
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export default GameProvider;
