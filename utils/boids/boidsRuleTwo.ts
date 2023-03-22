import { Boid, CustomVector } from './';

/**
 * Get the velocity CustomVector after applying rule two
 *
 * Rule Two:
 *  - Boids try to keep a small distance away from other objects (including other boids). 
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @param VISUAL_RANGE Visual range of the boids
 * @returns CustomVector 
 */
const ruleTwo = (boid: Boid, allBoids: Boid[], VISUAL_RANGE: number): CustomVector => {

	let c = new CustomVector(0, 0);

	// if the boid is not the current boid and the current boid can see it,
	// calculate distance, if less than 25 move current boid away
	allBoids.forEach(b => {
		if(boid.canSee(b, VISUAL_RANGE) && b.getId() !== boid.getId()){
			let distance = b.getPosition().getDistance(boid.getPosition());

			if(distance < 25){
				c.subtractSelf(b.getPosition().subtract(boid.getPosition()));
			}
		}
	});

	return c;
}

export default ruleTwo;
