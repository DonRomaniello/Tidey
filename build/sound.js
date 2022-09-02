const harmonics = [{
  number: 1,
  name: 'M2',
  description: 'Principal lunar semidiurnal constituent',
  amplitude: 0.52,
  phase_GMT: 44.1,
  phase_local: 114.2,
  speed: 28.984104
},
{
  number: 2,
  name: 'S2',
  description: 'Principal solar semidiurnal constituent',
  amplitude: 0.22,
  phase_GMT: 38.3,
  phase_local: 98.3,
  speed: 30
},
{
  number: 3,
  name: 'N2',
  description: 'Larger lunar elliptic semidiurnal constituent',
  amplitude: 0.1,
  phase_GMT: 38.3,
  phase_local: 113.9,
  speed: 28.43973
},
{
  number: 4,
  name: 'K1',
  description: 'Lunar diurnal constituent',
  amplitude: 0.54,
  phase_GMT: 226.5,
  phase_local: 76,
  speed: 15.041069
},
{
  number: 5,
  name: 'M4',
  description: 'Shallow water overtides of principal lunar constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 57.96821
},
{
  number: 6,
  name: 'O1',
  description: 'Lunar diurnal constituent',
  amplitude: 0.28,
  phase_GMT: 221.5,
  phase_local: 82,
  speed: 13.943035
},
{
  number: 7,
  name: 'M6',
  description: 'Shallow water overtides of principal lunar constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 86.95232
},
{
  number: 8,
  name: 'MK3',
  description: 'Shallow water terdiurnal',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 44.025173
},
{
  number: 9,
  name: 'S4',
  description: 'Shallow water overtides of principal solar constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 60
},
{
  number: 10,
  name: 'MN4',
  description: 'Shallow water quarter diurnal constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 57.423832
},
{
  number: 11,
  name: 'NU2',
  description: 'Larger lunar evectional constituent',
  amplitude: 0.02,
  phase_GMT: 25.2,
  phase_local: 100,
  speed: 28.512583
},
{
  number: 12,
  name: 'S6',
  description: 'Shallow water overtides of principal solar constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 90
},
{
  number: 13,
  name: 'MU2',
  description: 'Variational constituent',
  amplitude: 0.01,
  phase_GMT: 356,
  phase_local: 76.3,
  speed: 27.968208
},
{
  number: 14,
  name: '2N2',
  description: 'Lunar elliptical semidiurnal second-order constituent',
  amplitude: 0.01,
  phase_GMT: 45,
  phase_local: 126,
  speed: 27.895355
},
{
  number: 15,
  name: 'OO1',
  description: 'Lunar diurnal',
  amplitude: 0.02,
  phase_GMT: 263.1,
  phase_local: 101.7,
  speed: 16.139101
},
{
  number: 16,
  name: 'LAM2',
  description: 'Smaller lunar evectional constituent',
  amplitude: 0,
  phase_GMT: 41.4,
  phase_local: 106.8,
  speed: 29.455626
},
{
  number: 17,
  name: 'S1',
  description: 'Solar diurnal constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 15
},
{
  number: 18,
  name: 'M1',
  description: 'Smaller lunar elliptic diurnal constituent',
  amplitude: 0.02,
  phase_GMT: 247.2,
  phase_local: 102.2,
  speed: 14.496694
},
{
  number: 19,
  name: 'J1',
  description: 'Smaller lunar elliptic diurnal constituent',
  amplitude: 0.04,
  phase_GMT: 237.6,
  phase_local: 81.7,
  speed: 15.5854435
},
{
  number: 20,
  name: 'MM',
  description: 'Lunar monthly constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 0.5443747
},
{
  number: 21,
  name: 'SSA',
  description: 'Solar semiannual constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 0.0821373
},
{
  number: 22,
  name: 'SA',
  description: 'Solar annual constituent',
  amplitude: 0.16,
  phase_GMT: 192.1,
  phase_local: 191.6,
  speed: 0.0410686
},
{
  number: 23,
  name: 'MSF',
  description: 'Lunisolar synodic fortnightly constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 1.0158958
},
{
  number: 24,
  name: 'MF',
  description: 'Lunisolar fortnightly constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 1.0980331
},
{
  number: 25,
  name: 'RHO',
  description: 'Larger lunar evectional diurnal constituent',
  amplitude: 0.01,
  phase_GMT: 219.4,
  phase_local: 84.6,
  speed: 13.471515
},
{
  number: 26,
  name: 'Q1',
  description: 'Larger lunar elliptic diurnal constituent',
  amplitude: 0.05,
  phase_GMT: 215.7,
  phase_local: 81.7,
  speed: 13.398661
},
{
  number: 27,
  name: 'T2',
  description: 'Larger solar elliptic constituent',
  amplitude: 0.02,
  phase_GMT: 38.2,
  phase_local: 98.6,
  speed: 29.958933
},
{
  number: 28,
  name: 'R2',
  description: 'Smaller solar elliptic constituent',
  amplitude: 0,
  phase_GMT: 38.1,
  phase_local: 97.6,
  speed: 30.041067
},
{
  number: 29,
  name: '2Q1',
  description: 'Larger elliptic diurnal',
  amplitude: 0.01,
  phase_GMT: 216.4,
  phase_local: 87.8,
  speed: 12.854286
},
{
  number: 30,
  name: 'P1',
  description: 'Solar diurnal constituent',
  amplitude: 0.17,
  phase_GMT: 223.3,
  phase_local: 73.7,
  speed: 14.958931
},
{
  number: 31,
  name: '2SM2',
  description: 'Shallow water semidiurnal constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 31.015896
},
{
  number: 32,
  name: 'M3',
  description: 'Lunar terdiurnal constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 43.47616
},
{
  number: 33,
  name: 'L2',
  description: 'Smaller lunar elliptic semidiurnal constituent',
  amplitude: 0.01,
  phase_GMT: 35.1,
  phase_local: 99.8,
  speed: 29.528479
},
{
  number: 34,
  name: '2MK3',
  description: 'Shallow water terdiurnal constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 42.92714
},
{
  number: 35,
  name: 'K2',
  description: 'Lunisolar semidiurnal constituent',
  amplitude: 0.06,
  phase_GMT: 34,
  phase_local: 93.1,
  speed: 30.082138
},
{
  number: 36,
  name: 'M8',
  description: 'Shallow water eighth diurnal constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 115.93642
},
{
  number: 37,
  name: 'MS4',
  description: 'Shallow water quarter diurnal constituent',
  amplitude: 0,
  phase_GMT: 0,
  phase_local: 0,
  speed: 58.984104
}]

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// create Oscillator node
const oscillator = audioCtx.createOscillator();

const mixNode = audioCtx.createGain()

harmonics.forEach


oscillator.frequency.setValueAtTime(440, 0); // value in hertz
oscillator.connect(mixNode);
oscillator.start();


mixNode.connect(audioCtx.destination)


