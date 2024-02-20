<script lang="ts">
  import Button from "./lib/Button.svelte";
  import Joystick from "./lib/Joystick.svelte";

  // create a constant for input refresh rate
  const POLL_RATE = 33;

  let currentGamepad: [number, string] = [-1, ""];
  let data: Gamepad | null = null;
  let poller: number | undefined = undefined;

  window.addEventListener("gamepadconnected", (event) => {
    if (currentGamepad[0] >= 0) {
      // already selected a gamepad
      return;
    }

    console.log("A gamepad connected:");
    console.log(event.gamepad.index, event.gamepad.id);
    currentGamepad = [event.gamepad.index, event.gamepad.id];

    console.log("starting to poll");
    poller = setInterval(pollInputs, POLL_RATE);
  });

  window.addEventListener("gamepaddisconnected", (event) => {
    console.log("A gamepad disconnected:");
    console.log(event.gamepad.index, event.gamepad.id);
    clearInterval(poller);
    poller = undefined;
    currentGamepad = [-1, ""];
  });

  const pollInputs = () => {
    const gamepads = navigator.getGamepads();

    data = gamepads[currentGamepad[0]];
    // console.log(data);
  };
</script>

<main>
  <h1>Gamepad Visualizer</h1>
  <div>
    {#if currentGamepad}
      <p>
        index: {currentGamepad[0]}, id: {currentGamepad[1].length
          ? currentGamepad[1]
          : "unknown"}
      </p>
    {:else}
      <p>press a button first</p>
    {/if}
  </div>
  <div class="base-container">
    <div class="grid-container">
      <div class="joystick">
        <Joystick
          name="Left Joystick"
          value={[data?.axes[0] ?? 0, data?.axes[1] ?? 0]}
        />
      </div>
      <div class="button-a">
        <Button
          name="B"
          pressed={data?.buttons[2].pressed ?? false}
          color="green"
        />
      </div>
      <div class="button-b">
        <Button
          name="A"
          pressed={data?.buttons[0].pressed ?? false}
          color="blue"
        />
      </div>
    </div>
  </div>
</main>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
  .joystick {
    grid-column: 1 / -1;
    grid-row: 1;
  }
  [class^="button-"] {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button-a {
    grid-column: 1;
    grid-row: 2;
  }
  .button-b {
    grid-column: 2;
    grid-row: 2;
  }
</style>
