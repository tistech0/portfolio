import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};
        this.numProject = this.resources.nbImages;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;
            if(child instanceof THREE.Group) {
                child.children.forEach((grandChild) => {
                    grandChild.castShadow = true;
                    grandChild.receiveShadow = true;
                })
            }
            if(child.name === "monitor_Screen") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.code,
                });
            }
            if(child.name === "tvScreen") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
            child.scale.set(0, 0, 0);
            if(child.name === "page001") {
                this.paper001 = child.clone();
            }
            if (child.name === "introCube") {
                child.scale.set(8, 8, 8);
                child.position.set(0, 1, 0);
            }
            if (child.name !== "page001")
                this.roomChildren[child.name] = child;
        });

        for (let i = 1; i <= this.numProject; i++) {
            const projectMaterial = new THREE.MeshBasicMaterial({
                map: this.resources.items['projet' + i],
                transparent: false, // Désactivez la transparence
            });
            const newPaper = this.paper001.clone();
            newPaper.name = 'paper' + i;
            newPaper.material = projectMaterial;
            this.roomChildren[newPaper.name] = newPaper;
            this.actualRoom.add(newPaper);
        }

        this.actualRoom.position.set(0, 0, 0);
        this.actualRoom.scale.set(0.09, 0.09, 0.09);
        this.scene.add(this.actualRoom);

        const widthHexaLight = 0.8;
        const heightHexaLight = 0.5;
        const intensityHexaLight = 4;
        this.hexaLight = new THREE.RectAreaLight( 0xffffff, intensityHexaLight,  widthHexaLight, heightHexaLight );
        this.hexaLight.position.set( -22, 22, -6 );
        this.hexaLight.rotation.y = -Math.PI * 0.75;
        this.actualRoom.add( this.hexaLight );
        this.roomChildren["hexalight"] = this.hexaLight;        

        const width = 0.25;
        const height = 0.25;
        const intensity = 15;
        this.circleLight = new THREE.RectAreaLight( 0x0FF08, intensity,  width, height );
        this.circleLight.position.set( 10, 17.7, -7);
        this.circleLight.rotation.y = Math.PI * 0.75;
        this.actualRoom.add( this.circleLight );
        this.roomChildren["circlelight"] = this.circleLight;        

        this.triangleleLight = new THREE.RectAreaLight( 0xFFA200, intensity,  width, height );
        this.triangleleLight.position.set( 12, 17.7, -5);
        this.triangleleLight.rotation.y = Math.PI * 0.75;
        this.actualRoom.add( this.triangleleLight );
        this.roomChildren["trianglelight"] = this.triangleLight;        

        this.crossleLight = new THREE.RectAreaLight( 0x0033FF, intensity,  width, height );
        this.crossleLight.position.set( 12, 15.3, -5);
        this.crossleLight.rotation.y = Math.PI * 0.75;
        this.actualRoom.add( this.crossleLight );
        this.roomChildren["crosslight"] = this.crossLight;        

        this.squareLight = new THREE.RectAreaLight( 0xDC00FF, intensity,  width, height );
        this.squareLight.position.set( 10, 15.3, -7);
        this.squareLight.rotation.y = Math.PI * 0.75;
        this.actualRoom.add( this.squareLight );
        this.roomChildren["squarelight"] = this.squareLight;        

        // const squareleLightHelper = new RectAreaLightHelper( this.squareLight );
        // this.squareLight.add( squareleLightHelper );
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.05;
        });
    }

    resize() {}

    update() {
        // this.lerp.current = GSAP.utils.interpolate(
        //     this.lerp.current,
        //     this.lerp.target,
        //     this.lerp.ease
        // );
        // this.actualRoom.rotation.y = this.lerp.current;
    }
}
