import React from "react";
import ParticlesTS from "react-tsparticles";

const Particles = () => {
  if (process.browser) {
    require("pathseg");
  }

  return (
    <ParticlesTS
      options={{
        zLayers: 3,
        detectRetina: false,
        fpsLimit: 60,
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "bubble",
            },
            onclick: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 150,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 200,
              size: 15,
              duration: 2,
              opacity: 8,
            },
            repulse: {
              distance: 250,
              duration: 0.2,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        particles: {
          color: {
            value: "#fff",
          },
          links: {
            blink: false,
            color: "#fff",
            consent: false,
            distance: 50,
            enable: false,
            opacity: 0.6,
            width: 1,
          },
          move: {
            attract: {
              enable: false,
              rotate: {
                x: 300,
                y: 1200,
              },
            },
            bounce: false,
            direction: "bottom",
            enable: true,
            outMode: "out",
            random: true,
            speed: 5,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
              area: 800,
            },
            limit: 0,
            value: 400,
          },
          opacity: {
            animation: {
              enable: false,
              minimumValue: 0.1,
              speed: 1,
              sync: false,
            },
            random: { enable: false, minimumValue: 0.3 },
            value: 0.8,
          },
          shape: {
            type: "image",
            stroke: {
              width: 3,
              color: "#fff",
            },
            polygon: {
              nb_sides: 5,
            },
            image: {
              src: "http://www.dynamicdigital.us/wp-content/uploads/2013/02/starburst_white_300_drop_2.png",
              width: 100,
              height: 100,
            },
          },
          size: {
            value: 5,
            random: true,
            animation: {
              enable: false,
              speed: 20,
              size_min: 0.1,
              sync: false,
            },
          },
        },
        polygon: {
          move: {
            radius: 10,
          },
          inlineArrangement: "equidistant",
          scale: 1,
          position: {
            x: 20,
            y: 40,
          },
          data: {
            path: "M129.6,200.8c0,62.6-26.5,78.4-80.2,105c6.9,4.6,16.2,10.1,32,17.6c41.4-19.6,81.4-45.3,81.4-113.8V65.1h-33.2V200.8z M98.1,65.1H0v28.7h65v91.9c0,42-2.5,45.9-57.1,70.5c3.8,9.6,9.3,19,16.5,27.5c61.7-27.5,73.7-41.7,73.7-89.3V65.1z",
            size: {
              width: 162.7,
              height: 323.3,
            },
          },
        },
      }}
    />
  );
};

export default Particles;
