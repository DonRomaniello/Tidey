# Tidey

[Tidey is live here.](https://donromaniello.github.io/Tidey/)

My original goal with Tidey was simple: I wanted to watch the tide rise and fall as it traveled up the Hudson. Once I had decided to do that,
it seemed like doing it for the entire planet would just be more of the same. In my mind there was a single pulse circling the globe like 
daybreak.

The first step was to find tide information for various stations around the planet. This was straightforward. At this point I assumed all the project 
would require was a map layer with a completely transparent ocean on top of a CSS gradient background. Each gradient point would be a tide station, 
and the intensity of blue would indicate the height of the tide. Chart that over time, and boom!

## Boom

Charting the stations on a map revealed a fundamental problem: the publicly available tide data is from stations where the tide bears 
on human activity. Not, for example, the open ocean, where the half meter of tide is on top of four kilometers of water.

For most of the area of the ocean, there is no station data. The colors representing the depth of the water between, say, Ecuador and Indonesia 
would be a smooth gradient the entire span of the Pacific. The pulse would be washed out.

Perhaps I could generate the data points from first principles. I began researching how tide predictions are made. Before giving a rough explanation 
of how the tides do work, first imagine a world where they work differently.

## How Tides Do Not Work

Imagine that the tide, perfectly correlated with the rotation of the Earth, rises and falls the same amount, at the same times, every day. Think of 
the technologies that would be built around such a routine, regular, and reliable pulse of water. 

There would be clocks that were nothing more than a float on a lever, the float resting on the surface of the water, and the other side of the rod 
pointing to a number. 

Hydroelectric dams would provide steady, consistent power from a millpond replenished and drained twice a day by the tide. 

Freight shipping in estuaries and bays would be as simple as dropping anchor at high or low tide, raising it at the opposite, and riding the surge 
the rest of the time.

When you realize that none of these practices or technologies exist, it becomes obvious that the tides do not work as simple, regular waves.

## How Tides Work

While gravity from our moon and sun do generate the underlying pulses of rising and falling water that produce the tides, those pulses are reflected,
funneled, amplified, attenuated, and combined in dozens of ways.

To take a simple example, imagine dropping a small stone into a bucket of water. If you drop it near the edge, the pattern of waves will be different
than if you drop it in the center. 

If instead of being a cylinder, the walls of the bucket instead resembled the world’s coastlines, the patterns would become very complicated indeed.

Thankfully, determining when all those reflections are going to reach a specific point doesn’t require modeling the world’s oceans. At least a month 
of observations from a single station, coupled with the mathematical techniques of Fourier Analysis will produce all the information you need 
to visualize the tides.

The NOAA scientists have already performed these observations and analyses, and the NOAA API developers let you to fetch a list of stations that
meets a parameter of your choosing. For example, all stations where the harmonic constituents have been determined.

At this point it looked pretty simple. Plot the stations, have an animation of interconnected circles stacked on top of each other attached to each
station, and you’re good.

## The Importance of Reading Before Writing

I spent a few hours trying to learn how to write and animate SVGs in JavaScript before learning that SVG animation would soon be deprecated. 
The next step was to try HTML5 Canvas, which is the approach implemented in the final version.

As luck would have it, the MDN HTML5 Canvas examples include a small planet-moon system. An orrery of sorts, which is what I needed to build. 
Keeping the rotation logic but stripping out the images and replacing them with simple rings, I soon had a working demonstration of the
harmonic constituents that compose the tides.

My first beta tester couldn’t make hide nor tails of it. Not having been steeped in the sweet mysteries that taught me the music of the spheres,
they were truly and justifiably confused. I didn’t want to release a project that required me to stand there saying, ‘No, the level of the tide 
is the red dot’s y axis value. That isn’t the moon.’

I realized what was in order was the classic demonstration of a [rotating circle generating a sine wave.](https://jackschaedler.github.io/circles-sines-signals/sincos.html) Easy.

Except, of course, the canvas logic included changing the actual origin of the canvas after drawing each circle. This meant that every subsequent
position of where the center of the next circle was going to be was irrelevant to the global view.

But, this was all pretty simple stuff. Draw the first circle from a known center. Then, determine where on that circle the center of the next
circle would be. Draw a circle centered on that point. Determine the next point, draw, and so on…

Perfect for recursion. Add a condition that records the last position on the rim of the smallest circle, and you can create a list of points. 
Also, every one of these calculations includes multiplying by the current frame.

With that, all that was left was the aesthetics.

Enjoy
