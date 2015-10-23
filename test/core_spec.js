import { expect } from 'chai';
import { List, Map } from 'immutable';

import { setEntries, next, vote } from '../src/core';

describe('application logic', () => {
  const item1 = 'foo';
  const item2 = 'bar';
  const item3 = 'baz';
  const item4 = 'quux';
  const item5 = 'wat';

  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = [item1, item2];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of(item1, item2)
      }));
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of(item1, item2, item3)
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of(item1, item2)
        }),
        entries: List.of(item3)
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of(item1, item2),
          tally: Map({
            foo: 3,
            bar: 2
          })
        }),
        entries: List.of(item3, item4, item5)
      });
      const nextState = next(state);
      
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of(item3, item4)
        }),
        entries: List.of(item5, item1)
      }));
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of(item1, item2),
          tally: Map({
            foo: 2,
            bar: 2
          })
        }),
        entries: List.of(item3, item4, item5)
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of(item3, item4)
        }),
        entries: List.of(item5, item1, item2)
      }));
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of(item1, item2),
          tally: Map({
            foo: 4,
            bar: 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: item1
      }));
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        pair: List.of(item1, item2)
      });
      const nextState = vote(state, item1);

      expect(nextState).to.equal(Map({
        pair: List.of(item1, item2),
        tally: Map({
          foo: 1
        })
      }));
    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        pair: List.of(item1, item2),
        tally: Map({
          foo: 3,
          bar: 2
        })
      });
      const nextState = vote(state, item1);

      expect(nextState).to.equal(Map({
        pair: List.of(item1, item2),
        tally: Map({
          foo: 4,
          bar: 2
        })
      }));
    });
  });
});
