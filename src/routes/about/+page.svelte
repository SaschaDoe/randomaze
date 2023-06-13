<script>
    import {Version} from "./Version.ts";

  let todos = [
      { text: "Import Export", done: true },
      { text: "Table of contents for all tables page", done: true },
      { text: "Table of contents for main page", done: true },
      { text: "Decide what to remove when deleting entities with dependencies", done: false },
      { text: "Space with names", done: false },
      { text: "Locations", done: false },
      { text: "Places", done: false },
      { text: "Hexmap", done: false },
      { text: "Dungeons", done: false },
      { text: "Settlements", done: false },
      { text: "Traps", done: false },
      { text: "Abilities", done: false },
      { text: "Characters", done: false },
      { text: "Gods", done: false },
      { text: "Status", done: false },
      { text: "Fractions", done: false },
      { text: "Artefacts", done: false },
      { text: "Illness", done: false },
      { text: "Names and Cultures", done: false },
      { text: "Events", done: false },
      { text: "Plot devices", done: false },
      { text: "Fighting system", done: false },
      { text: "Survival system", done: false },
      { text: "Generate Adventure Module", done: false },
      { text: "Generate Full Region Description", done: false },
      { text: "Generate Campaign", done: false },
      { text: "Generate PDF", done: false },
      { text: "LLM api", done: false },
      { text: "AI Image Generation", done: false },
  ];
    function toggleDone(index) {
        todos[index].done = !todos[index].done;
    }
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="About this app"/>
</svelte:head>

<h1>About</h1>
<p>See <a href="https://github.com/SaschaDoe/randomaze" target="_blank">Github Repo</a></p>
<span>Version: {Version}</span>
<h3>Todo list</h3>
<ul class="todo-list">
    {#each todos as todo, index}
        <li>
            <input type="checkbox" bind:checked={todo.done} on:change={() => toggleDone(index)}/>
            {todo.text}
        </li>
    {/each}
</ul>

<style>
    .todo-list {
        list-style-type: none;
    }
</style>
