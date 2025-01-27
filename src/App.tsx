import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface State {
  today: Date;
  clockName: string;
  isVisible: boolean;
}

export class App extends React.Component<{}, State> {
  state: State = {
    today: new Date(),
    clockName: 'Clock-0',
    isVisible: true,
  };

  private clockNameTimerId: number | null = null;

  private todayTimerId: number | null = null;

  componentDidMount() {
    this.clockNameTimerId = window.setInterval(() => {
      this.setState({
        clockName: getRandomName(),
      });
    }, 3300);

    this.todayTimerId = window.setInterval(() => {
      this.setState({
        today: new Date(),
      });

      // eslint-disable-next-line no-console
      console.log(Date.now().toString().slice(-4));
    }, 1000);
  }

  componentWillUnmount() {
    if (this.clockNameTimerId) {
      clearInterval(this.clockNameTimerId);
    }

    if (this.todayTimerId) {
      clearInterval(this.todayTimerId);
    }
  }

  handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({ isVisible: false });
  };

  handleLeftClick = () => {
    this.setState({ isVisible: true });
  };

  render() {
    const { clockName, today, isVisible } = this.state;

    return (
      <div
        className="App"
        onClick={this.handleLeftClick}
        onContextMenu={this.handleRightClick}
      >
        <h1>React clock</h1>

        {isVisible && (
          <div className="Clock">
            <strong className="Clock__name">{clockName}</strong>

            {' time is '}

            <span className="Clock__time">
              {today.toUTCString().slice(-12, -4)}
            </span>
          </div>
        )}
      </div>
    );
  }
}
