import { BoidFieldBounds } from "../../types";
import ruleOne from "./boidsRuleOne";
import ruleThree from "./boidsRuleThree";
import ruleTwo from "./boidsRuleTwo";

export const initBoids = (amount: number, bounds: BoidFieldBounds): Boid[] => {
    const boids: Boid[] = [];

    for (let i = 0; i < amount; i++) {
        let x = Math.floor(Math.random() * bounds.x) + 1;
        let y = Math.floor(Math.random() * bounds.y) + 1;
        let xVec = Math.random() < 0.5 ? -3 : 3;
        let yVec = Math.random() < 0.5 ? -3 : 3;
        let boid = new Boid(i + 1, new CustomVector(x, y), new CustomVector(xVec, yVec));
        boids.push(boid);
    }

    return boids;
}

export const moveBoids = (allBoids: Boid[], bounds: BoidFieldBounds, VELOCITY_LIMIT: number, VISUAL_RANGE: number, MOUSE_POSITION: CustomVector, AVOID_MOUSE: boolean): void => {
    const PADDING = 50;

    allBoids.forEach(b => {
        // apply all rules to current Boid
        let v1 = ruleOne(b, allBoids, VISUAL_RANGE);
        let v2 = ruleTwo(b, allBoids, VISUAL_RANGE);
        let v3 = ruleThree(b, allBoids, VISUAL_RANGE);
        let v4 = boundBoid(b, PADDING, bounds.x - PADDING, PADDING, bounds.y - PADDING);

        // set current Boid's velocity to sum of v1,2,3
        let totalV = v1.add(v2.add(v3.add(v4)));

        // avoid predator (mouse)
        if (AVOID_MOUSE) {
            let distanceFromMouse = b.getPosition().getDistance(MOUSE_POSITION);
            if(distanceFromMouse < 175){
                totalV = tendToPlace(b, MOUSE_POSITION).multiplyScalar(-1);
            }
        }

        b.addToVelocity(totalV);

        // limit boid's velocity
        limitVelocity(b, VELOCITY_LIMIT);

        // update current Boid's position with it's new velocity
        b.move();
    });
}

export const drawBoids = (allBoids: Boid[], boidSize: number, canvas: HTMLCanvasElement | null, SHOW_VISUAL_RANGE: boolean, VISUAL_RANGE: number) => {
    // clear
    const ctx = canvas?.getContext('2d');
    if (ctx) {
        ctx.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);

        // add updated shapes
        allBoids.forEach(boid => {
            ctx.beginPath();
            ctx.arc(boid.getPosition().x, boid.getPosition().y, boidSize / 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.closePath();

            if (SHOW_VISUAL_RANGE) {
                ctx.beginPath();
                ctx.arc(boid.getPosition().x, boid.getPosition().y, VISUAL_RANGE / 2, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'transparent';
                ctx.strokeStyle = 'white';
                ctx.fill();
                ctx.stroke();
            }
        });
    }
}

const boundBoid = (boid: Boid, Xmin: number, Xmax: number, Ymin: number, Ymax: number) => {
    let v = new CustomVector(0, 0);
    let boidPosition = boid.getPosition();
    const ENCOURAGE = 20;

    if (boidPosition.x < Xmin) {
        v.x = ENCOURAGE;
    } else if (boidPosition.x > Xmax) {
        v.x = -ENCOURAGE;
    }

    if (boidPosition.y < Ymin) {
        v.y = ENCOURAGE;
    } else if (boidPosition.y > Ymax) {
        v.y = -ENCOURAGE;
    }

    return v;
}

/**
 * Limit a boids x/y velocity
 * 
 * @param boid Boid to limit velocity
 * @param VELOCITY_LIMIT Velocity speed to limit the boid to
 * @returns void
 */
const limitVelocity = (boid: Boid, VELOCITY_LIMIT: number): void => {
    let boidVelocity = boid.getVelocity();

    if (Math.abs(boidVelocity.x) > VELOCITY_LIMIT) {
        let sign = Math.sign(boidVelocity.x);
        boidVelocity.x = sign * VELOCITY_LIMIT;
    }

    if (Math.abs(boidVelocity.y) > VELOCITY_LIMIT) {
        let sign = Math.sign(boidVelocity.y);
        boidVelocity.y = sign * VELOCITY_LIMIT;
    }
}

const tendToPlace = (boid: Boid, place: CustomVector): CustomVector => {
    return place.subtract(boid.getPosition()).divideScalar(100);
}

export class CustomVector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(v: CustomVector): CustomVector {
        return new CustomVector(
            this.x + v.x,
            this.y + v.y
        );
    }

    addSelf(v: CustomVector): void {
        this.x += v.x;
        this.y += v.y;
    }

    subtract(v: CustomVector): CustomVector {
        return new CustomVector(
            this.x - v.x,
            this.y - v.y
        );
    }

    subtractSelf(v: CustomVector): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    divideScalar(s: number): CustomVector {
        return new CustomVector(
            this.x / s,
            this.y / s
        );
    }

    divideScalarSelf(s: number): void {
        this.x /= s;
        this.y /= s;
    }

    multiplyScalar(s: number): CustomVector {
        return new CustomVector(
            this.x * s,
            this.y * s
        )
    }

    getDistance(v: CustomVector): number {
        let xComp = Math.pow(this.x - v.x, 2);
        let yComp = Math.pow(this.y - v.y, 2);

        return Math.abs(Math.sqrt(xComp + yComp));
    }
}

export class Boid {
    private id: number;
    private position: CustomVector;
    private velocity: CustomVector;

    constructor(id: number, positionVector: CustomVector, velocityVector: CustomVector) {
        this.id = id;
        this.position = positionVector;
        this.velocity = velocityVector;
    }

    getId(): number {
        return this.id;
    }

    getPosition(): CustomVector {
        return this.position;
    }

    getVelocity(): CustomVector {
        return this.velocity;
    }

    move(): void {
        this.position.addSelf(this.velocity)
    }

    addToVelocity(vectorToAdd: CustomVector): void {
        this.velocity.addSelf(vectorToAdd);
    }

    canSee(otherBoid: Boid, VISUAL_RANGE: number): boolean {
        return this.getPosition().getDistance(otherBoid.getPosition()) < VISUAL_RANGE;
    }
}