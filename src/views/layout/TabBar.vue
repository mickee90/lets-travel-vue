<template>
  <div class="tab-panel">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 tabs">
          <router-link :to="{name:'posts'}" class="tab">
            <i class="tab-icon fas fa-th-large"></i>
            <div class="tab-name">Posts</div>
          </router-link>
          <router-link :to="{name:'maps'}" class="tab">
            <i class="tab-icon fas fa-map-marked-alt"></i>
            <div class="tab-name">Map</div>
          </router-link>
          <router-link :to="{name:'checklist'}" class="tab">
            <i class="tab-icon fas fa-clipboard-list"></i>
            <div class="tab-name">Checklist</div>
          </router-link>
          <router-link :to="{name:'bucketList'}" class="tab">
            <i class="tab-icon fas fa-clipboard-check"></i>
            <div class="tab-name">Bucket list</div>
          </router-link>
          <router-link :to="{name:'budget'}" class="tab">
            <i class="tab-icon far fa-credit-card"></i>
            <div class="tab-name">Budget</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>