import React from "react";
import { questions, candidates } from './Data.js'
import './App.css';

function Disclamer(props) {
  return (
    <div className="Disclamer">
      <p>Please report <a className="DisclamerLink" href="https://github.com/cloudsql/datastore-selector/issues">issues</a> to
        our GitHub <a className="DisclamerLink" href="https://github.com/cloudsql/datastore-selector">repo</a>.</p>
    </div>
  );
}

function ShowResult(props) {
  const list = props.list.map((entry) =>
    <li id={entry.id} key={entry.id}>
      <a className="ResultLink" href={entry.url}>{entry.title}</a>
    </li>
  );
  return (
    <div className="ResultList">
      <p>Compatible solutions:</p>
      <ul>
        {list}
      </ul>
    </div>
  );
}

function Question(props) {
  const choices = props.choices.map((choice) =>
    <li id={choice.id} key={choice.id} onClick={props.handleClick.bind(this, choice.id)}>
      {choice.title}
    </li>
  );

  return (
    <div className="Question">
      <p>{props.title}</p>
      <ul className="Choices">
        {choices}
      </ul>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { answers: [], questions:  questions };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.setState((state) => {
      return {
        answers: state.answers.concat([id]),
        questions: state.questions.slice(1).filter(q => !q.hasOwnProperty("conflicts") || q.conflicts.indexOf(id) === -1)
      };
    })
  }

  render() {
    if (this.state.questions.length > 0) {
      const question = this.state.questions[0];
      return (
        <div className="App">
          <Question
            id={question.id}
            title={question.title}
            choices={question.choices}
            handleClick={this.handleClick}
          />
        </div>
      );
    } else {
      const result = candidates.filter(c => !this.state.answers.some(a => c.tags.indexOf(a) === -1));
      return (
        <div className="App">
          <ShowResult list={result} />
          <Disclamer />
        </div>
      );
    }
  }
}

export default App;
