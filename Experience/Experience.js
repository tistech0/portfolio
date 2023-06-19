import * as THREE from "three";

import asset from "./Utils/assets";
import Size from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";

import World from "./World/World";
import Controls from "./World/Controls";

import Camera from "./Camera";
import Renderer from "./Renderer";
import Theme from "./Theme";
import Preloader from "./Preloader";

export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Size();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(asset);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        this.preloader.on("enablecontrols", () => {
            document.querySelector("body").style.overflow = "auto";
            this.controls = new Controls();
        });

        this.sizes.on("resize", () => {
            this.resize();
        });

        this.time.on("update", () => {
            this.update();
        });
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.camera.update();
        this.renderer.update();
        this.world.update();
    }
}
