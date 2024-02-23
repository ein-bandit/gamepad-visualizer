<script lang="ts">
  import { REFRESH_RATE } from "../consts.js";
  import { copyGamepadData, gamepadDataStore } from "../store/store.js";

  export let gamepadIndex: number;

  let update: number = 0;
  let poller: number | undefined = undefined;

  $: {
    clearInterval(poller);
    poller = setInterval(() => {
      gamepadDataStore.update((gamepadData) => {
        const currentGamepadData = navigator.getGamepads()[
          gamepadIndex
        ] as Gamepad;
        if (gamepadData.length > 200) {
          gamepadData.length = 200;
        }
        return [copyGamepadData(currentGamepadData), ...gamepadData];
      });

      update += 1;
    }, REFRESH_RATE);
  }
</script>

<div>
  {update}
  <slot />
</div>

<style>
  /* Add your styles here */
</style>
