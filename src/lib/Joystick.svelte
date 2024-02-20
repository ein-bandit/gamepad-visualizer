<script lang="ts">
  export let name: string;
  export let value: [number, number];

  const RADIUS = 78.5;

  $: [x, y] = value;

  $: distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

  $: pointX = (x / distance) * Math.min(distance * RADIUS, RADIUS);
  $: pointY = (y / distance) * Math.min(distance * RADIUS, RADIUS);
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
      <div>{value[0].toFixed(6)}, {value[1].toFixed(6)}</div>
    </div>
  </foreignObject>
</svg>

<style>
  svg {
    overflow: visible;
  }
</style>
