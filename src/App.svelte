<script lang="ts">
  import Button from "./lib/Button.svelte";
  import Joystick from "./lib/Joystick.svelte";
  import Poller from "./lib/Poller.svelte";

  let currentGamepad: [number, string] = [-1, ""];

  window.addEventListener("gamepadconnected", (event) => {
    if (currentGamepad[0] >= 0) {
      // already selected a gamepad
      return;
    }

    console.log("A gamepad connected:");
    console.log(event.gamepad.index, event.gamepad.id);
    currentGamepad = [event.gamepad.index, event.gamepad.id];
  });

  window.addEventListener("gamepaddisconnected", (event) => {
    console.log("A gamepad disconnected:");
    console.log(event.gamepad.index, event.gamepad.id);
    currentGamepad = [-1, ""];
  });
</script>

<main>
  <h1>Gamepad Visualizer</h1>
  {#if currentGamepad[0] > -1}
    <p>
      index: {currentGamepad[0]}, id: {currentGamepad[1]}
    </p>
    <Poller gamepadIndex={currentGamepad[0]}>
      <div class="base-container">
        <div class="grid-container">
          <div>
            <Joystick name="Left Joystick" indices={[0, 1]} delay={5000} />
          </div>
          <div>
            <Joystick name="Left Joystick" indices={[0, 1]} />
          </div>
          <div>
            <Button name="B" index={2} color="green" />
          </div>
          <div>
            <Button name="A" index={0} color="blue" />
          </div>
          <div></div>
          <div>
            <Button name="A" index={0} color="blue" delay={5000} />
          </div>
        </div>
      </div>
    </Poller>
  {:else}
    <p>press a button first</p>
  {/if}
</main>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }
  .grid-container > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
