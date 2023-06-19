import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.actualPaper = 0;
    this.room.children.forEach((child) => {
      if (child.name === "Cube002") {
        this.hexalight = child;
      }
      if (child.name === "drawer3") {
        this.drawer = child;
      }
    });
    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    const papers = [];
    this.room.children.forEach((child) => {
      if (child.name.startsWith("paper")) {
        papers.push(child);
      }
    });

    this.mm = GSAP.matchMedia();

    this.mm.add("(min-width: 969px)", () => {
      // First Section --------------------------------------------
      this.firstTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      }).to(this.room.position, {
        x: () => {
          return this.sizes.width * 0.0015;
        },
      });

      // Second Section --------------------------------------------

      this.secondTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.position,
          {
            x: () => {
              return 1;
            },
            z: () => {
              return this.sizes.height * 0.008;
            },
          },
          "sameSecond"
        )
        .to(
          this.room.scale,
          {
            x: 0.4,
            y: 0.4,
            z: 0.4,
          },
          "sameSecond"
        )
        .to(
          this.hexalight,
          {
            width: 100,
            height: 100,
          },
          "sameSecond"
        );

      // Third Section --------------------------------------------
      this.thirdTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.position,
          {
            x: () => {
              return -this.sizes.width * 0.002;
            },
            z: () => {
              return this.sizes.height * 0.01;
            },
          },
          "sameSecond"
        )
        .to(
          this.room.rotation,
          {
            y: () => {
              return Math.PI * 0.25;
            },
          },
          "sameSecond"
        )
        .to(
          this.room.scale,
          {
            x: 0.7,
            y: 0.7,
            z: 0.7,
          },
          "sameSecond"
        );
      this.projetTimeline = new GSAP.timeline({ paused: true })
        .to(
          this.drawer.position,
          {
            z: () => {
              return -0.63;
            },
            x: () => {
              return 11;
            },
          },
          "openDrawer"
        )
        .to(
          papers.map((paper) => paper.position),
          {
            // move all paper objects
            z: () => {
              return -0.63;
            },
            x: () => {
              return 11;
            },
          },
          "openDrawer"
        )
        .to(this.room.rotation, {
          x: () => {
            return Math.PI * 0.25;
          },
        });

      this.newPaperTimeline = []
      papers.forEach((paper, i) => {
        this.newPaperTimeline[i] = new GSAP.timeline({ paused: true })
          .to(
            papers[i].position,
            {
              y: 15,
              x: 5,
              z: 0,
            },
            "paperZoom"
          )
          .to(
            papers[i].rotation,
            {
              y: Math.PI * 0.25,
              // x: Math.PI * 0.25,
            },
            "paperZoom"
          )
          .to(
            papers[i].scale,
            {
              y: 4,
              x: 4,
              z: 4,
            },
            "paperZoom"
          );
      });

      this.backPaperTimeline = [];
      papers.forEach((paper, i) => {
        this.backPaperTimeline[i] = new GSAP.timeline({ paused: true })
        .to(
          papers[i].position,
          {
            z: () => {
              return -0.63;
            },
            x: () => {
              return 11;
            },
            y: () => {
              return 1.95;
            },
          },
          "paperUnzoom"
        )
        .to(
          papers[i].rotation,
          {
            y: 0,
          },
          "paperUnzoom"
        )
        .to(
          papers[i].scale,
          {
            y: 0.7,
            x: 0.7,
            z: 0.7,
          },
          "paperUnzoom"
        )
      });

      this.returnTimeline = new GSAP.timeline({ paused: true })
        .to(
          papers.map((paper) => paper.position),
          {
            // move all paper objects
            x: 11.770617485046387,
            y: 1.925641417503357,
            z: -1.318479299545288,
          },
          "drawerClose"
        )
        .to(
          this.drawer.position,
          {
            x: 11.644689559936523,
            y: 1.9924969673156738,
            z: -1.2865962982177734,
          },
          "drawerClose"
        )
        .to(this.room.rotation, {
          x: () => {
            return 0;
          },
        });

      // Fourth Section --------------------------------------------
      this.fourthTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".four-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.scale,
          {
            x: 0.09,
            y: 0.09,
            z: 0.09,
          },
          "sameFour"
        )
        .to(
          this.room.rotation,
          {
            y: () => {
              return 0;
            },
          },
          "sameFour"
        )
        .to(
          this.room.position,
          {
            x: () => {
              return -this.sizes.width * 0.001;
            },
            z: () => {
              return 0;
            },
          },
          "sameFour"
        );
    });

    this.mm.add("(max-width: 968px)", () => {
      // First Section --------------------------------------------
      this.firstTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      }).to(this.room.position, {
        x: () => {
          return this.sizes.width * 0.0015;
        },
      });

      // Second Section --------------------------------------------

      this.secondTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.position,
          {
            x: () => {
              return 1;
            },
            z: () => {
              return this.sizes.height * 0.008;
            },
          },
          "sameSecond"
        )
        .to(
          this.room.scale,
          {
            x: 0.4,
            y: 0.4,
            z: 0.4,
          },
          "sameSecond"
        )
        .to(
          this.hexalight,
          {
            width: 100,
            height: 100,
          },
          "sameSecond"
        );

      // Third Section --------------------------------------------
      this.thirdTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.position,
          {
            x: () => {
              return -this.sizes.width * 0.002;
            },
            z: () => {
              return this.sizes.height * 0.01;
            },
          },
          "sameSecond"
        )
        .to(
          this.room.rotation,
          {
            y: () => {
              return Math.PI * 0.25;
            },
          },
          "sameSecond"
        )
        .to(
          this.room.scale,
          {
            x: 0.7,
            y: 0.7,
            z: 0.7,
          },
          "sameSecond"
        );
      this.projetTimeline = new GSAP.timeline({ paused: true })
        .to(
          this.drawer.position,
          {
            z: () => {
              return -0.63;
            },
            x: () => {
              return 11;
            },
          },
          "openDrawer"
        )
        .to(
          papers.map((paper) => paper.position),
          {
            // move all paper objects
            z: () => {
              return -0.63;
            },
            x: () => {
              return 11;
            },
          },
          "openDrawer"
        )
        .to(this.room.rotation, {
          x: () => {
            return Math.PI * 0.25;
          },
        });

      this.newPaperTimeline = []
      papers.forEach((paper, i) => {
        this.newPaperTimeline[i] = new GSAP.timeline({ paused: true })
          .to(
            papers[i].position,
            {
              y: 15,
              x: 5,
              z: -2,
            },
            "paperZoom"
          )
          .to(
            papers[i].rotation,
            {
              y: -Math.PI * 0.5,
              // x: Math.PI * 0.25,
            },
            "paperZoom"
          )
          .to(
            papers[i].scale,
            {
              y: 4,
              x: 4,
              z: 4,
            },
            "paperZoom"
          );
      });

      this.backPaperTimeline = [];
      papers.forEach((paper, i) => {
        this.backPaperTimeline[i] = new GSAP.timeline({ paused: true })
        .to(
          papers[i].position,
          {
            z: () => {
              return -0.63;
            },
            x: () => {
              return 11;
            },
            y: () => {
              return 1.95;
            },
          },
          "paperUnzoom"
        )
        .to(
          papers[i].rotation,
          {
            y: 0,
          },
          "paperUnzoom"
        )
        .to(
          papers[i].scale,
          {
            y: 0.7,
            x: 0.7,
            z: 0.7,
          },
          "paperUnzoom"
        )
      });

      this.returnTimeline = new GSAP.timeline({ paused: true })
        .to(
          papers.map((paper) => paper.position),
          {
            // move all paper objects
            x: 11.770617485046387,
            y: 1.925641417503357,
            z: -1.318479299545288,
          },
          "drawerClose"
        )
        .to(
          this.drawer.position,
          {
            x: 11.644689559936523,
            y: 1.9924969673156738,
            z: -1.2865962982177734,
          },
          "drawerClose"
        )
        .to(this.room.rotation, {
          x: () => {
            return 0;
          },
        });

      // Fourth Section --------------------------------------------
      this.fourthTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".four-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.room.scale,
          {
            x: 0.09,
            y: 0.09,
            z: 0.09,
          },
          "sameFour"
        )
        .to(
          this.room.rotation,
          {
            y: () => {
              return 0;
            },
          },
          "sameFour"
        )
        .to(
          this.room.position,
          {
            x: () => {
              return -this.sizes.width * 0.001;
            },
            z: () => {
              return 0;
            },
          },
          "sameFour"
        );
    });

    const img = ["my-portfolio.png", "pet.png", "test.png", "test.png"];

    const projet = document.querySelector(".button-projet");
    const fullPage = document.querySelector('#fullpage');
    projet.addEventListener("click", () => {
      window.open("https://matthislesur.com/textures/" + img[this.actualPaper], "_blank")
    });


    // Get a reference to the button element
    const buttonProject = document.querySelector(".project-button");

    // Add a click event listener to the button
    buttonProject.addEventListener("click", async () => {
      this.actualPaper = 0;
      // Call the play() method on the timeline to start the animation
      await this.projetTimeline.restart();
      document.querySelector(".third-section").style.display = "none";
      document.querySelector(".hide").style.display = "block";
      document.querySelector("body").style.overflow = "hidden";
      await this.newPaperTimeline[this.actualPaper].restart();
    });

    const buttonReturn = document.querySelector(".return-button");

    // Add a click event listener to the button
    buttonReturn.addEventListener("click", async () => {
      // Call the play() method on the timeline to start the animation
      if(this.actualPaper >= 0) {
        for(this.actualPaper; this.actualPaper >= 0; this.actualPaper--) {
          await this.backPaperTimeline[this.actualPaper].restart();
        }
      }
      await this.returnTimeline.restart();
      document.querySelector(".third-section").style.display = "block";
      document.querySelector(".hide").style.display = "none";
      document.querySelector("body").style.overflow = "auto";
    });

    const buttonNext = document.querySelector(".next-button");

    // Add a click event listener to the button
    buttonNext.addEventListener("click", async () => {
      if (this.actualPaper < this.resources.nbImages - 1) {
        this.actualPaper++;
        this.newPaperTimeline[this.actualPaper].restart();
      }
    });

    const buttonBack = document.querySelector(".back-button");

    // Add a click event listener to the button
    buttonBack.addEventListener("click", async () => {
      if(this.actualPaper > 0) {
        this.backPaperTimeline[this.actualPaper].restart();
        this.actualPaper--;
      }
y    });

    this.mm.add("(max-width: 968px)", () => {});
  }

  resize() {}

  update() {}
}
