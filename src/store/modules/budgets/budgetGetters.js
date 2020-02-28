export const getters = {
    getBudgetItems(state) {
        return state.budget.items ? state.budget.items : [];
    },
    getBudget(state) {
        return state.budget;
    },
    getBudgetAmount(state) {
        return state.budget.amount;
    },
    getBudgetRemaining(state) {
        return state.budget.remaining;
    },
    getCurrency(state) {
        return state.budget.currency;
    },
    getBudgetId(state) {
        return state.budget.id;
    },
    getBudgetTripId(state) {
        return state.budget.tripId;
    }
}