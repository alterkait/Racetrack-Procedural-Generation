# Racetrack-Procedural-Generation

This application is a simple racetrack generator that runs on a webpage using the p5.js library. p5.js. The algorithm creates a closed loop by generating a series of points along a circle, which is centered in the middle of the canvas with a radius equal to 25% of the smallest dimension. Each point is slightly perturbed to add randomness and create a more interesting track layout. The points are then connected using smooth curves, ensuring a seamless connection between the last and first points. The algorithm also identifies up to two relatively straight sections of the track to represent DRS (Drag Reduction System) zones, and draws a blue line. 

To generate a new track, the user clicks anywhere on the canvas. 
