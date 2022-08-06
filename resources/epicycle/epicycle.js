const sun = new Image();
const moon = new Image();
const earth = new Image();
const harcon = {
  units: "feet",
  HarmonicConstituents: [
    {
      number: 1,
      name: "M2",
      description: "Principal lunar semidiurnal constituent",
      amplitude: 9.13,
      phase_GMT: 105.1,
      phase_local: 320.1,
      speed: 28.984104
    },
    {
      number: 2,
      name: "S2",
      description: "Principal solar semidiurnal constituent",
      amplitude: 1.4,
      phase_GMT: 147.6,
      phase_local: 357.6,
      speed: 30.0
    },
    {
      number: 3,
      name: "N2",
      description: "Larger lunar elliptic semidiurnal constituent",
      amplitude: 1.95,
      phase_GMT: 75.9,
      phase_local: 293.7,
      speed: 28.43973
    },
    {
      number: 4,
      name: "K1",
      description: "Lunar diurnal constituent",
      amplitude: 0.51,
      phase_GMT: 199.7,
      phase_local: 124.4,
      speed: 15.041069
    },
    {
      number: 5,
      name: "M4",
      description: "Shallow water overtides of principal lunar constituent",
      amplitude: 0.27,
      phase_GMT: 111.4,
      phase_local: 181.5,
      speed: 57.96821
    },
    {
      number: 6,
      name: "O1",
      description: "Lunar diurnal constituent",
      amplitude: 0.39,
      phase_GMT: 178.9,
      phase_local: 109.1,
      speed: 13.943035
    },
    {
      number: 7,
      name: "M6",
      description: "Shallow water overtides of principal lunar constituent",
      amplitude: 0.33,
      phase_GMT: 282.0,
      phase_local: 207.2,
      speed: 86.95232
    },
    {
      number: 8,
      name: "MK3",
      description: "Shallow water terdiurnal",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 44.025173
    },
    {
      number: 9,
      name: "S4",
      description: "Shallow water overtides of principal solar constituent",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 60.0
    },
    {
      number: 10,
      name: "MN4",
      description: "Shallow water quarter diurnal constituent",
      amplitude: 0.11,
      phase_GMT: 81.0,
      phase_local: 153.8,
      speed: 57.423832
    },
    {
      number: 11,
      name: "NU2",
      description: "Larger lunar evectional constituent",
      amplitude: 0.44,
      phase_GMT: 85.8,
      phase_local: 303.2,
      speed: 28.512583
    },
    {
      number: 12,
      name: "S6",
      description: "Shallow water overtides of principal solar constituent",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 90.0
    },
    {
      number: 13,
      name: "MU2",
      description: "Variational constituent",
      amplitude: 0.12,
      phase_GMT: 172.8,
      phase_local: 32.9,
      speed: 27.968208
    },
    {
      number: 14,
      name: "2N2",
      description: "Lunar elliptical semidiurnal second-order constituent",
      amplitude: 0.21,
      phase_GMT: 78.3,
      phase_local: 298.8,
      speed: 27.895355
    },
    {
      number: 15,
      name: "OO1",
      description: "Lunar diurnal",
      amplitude: 0.03,
      phase_GMT: 238.9,
      phase_local: 158.2,
      speed: 16.139101
    },
    {
      number: 16,
      name: "LAM2",
      description: "Smaller lunar evectional constituent",
      amplitude: 0.17,
      phase_GMT: 125.8,
      phase_local: 338.5,
      speed: 29.455626
    },
    {
      number: 17,
      name: "S1",
      description: "Solar diurnal constituent",
      amplitude: 0.03,
      phase_GMT: 160.0,
      phase_local: 85.0,
      speed: 15.0
    },
    {
      number: 18,
      name: "M1",
      description: "Smaller lunar elliptic diurnal constituent",
      amplitude: 0.03,
      phase_GMT: 191.6,
      phase_local: 119.1,
      speed: 14.496694
    },
    {
      number: 19,
      name: "J1",
      description: "Smaller lunar elliptic diurnal constituent",
      amplitude: 0.03,
      phase_GMT: 221.1,
      phase_local: 143.1,
      speed: 15.5854435
    },
    {
      number: 20,
      name: "MM",
      description: "Lunar monthly constituent",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 0.5443747
    },
    {
      number: 21,
      name: "SSA",
      description: "Solar semiannual constituent",
      amplitude: 0.05,
      phase_GMT: 127.6,
      phase_local: 127.1,
      speed: 0.0821373
    },
    {
      number: 22,
      name: "SA",
      description: "Solar annual constituent",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 0.0410686
    },
    {
      number: 23,
      name: "MSF",
      description: "Lunisolar synodic fortnightly constituent",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 1.0158958
    },
    {
      number: 24,
      name: "MF",
      description: "Lunisolar fortnightly constituent",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 1.0980331
    },
    {
      number: 25,
      name: "RHO",
      description: "Larger lunar evectional diurnal constituent",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 13.471515
    },
    {
      number: 26,
      name: "Q1",
      description: "Larger lunar elliptic diurnal constituent",
      amplitude: 0.06,
      phase_GMT: 170.4,
      phase_local: 103.4,
      speed: 13.398661
    },
    {
      number: 27,
      name: "T2",
      description: "Larger solar elliptic constituent",
      amplitude: 0.13,
      phase_GMT: 126.5,
      phase_local: 336.7,
      speed: 29.958933
    },
    {
      number: 28,
      name: "R2",
      description: "Smaller solar elliptic constituent",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 30.041067
    },
    {
      number: 29,
      name: "2Q1",
      description: "Larger elliptic diurnal",
      amplitude: 0.01,
      phase_GMT: 165.0,
      phase_local: 100.7,
      speed: 12.854286
    },
    {
      number: 30,
      name: "P1",
      description: "Solar diurnal constituent",
      amplitude: 0.15,
      phase_GMT: 199.4,
      phase_local: 124.6,
      speed: 14.958931
    },
    {
      number: 31,
      name: "2SM2",
      description: "Shallow water semidiurnal constituent",
      amplitude: 0.02,
      phase_GMT: 48.5,
      phase_local: 253.4,
      speed: 31.015896
    },
    {
      number: 32,
      name: "M3",
      description: "Lunar terdiurnal constituent",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 43.47616
    },
    {
      number: 33,
      name: "L2",
      description: "Smaller lunar elliptic semidiurnal constituent",
      amplitude: 0.74,
      phase_GMT: 145.2,
      phase_local: 357.5,
      speed: 29.528479
    },
    {
      number: 34,
      name: "2MK3",
      description: "Shallow water terdiurnal constituent",
      amplitude: 0.0,
      phase_GMT: 0.0,
      phase_local: 0.0,
      speed: 42.92714
    },
    {
      number: 35,
      name: "K2",
      description: "Lunisolar semidiurnal constituent",
      amplitude: 0.41,
      phase_GMT: 148.5,
      phase_local: 358.0,
      speed: 30.082138
    },
    {
      number: 36,
      name: "M8",
      description: "Shallow water eighth diurnal constituent",
      amplitude: 0.06,
      phase_GMT: 294.0,
      phase_local: 74.3,
      speed: 115.93642
    },
    {
      number: 37,
      name: "MS4",
      description: "Shallow water quarter diurnal constituent",
      amplitude: 0.08,
      phase_GMT: 162.0,
      phase_local: 227.0,
      speed: 58.984104
    }
  ],
  self: "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations/8410834/harcon.json"
}
function init() {
  sun.src = 'https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations/canvas_sun.png';
  moon.src = 'https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations/canvas_moon.png';
  earth.src = 'https://yari-demos.prod.mdn.mozit.cloud/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations/canvas_earth.png';
  window.requestAnimationFrame(draw);
}

