export function deckReducer(state: Card[], action: DeckActionTypes) {
    switch(action.type) {
      case DeckActions.ADD_CARD:{
        return [...state,action.card]
      }
    }
    return state
  }