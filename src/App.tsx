import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface State {
  today: Date;
  clockName: string;
  hasClock: boolean;
}

export class App extends React.Component<{}, State> {
  state: State = {
    today: new Date(),
    clockName: 'Clock-0',
    hasClock: true,
  };

  private clockNameTimerId: number | null = null;

  private todayTimerId: number | null = null;

  componentDidMount() {
    this.clockNameTimerId = window.setInterval(() => {
      const newClockName = getRandomName();

      this.setState(prevState => {
        if (prevState.clockName !== newClockName) {
          // eslint-disable-next-line no-console
          console.warn(
            `Renamed from ${prevState.clockName} to ${newClockName}`,
          );
        }

        return { clockName: newClockName };
      });
    }, 3300);

    this.todayTimerId = window.setInterval(() => {
      if (this.state.hasClock) {
        this.setState({
          today: new Date(),
        });

        // eslint-disable-next-line no-console
        console.log(new Date().toUTCString().slice(-12, -4));
      }
    }, 1000);

    document.addEventListener('contextmenu', this.handleRightClick);
    document.addEventListener('click', this.handleLeftClick);
  }

  componentWillUnmount() {
    if (this.clockNameTimerId) {
      clearInterval(this.clockNameTimerId);
    }

    if (this.todayTimerId) {
      clearInterval(this.todayTimerId);
    }

    document.removeEventListener('contextmenu', this.handleRightClick);
    document.removeEventListener('click', this.handleLeftClick);
  }

  handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  handleLeftClick = () => {
    this.setState({ hasClock: true }, () => {
      this.setState({
        today: new Date(),
      });
    });
  };

  render() {
    const { clockName, today, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
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