harcon.HarmonicConstituents.sort((a, b) => b.amplitude - a.amplitude)

let constituents = harcon.HarmonicConstituents

let timeSubtract = new Date().getTime()

function draw() {
  const ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 1000, 1000); // clear canvas

  ctx.lineWidth = 3;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.5)';


  ctx.save();

  const time = new Date();

  let center = [500, 500]
  let radius = (constituents[0].amplitude  * 10)
  let speed = constituents[0].speed
  let shift = constituents[0].phase_GMT
  let incrementor = (time.getTime() - timeSubtract)
  const limiter = 100000


  ctx.beginPath();
  ctx.arc(center[0], center[1], radius, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.translate(center[0], center[1]);

  ctx.rotate((((speed) * (incrementor / limiter))) + (shift / limiter))
  ctx.save();


  ctx.translate(radius, 0);

  radius = (constituents[1].amplitude  * 10)
  speed = constituents[1].speed
  shift = constituents[1].phase_GMT
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
  ctx.stroke();
  ctx.rotate((((speed) * (incrementor / limiter))) + (shift / limiter))
  ctx.translate(0, radius);


  constituents.slice(2, 10).forEach((constituent) => {
    radius = constituent.amplitude * 10
    speed = constituent.speed
    shit = constituent.phase_GMT
    ctx.translate(radius / 2, 0);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.rotate((((speed) * (incrementor / limiter))) + (shift / limiter))
    ctx.translate(0, radius);
  })

  ctx.restore();
  ctx.restore();

  ctx.save()
  ctx.restore();


  window.requestAnimationFrame(draw);
}

init();
