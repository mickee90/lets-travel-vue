<template>
  <div
    class="banner-image"
    style="background-image: url(./imgs/trips/soccer.jpg);background-size: cover;"
  >
    <div class="container content posts item-view">
      <div class="post-body">
        <div class="title-input col-12">Budget</div>

        <div class="button-bar col-12">
          <div class="text-right">
            <button onclick="App.Budget.createItem()">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-12 d-flex">
            <div class="col-6">Total budget:</div>

            <div id="show-budget-box" class="col-6 row pr-0">
              <div class="col-8 pr-0">
                <span id="total_amount">20 000</span>
                $
              </div>
              <div class="text-md-rights col-4">
                <button onclick="App.Budget.editTotalAmount(this)" data-js="edit-budget-btn">
                  <i class="fas fa-pen"></i>
                </button>
              </div>
            </div>

            <div id="edit-budget-box" class="col-6 row pr-0" style="display:none;">
              <span id="total_amount" class="col-8 pr-0">
                <input
                  type="text"
                  name="total_amount"
                  id="total_amount_input"
                  value="20000"
                  style="width:100%;"
                  autofocus
                />
              </span>
              <span class="text-md-rights col-4">
                <button onclick="App.Budget.updateTotalAmount(this)" data-js="update-budget-btn">
                  <i class="fas fa-check"></i>
                </button>
              </span>
            </div>
          </div>
          <div class="col-12 d-flex">
            <div class="col-6">Remaining:</div>
            <div class="col-6">
              <span id="remainings">18000</span>
              $
            </div>
          </div>
        </div>

        <div class="item-list">
          <div class="col-12 post budget-item" data-item_id="1">
            <div class="col-8 pl-2 pr-0 row">
              <div class="budget-item-title col-12">
                <input
                  type="text"
                  name="item_title"
                  value="Item title #1"
                  style="width:100%;"
                  class="budget-item-title-input"
                  disabled
                />
              </div>
              <div class="budget-item-date col-12">
                <input
                  type="date"
                  class="form-control item-input budget-item-start_date-input"
                  name="item_start_date"
                  value="2020-03-01"
                  disabled
                />
              </div>
            </div>

            <div class="col-6 row show-budget-item-box">
              <div class="col-6 budget-amount-wrapper">
                <div class="budget-item-amount">
                  <span class="amount">2 000</span>
                  $
                </div>
              </div>

              <div class="col-6 row pl-0">
                <div class="budget-item-delete col-12 m-auto">
                  <button onclick="App.Budget.destroyItem(this)" data-item_id="1">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="budget-item-update col-12 m-auto">
                  <button onclick="App.Budget.editItem(this)" data-item_id="1">
                    <i class="fas fa-pen"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-6 row edit-budget-item-box" style="display:none;">
              <div class="col-6 budget-amount-wrapper">
                <div class="budget-item-amount" style="border-bottom: none;">
                  <input type="text" name="item_amount" value="2000" style="width:100%;" autofocus />
                </div>
              </div>

              <div class="col-6 row pl-0">
                <div class="budget-item-delete col-12 m-auto">
                  <button onclick="App.Budget.destroyItem(this)" data-item_id="1">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="budget-item-update col-12 m-auto">
                  <button onclick="App.Budget.updateItem(this)" data-item_id="1">
                    <i class="fas fa-check"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 post budget-item" data-item_id="2">
            <div class="col-8 pl-2 pr-0 row">
              <div class="budget-item-title col-12">
                <input
                  type="text"
                  name="item_title"
                  value="Item title #2"
                  style="width:100%;"
                  class="budget-item-title-input"
                  disabled
                />
              </div>
              <div class="budget-item-date col-12">
                <input
                  type="date"
                  class="form-control item-input budget-item-start_date-input"
                  name="item_start_date"
                  value="2020-03-01"
                  disabled
                />
              </div>
            </div>

            <div class="col-6 row show-budget-item-box">
              <div class="col-6 budget-amount-wrapper">
                <div class="budget-item-amount">
                  <span class="amount">1 000</span>
                  $
                </div>
              </div>

              <div class="col-6 row pl-0">
                <div class="budget-item-delete col-12 m-auto">
                  <button onclick="App.Budget.destroyItem(this)" data-item_id="2">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="budget-item-update col-12 m-auto">
                  <button onclick="App.Budget.editItem(this)" data-item_id="2">
                    <i class="fas fa-pen"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-6 row edit-budget-item-box" style="display:none;">
              <div class="col-6 budget-amount-wrapper">
                <div class="budget-item-amount" style="border-bottom: none;">
                  <input type="text" name="item_amount" value="1000" style="width:100%;" autofocus />
                </div>
              </div>

              <div class="col-6 row pl-0">
                <div class="budget-item-delete col-12 m-auto">
                  <button onclick="App.Budget.destroyItem(this)" data-item_id="2">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="budget-item-update col-12 m-auto">
                  <button onclick="App.Budget.updateItem(this)" data-item_id="2">
                    <i class="fas fa-check"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 post budget-item" data-item_id="3">
            <div class="col-8 pl-2 pr-0 row">
              <div class="budget-item-title col-12">
                <input
                  type="text"
                  name="item_title"
                  value="Item title #3"
                  style="width:100%;"
                  class="budget-item-title-input"
                  disabled
                />
              </div>
              <div class="budget-item-date col-12">
                <input
                  type="date"
                  class="form-control item-input budget-item-start_date-input"
                  name="item_start_date"
                  value="2020-03-03"
                  disabled
                />
              </div>
            </div>

            <div class="col-6 row show-budget-item-box">
              <div class="col-6 budget-amount-wrapper">
                <div class="budget-item-amount">
                  <span class="amount">2 500</span>
                  $
                </div>
              </div>

              <div class="col-6 row pl-0">
                <div class="budget-item-delete col-12 m-auto">
                  <button onclick="App.Budget.destroyItem(this)" data-item_id="3">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="budget-item-update col-12 m-auto">
                  <button onclick="App.Budget.editItem(this)" data-item_id="3">
                    <i class="fas fa-pen"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-6 row edit-budget-item-box" style="display:none;">
              <div class="col-6 budget-amount-wrapper">
                <div class="budget-item-amount" style="border-bottom: none;">
                  <input type="text" name="item_amount" value="2500" style="width:100%;" autofocus />
                </div>
              </div>

              <div class="col-6 row pl-0">
                <div class="budget-item-delete col-12 m-auto">
                  <button onclick="App.Budget.destroyItem(this)" data-item_id="3">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                <div class="budget-item-update col-12 m-auto">
                  <button onclick="App.Budget.updateItem(this)" data-item_id="3">
                    <i class="fas fa-check"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <app-tab-bar></app-tab-bar>
      </div>
    </div>
  </div>
</template>

<script>
import TabBar from "../layout/TabBar.vue";

export default {
  components: {
    appTabBar: TabBar
  }
};
</script>

<style scoped>
</style>