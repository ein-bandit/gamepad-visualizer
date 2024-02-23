<script lang="ts">
  import { onDestroy } from "svelte";
  import { gamepadDataStore } from "../store/store.js";
  import { calculateDelayIndex } from "../consts.js";

  export let name: string;
  export let indices: number[];
  export let delay: number | undefined = undefined;

  const RADIUS = 78.5;

  const delayedIndex = calculateDelayIndex(delay);

  let x = 0;
  let y = 0;

  let pointX = 0;
  let pointY = 0;
  let distance = 0;

  const unsubscribe = gamepadDataStore.subscribe((gamepadData) => {
    const data = gamepadData[delayedIndex];
    if (data === undefined) return;

    distance = Math.sqrt(
      Math.pow(data.axes[indices[0]], 2) + Math.pow(data.axes[indices[1]], 2)
    );

    x = data.axes[indices[0]];
    y = data.axes[indices[1]];

    pointX =
      (data.axes[indices[0]] / distance) * Math.min(distance * RADIUS, RADIUS);
    pointY =
      (data.axes[indices[1]] / distance) * Math.min(distance * RADIUS, RADIUS);
  });

  onDestroy(unsubscribe);
</script>

<svg
  class="gamepad-element gamepad-axis"
  width={RADIUS * 2}
  height={RADIUS * 2}
>
  <g transform="translate({RADIUS} {RADIUS}) scale(0.95, 0.95)">
    <circle
      cx="0"
      cy="0"
      r={RADIUS}
      fill="none"
      stroke="hsla(210,90%,20%,0.2)"
      stroke-width="1"
    ></circle>
    <line
      x1="0"
      y1={RADIUS * -1}
      x2="0"
      y2={RADIUS}
      stroke="hsla(210,90%,20%,0.2)"
      stroke-width="1"
    ></line>
    <line
      x1={RADIUS * -1}
      y1="0"
      x2={RADIUS}
      y2="0"
      stroke="hsla(210,90%,20%,0.2)"
      stroke-width="1"
    ></line>
    <line
      x1="0"
      y1="0"
      x2={pointX}
      y2={pointY}
      stroke="hsl(210,90%,20%)"
      stroke-width="1"
    ></line>
    <circle cx={pointX} cy={pointY} r="4" fill="hsl(210,90%,20%)"></circle>
  </g>
  <foreignObject class="gamepad-object">
    <div>
      <div>{name}</div>
      <div>{x.toFixed(6)}, {y.toFixed(6)}</div>
    </div>
  </foreignObject>
</svg>

<style>
  svg {
    overflow: visible;
  }
</style>
