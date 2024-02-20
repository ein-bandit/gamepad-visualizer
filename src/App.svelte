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

  <div class="card">
    <div>
      {#if currentGamepad}
        <p>{currentGamepad}</p>
      {:else}
        <p>press a button first</p>
      {/if}
    </div>
    <Joystick
      name="Left Joystick"
      value={[data?.axes[0] ?? 0, data?.axes[1] ?? 0]}
    />
    <Button name="A" pressed={data?.buttons[0].pressed ?? false} color="blue" />
    <Button
      name="B"
      pressed={data?.buttons[2].pressed ?? false}
      color="green"
    />
  </div>
</main>

<style>
</style>
