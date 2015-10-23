import { expect } from 'chai';
import { List, Map } from 'immutable';

describe('immutability', () => {
  const item1 = 'foo';
  const item2 = 'bar';
  const item3 = 'baz';

  describe('a number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('is immutable', () => {
      const state = 42;
      const nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });
  });

  describe('a List', () => {
    function addItem(currentState, item) {
      return currentState.push(item);
    }

    it('is immutable', () => {
      const state = List.of(item1, item2);
      const nextState = addItem(state, item3);

      expect(nextState).to.equal(List.of(item1, item2, item3));
      expect(state).to.equal(List.of(item1, item2));
    });
  });

  describe('a Map', () => {
    function addItem(currentState, item) {
      return currentState.update( 'items', movies => movies.push(item));
    }

    it('is immutable', () => {
      const state = Map({
        items: List.of(item1, item2)
      });
      const nextState = addItem(state, item3);

      expect(nextState).to.equal(Map({
        items: List.of(item1, item2, item3)
      }));
      expect(state).to.equal(Map({
        items: List.of(item1, item2)
      }));
    });
  });
});
