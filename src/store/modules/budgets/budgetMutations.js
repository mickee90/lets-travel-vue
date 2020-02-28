export const mutations = {
    storeBudgetItems(state, data) {
        state.budget.items = data;
    },
    storeBudgetAmount(state, data) {
        state.budget.amount = data;
    },
    storeBudget(state, data) {
        state.budget = { ...data };
    },
    addBudgetListItems(state, data) {
        if (state.budget.items === undefined) {
            state.budget.items = [data];
        } else {
            state.budget.items.unshift(data);
        }
    },
    deleteBucketlistItem(state, index) {
        if (state.budget.items === undefined || state.budget.items.length === 0) {
            return false;
        } else {
            state.budget.items.splice(index, 1);
            return true;
        }
    },
    resetState(state) {
        Object.assign(state, getInitState());
    }
}