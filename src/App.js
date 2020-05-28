import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';


//get random food
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor(Math.random() * (max - min + 1) / 2) * 2;
  let y = Math.floor(Math.random() * (max - min + 1) / 2) * 2;
  return [x, y];
}

//intial state
const intialState = {
  direction: 'RIGHT',
  speed: 200,
  food: getRandomCoordinates(),
  snakeDot: [
    [0, 0],
    [2, 0]
  ]
}

class App extends Component {

  state = intialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed)
    document.onkeydown = this.onkeydown;
  }

  componentDidUpdate() {
    this.checkIfHitted();
    this.checkIfBordersCrosses();
    this.checkIfEat();
  }

  onkeydown = (e) => {

    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: 'UP' })
        break;
      case 40:
        this.setState({ direction: 'DOWN' })
        break;
      case 37:
        this.setState({ direction: 'LEFT' })
        break;
      case 39:
        this.setState({ direction: 'RIGHT' })
        break;
    }

  }

  moveSnake = () => {
    let dots = [...this.state.snakeDot];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {

      case 'RIGHT':
        head = [head[0] + 2, head[1]]
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]]
        break;
      case 'UP':
        head = [head[0], head[1] - 2]
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2]
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDot: dots
    })
  }

  checkIfBordersCrosses = () => {
    let head = this.state.snakeDot[this.state.snakeDot.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  onGameOver = () => {
    alert(`Game over,your score is ${this.state.snakeDot.length - 1}`)
    this.setState(intialState)
  }

  checkIfHitted = () => {
    let snake = [...this.state.snakeDot];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((item) => {
      if (head[0] == item[0] && head[1] == item[1]) {
        this.onGameOver();
      }
    })
  }

  checkIfEat = () => {
    let head = this.state.snakeDot[this.state.snakeDot.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }

  enlargeSnake = () => {
    let newSnake = [...this.state.snakeDot];
    newSnake.unshift([]);
    this.setState({
      snakeDot: newSnake
    })
  }

  increaseSpeed = () => {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }
  render() {
    return (
      <div className="game-area">
        <Snake snakeDot={this.state.snakeDot} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default App;


//steps(Algorithm):

// 1. create game border
// 2. create snake
// 3. create food in random
// 4. create direction of snake
// 5. create snake movement
// 6. create if it hitted borders
// 7.  create gameover method
// 8.  create if snake eat food
// 9. create method to enlargeSnake 
// 10. increase speed when it ate food