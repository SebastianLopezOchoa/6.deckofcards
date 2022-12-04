import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import useGame from '../hooks/useGame';
const ListCards = () => {
	const { playCardsOne, playCardsTwo } = useGame();
	return (
		<>
			<Container>
				<Row>
					<Col>
						<div className='align-items-center my-2'>
							<h4>Player {playCardsOne.name}</h4>
							<p>Cards obtained</p>
							{playCardsOne.cards.map((card, index) => (
								<img
									className='col-sm-4 col-lg-1 mx-2 my-2'
									key={index}
									src={card.image}
									alt={card.code}
								/>
							))}
						</div>
					</Col>
				</Row>
			</Container>
			<Container>
				<Row>
					<Col>
						<div className='align-items-center my-2'>
							<h4>Player {playCardsTwo.name}</h4>
							<p>Cards obtained</p>
							{playCardsTwo.cards.map((card, index) => (
								<img
									className='col-sm-4 col-lg-1 mx-2 my-2'
									key={index}
									src={card.image}
									alt={card.code}
								/>
							))}
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ListCards;
