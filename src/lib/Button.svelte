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
