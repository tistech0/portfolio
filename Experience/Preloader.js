import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/covertDivsToSpans.js";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
  }

  intro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();
      this.secondTimeline
      .to(document.querySelector(".arrow-svg-wrapper"), {
        opacity: 0,
    })
        .to(document.querySelector(".loader"), {
            opacity: 0,
            onComplete: () => {
                document.querySelector(".loader").style.display = "none";
            },
        })
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "same"
        )
        .to(
          this.roomChildren.introCube.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4,
          },
          "same"
        )
        .to(
          this.roomChildren.introCube.scale,
          {
            x: 75,
            y: 75,
            z: 75,
          },
          "same"
        )
        .to(
          this.roomChildren.introCube.position,
          {
            x: -5.5,
            y: 17,
            z: -2,
          },
          "same"
        )
        .set(this.roomChildren.Cube.scale, {
            x: 1,
            y: 1,
            z: 1,
          })
        .to(
          this.roomChildren.introCube.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
          },
        )
        .to(this.roomChildren.Cube005.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "firstPart")
        .to(this.roomChildren.desk.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "firstPart")
        .to(this.roomChildren.Cabinet.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "firstPart")
        .to(this.roomChildren.bedframe.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "firstPart")
        .to(this.roomChildren.table.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "firstPart")
        .to(this.roomChildren["2"].scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "firstPart")
        .to(this.roomChildren.windowframe1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "firstPart")
        .to(this.roomChildren.windowframe2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "firstPart")
        .to(this.roomChildren.matress.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.Door1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.Door2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.Door3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.Metal.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.Metal2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.Metal3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.chair.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.drawer2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.drawer3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.tv.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.tvScreen.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.Cube003.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.cpu.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.bass.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.monitor.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.monitor_Screen.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.keyboard.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.blinds.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.penholder.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.box1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.box2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.box3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.box4.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.box5.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.cartoy1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.cartoy2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.mouse.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.mousepad.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.cup.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "secondPart")
        .to(this.roomChildren.bedsheets1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.bedsheets2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.pillow.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.b1001.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.b1005.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.b2002.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.b3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.b4004.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.b5.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.b6005.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.b7002.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.dudukna_buku_1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.dudukna_buku_2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.page.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.page2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.page3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.papper4.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.papper5.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.papper6.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.papper7.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.pen1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.pen2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.pen3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.pen4.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.pen5.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.pencil1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.pencil2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.cartoy3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.notebook3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.notebook4.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.notebook5.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.notebook6.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.notebook7.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.speaker1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.speaker2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.speaker3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.speaker4.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.Speaker5.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.bottle1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.bottle2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "thirdPart")
        .to(this.roomChildren.b1002.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b1004.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b1007.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b2001.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b2003.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b3001.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b3002.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b3003.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b3005.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b4001.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b4002.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b4003.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b5001.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b5002.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b5005.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b6001.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b6002.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b6003.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b6004.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b7001.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.b7003.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.dudukna_buku_1001.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.dudukna_buku_1002.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.dudukna_buku_2002.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.dudukna_buku_2003.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.pillow2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.pillow3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.shoe1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.shoe2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.Cube002.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.Cube070.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.Cube075.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.Cube086.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.Cube102.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.Cylinder003.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.bottle3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.headphones.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.charger.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.charger2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.cup2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.umbrella.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.trophy1.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.trophy2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.trophy3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.trophy4.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.modem.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.glass.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.dvd.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.hoodie.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.dice.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.dice2.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.dice3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.bag3.scale, {
            x: 1,
            y: 1,
            z: 1,
        }, "fourPart")
        .to(this.roomChildren.bag2.scale, {
            x: 1,
            y: 1,
            z: 1,
            onComplete: resolve,
        }, "fourPart")
        .to(this.roomChildren.bag2.scale, {
            x: 1,
            y: 1,
            z: 1,
            onComplete: resolve,
        }, "fourPart")
        .to(this.roomChildren.paper1.scale, {
            x: 1,
            y: 1,
            z: 1,
            onComplete: resolve,
        }, "fourPart")
        .to(this.roomChildren.paper2.scale, {
            x: 1,
            y: 1,
            z: 1,
            onComplete: resolve,
        }, "fourPart")
        .to(document.querySelector(".arrow-svg-wrapper"), {
            opacity: 1,
            duration: 1,
        }, "fourPart")
    });
  }

  async playIntro() {
    document.querySelector("body").style.overflow = "hidden";
    await this.intro();
    this.emit("enablecontrols");
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }

    if (this.scaleFlag) {
      this.scale();
    }
  }
}
