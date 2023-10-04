<template>
  <div class="about">
    <div class="navbar">
      <nav>
        <h3>This is About page</h3>
        <router-link to="/about1/guide">Guide</router-link>
        <router-link to="/about1/changelog">Changelog</router-link>
        <router-link to="/about1/github">Github</router-link>
        <router-link to="/about1/reference">Reference</router-link>
      </nav>
    </div>
    <main>
      <!-- 這裡放router-view！！！ -->
      <router-view />
    </main>
  </div>
</template>

<style>
  .about {
    transform: translateY(83px);
  }
  .navbar {
    background-color: darkcyan;
    float: left;
    height: 100vh;
  }
  .navbar nav {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .navbar a {
    margin: 10px 0;
  }

  .router-link-active {
    color: darkorange;
  }
</style>
