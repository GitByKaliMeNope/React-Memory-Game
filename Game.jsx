import React from 'react';
import './game.css';
import img0 from './img/Image0.png';
import img1 from './img/Image1.png';
import img2 from './img/Image2.png';
import img3 from './img/Image3.png';
import img4 from './img/Image4.png';
import img5 from './img/Image5.png';
import img6 from './img/Image6.png';
import img7 from './img/Image7.png';
import img8 from './img/Image8.png';

function shuffleArray(array) {
  // Fisher-Yates Shuffle Algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      flipped: [],
      solved: [],
      score: 0,
      foundPairs: 0,
      gameStarted: false,
    };
  }

  componentDidMount() {
    this.startGame();
  }

  startGame() {
    const symbols = [
      img0, img1, img2, img3, img4, img5, img6, img7, img8
    ];
    const shuffledCards = shuffleArray([...symbols, ...symbols]);

    this.setState({
      cards: shuffledCards,
      flipped: [],
      solved: [],
      foundPairs: 0,
      score: 0,
      gameStarted: true,
    });
  }
  

  handleCardClick(index) {
    const { flipped, cards, solved } = this.state;

    if (flipped.length < 2 && !flipped.includes(index) && !solved.includes(cards[index])) {
      const newFlipped = [...flipped, index];
      let newPairs = this.state.foundPairs;

      if (flipped.length === 1) {
        const [firstIndex] = flipped;
        if (cards[firstIndex] === cards[index]) {
          newPairs += 1;
        }
      }

      this.setState({ flipped: newFlipped, foundPairs: newPairs });

      if (flipped.length === 1) {
        setTimeout(() => this.setState({ flipped: [] }), 1000);
      }
    }
  }

  isGameComplete() {
    const { cards } = this.state;
    return this.state.foundPairs === cards.length / 2;
  }

  handleWin() {
    this.setState({ foundPairs: this.state.cards.length / 2 });
    alert('Congratulations! You have won the game!');
  }

  render() {
    const { cards, flipped, solved } = this.state;

    return (
      <div className="App">
        <div className="cover-page">
          <h1>Memory Game</h1>
          {!this.state.gameStarted && <button onClick={() => this.startGame()}>Start Game</button>}
        </div>
        <h2>Found Pairs: {this.state.foundPairs}</h2>
        <h2>Score: {this.state.score}</h2>
        {this.isGameComplete() && (
          <div className="game-complete">
            Game Complete!
            <button onClick={() => this.handleWin()}>Win</button>
          </div>
        )}

        <div className="card-container">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${flipped.includes(index) || solved.includes(card) ? 'flipped' : ''}`}
              onClick={() => this.handleCardClick(index)}
            >
              {flipped.includes(index) || solved.includes(card) ? (
                <img src={card} alt={`Card ${index}`} />
              ) : (
                '❓'
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Game;
