import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

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
        // Every mesh receives shadows, but only the large ones cast them:
        // small props (pens, books, dice...) would add draw calls to the
        // shadow pass for shadows nobody can see.
        this.actualRoom.traverse((object) => {
            if (!object.isMesh) return;
            object.receiveShadow = true;
            object.geometry.computeBoundingSphere();
            const scale = object.scale.x;
            object.castShadow = object.geometry.boundingSphere.radius * scale > 2;
        });

        this.actualRoom.children.forEach((child) => {
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
