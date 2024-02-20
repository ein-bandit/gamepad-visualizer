<script lang="ts">
  import JoystickVisualizer from "./JoystickVisualizer.svelte";

  export let name: string;
  export let value: [number, number];
</script>

<h2>{name}</h2>
<div style="display:flex;flex-direction:column;align-items:center">
  <code>{value[0]}, {value[1]}</code>

  <JoystickVisualizer x={value[0]} y={value[1]} />
</div>
