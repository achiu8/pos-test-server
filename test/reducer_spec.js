import { expect } from 'chai';
import { List, Map, fromJS } from 'immutable';

import reducer from '../src/reducer';

describe('reducer', () => {
  const item1 = 'foo';
  const item2 = 'bar';
  const item3 = 'baz';

  it('handles SET_ENTRIES', () => {
    const entries = [item1];
    const initialState = Map();
    const action = { type: 'SET_ENTRIES', entries: entries };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({ entries: entries }));
  });

  it('handles NEXT', () => {
    const entries = [item1, item2];
    const initialState = fromJS({ entries: entries });
    const action = { type: 'NEXT' };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: entries
      },
      entries: []
    }));
  });

  it('handles VOTE', () => {
    const pair = [item1, item2];
    const initialState = fromJS({
      vote: {
        pair: pair
      },
      entries: []
    });
    const action = { type: 'VOTE', entry: item1 };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: pair,
        tally: { foo: 1 }
      },
      entries: []
    }));
  });

  it('has an initial state', () => {
    const entries = [item1];
    const action = { type: 'SET_ENTRIES', entries: entries };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({ entries: entries }));
  });

  it('can be used with reduce', () => {
    const entries = [item1, item2];
    const actions = [
      { type: 'SET_ENTRIES', entries: entries },
      { type: 'NEXT' },
      { type: 'VOTE', entry: item1 },
      { type: 'VOTE', entry: item2 },
      { type: 'VOTE', entry: item1 },
      { type: 'NEXT' }
    ];
    const finalState = actions.reduce(reducer, Map());

    expect(finalState).to.equal(fromJS({ winner: item1 }));
  });
});
