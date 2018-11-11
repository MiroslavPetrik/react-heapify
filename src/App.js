import React, { Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

const leftChild = root => root * 2 + 1;
const rightChild = root => root * 2 + 2;

const Heap = ({ array, root = 0, children }) =>
  root < array.length && (
    <div className="heap">
      {children({ value: array[root], index: root })}
      <Heap array={array} children={children} root={leftChild(root)} />
      <Heap array={array} children={children} root={rightChild(root)} />
    </div>
  );

Heap.propTypes = {
  children: PropTypes.func.isRequired,
  array: PropTypes.array.isRequired,
  root: PropTypes.number.isRequired
};

Heap.defaultProps = {
  children: ({ value }) => <div className="root">{value}</div>,
  root: 0
};

const sink = (array, root) => {
  let min = root;

  const left = leftChild(root);
  const right = rightChild(root);

  if (left < array.length && array[left] < array[min]) min = left;

  if (right < array.length && array[right] < array[min]) min = right;

  if (min !== root) {
    const temp = array[root];
    array[root] = array[min];
    array[min] = temp;

    return sink(array, min);
  }

  return array;
};

const Sink = ({ array, root }) => {
  const clone = [...array];
  const sinked = sink(array, root); // mutates

  return (
    <Heap array={sinked} root={root}>
      {({ value, index }) => (
        <div
          className={cn("root", {
            "sink-path": clone[index] !== value
          })}
        >
          {value}
        </div>
      )}
    </Heap>
  );
};

class Heapify extends Component {
  static propTypes = {
    array: PropTypes.array.isRequired,
    root: PropTypes.number.isRequired
  };

  static defaultProps = {
    root: 0
  };

  render() {
    const { array, root } = this.props;
    const clone = [...array];

    if (root >= array.length) return null;

    return (
      <div className="heapify">
        <div>
          <Heap array={clone} root={root} />
        </div>
        <Heapify array={array} root={leftChild(root)} />
        <Heapify array={array} root={rightChild(root)} />
        <Sink {...this.props} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    const array = [40, 74, 21, 47, 28, 15, 13];

    return (
      <>
        <header>
          <h1>Heapify</h1>
        </header>
        <section>
          <Heapify array={array} />
        </section>
        <footer>
          ⚛
          <a href="https://github.com/MiroslavPetrik/react-heapify">
            Miroslav Petrik
          </a>
        </footer>
      </>
    );
  }
}

export default App;
