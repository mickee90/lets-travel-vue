export const mutations = {
    storeChecklistItems(state, data) {
        state.checklistItems = data;
    },
    addChecklistItems(state, data) {
        state.checklistItems.push(data);
    },
    updateChecklistItems(state, index, data) {
        state.checklistItems.$set(index, data);
    },
    deleteChecklistItem(state, index) {
        state.checklistItems.splice(index, 1);
    },
    resetState(state) {
        Object.assign(state, getInitState());
    }
}