<script lang="ts">
  import { onDestroy } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { gamepadDataStore } from "../store/store.js";
  import { calculateDelayIndex } from "../consts.js";

  type ButtonColor = "red" | "blue" | "yellow" | "green";
  type RGB = [number, number, number];

  export let name: string;
  export let index: number;
  export let color: ButtonColor;
  export let delay: number | undefined = undefined;

  const delayedIndex = calculateDelayIndex(delay);

  const RADIUS = 33;

  const colorMap: Record<ButtonColor, RGB> = {
    red: [224, 60, 75],
    blue: [1, 77, 163],
    green: [0, 146, 109],
    yellow: [255, 188, 84],
  };

  $: fill = `rgb(${colorMap[color][0]},${colorMap[color][1]},${colorMap[color][2]})`;

  const fillOpacity = tweened(0, {
    duration: 500,
    easing: cubicOut,
  });

  let pressed = false;
  const unsubscribe = gamepadDataStore.subscribe((gamepadData) => {
    const data = gamepadData[delayedIndex];
    if (!data) return;

    pressed = data.buttons[index].pressed;
    if (pressed) {
      fillOpacity.set(1);
    } else {
      fillOpacity.set(0.33);
    }
  });

  onDestroy(unsubscribe);
</script>

<svg
  class="gamepad-element gamepad-button"
  width={RADIUS * 2}
  height={RADIUS * 2}
>
  <g>
    <circle
      cx={RADIUS}
      cy={RADIUS}
      r={RADIUS}
      {fill}
      fill-opacity={$fillOpacity}
    ></circle>
  </g>
  <foreignObject class="gamepad-object">
    <div>
      <div class={pressed ? "highlight" : ""}>
        {name}
      </div>
    </div>
  </foreignObject>
</svg>
