<script lang="ts">
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  type ButtonColor = "red" | "blue" | "yellow" | "green";
  type RGB = [number, number, number];

  export let name: string;
  export let pressed: boolean;
  export let color: ButtonColor;

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

  $: if (pressed) {
    fillOpacity.set(1);
  } else {
    fillOpacity.set(0.33);
  }
</script>

<svg
  class="gamepad-button"
  width={RADIUS * 2}
  height={RADIUS * 2}
  style="position: relative; display: block;"
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
  <foreignObject width="100%" height="100%" style="pointer-events: none;">
    <div class={pressed ? "highlight" : ""}>
      {name}
    </div>
  </foreignObject>
</svg>
