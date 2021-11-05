import { BetCheckoutActionTypes } from '../constants/BetCheckoutActionTypes';
import { BetCheckoutState } from '../interfaces/BetCheckoutState';
import { BetCheckoutAction } from '../actions/BetCheckoutActions';

const initialState : BetCheckoutState = {
    matchID: "",
    teamID: "",
    bidAmount: "",
    error: "",
};

const BetCheckoutReducer = (state=initialState, action: BetCheckoutAction): BetCheckoutState => {
    switch (action.type) {
        case BetCheckoutActionTypes.SELECT_MATCH: {
            if (action.selectedMatchID === "") {
                return {
                    ...state,
                    error: "Please select a valid match.",
                };
            }
            return {
                ...initialState,
                matchID: action.selectedMatchID,
                error: "",
            };
        }
        case BetCheckoutActionTypes.SELECT_SIDE: {
            if (action.selectedTeamID === "") {
                return {
                    ...state,
                    error: "Please select a valid side."
                };
            }
            return {
                ...state,
                teamID: action.selectedTeamID,
                error: "",
            };
        }
        case  BetCheckoutActionTypes.ENTER_BID: {
            if (!isValidBidAmount(action.enteredBidAmount)) {
                return {
                    ...state,
                    error: "Please enter a valid bid amount."
                }
            }
            return {
                ...state,
                bidAmount: action.enteredBidAmount,
                error: "",
            };
        }
        case  BetCheckoutActionTypes.SUBMIT: {
            if (!isValidBetCheckoutState(state)) {
                return state;
            }
            return initialState;
        }
        case  BetCheckoutActionTypes.CANCEL: {
            return initialState;
        }
    }
}

const isValidBidAmount = (bidAmount: string): boolean => {
    if (isNaN(parseFloat(bidAmount))) {
        return false;
    }
    return true;
};

export const isValidBetCheckoutState = (bet: BetCheckoutState): boolean => {
    return bet.teamID !== "" && bet.matchID !== "" &&
        isValidBidAmount(bet.bidAmount) && bet.error === ""
};

export default BetCheckoutReducer;