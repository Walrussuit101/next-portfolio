import { Boid, CustomVector } from './';

/**
 * Get the velocity CustomVector after applying rule three
 *
 * Rule Three:
 *  - Boids try to match velocity with near boids.
 *
 * @param boid Boid to apply the rule to
 * @param allBoids All the current boids
 * @param VISUAL_RANGE Visual range of the boids
 * @returns CustomVector
 */
const ruleThree = (boid: Boid, allBoids: Boid[], VISUAL_RANGE: number): CustomVector => {
	
	let v = new CustomVector(0, 0);
	let numNeighbors = 0;

	// create a new velocity based on all other boids' (that are visible & not the current boid) velocities
	allBoids.forEach(b => {
		if(boid.canSee(b, VISUAL_RANGE) && b.getId() !== boid.getId()){
			v.addSelf(b.getVelocity());
			numNeighbors++;
		}
	});

	// if there are neighboring boids, update matched velocity
	// otherwise return 0,0 CustomVector
	if(numNeighbors){
		v.divideScalarSelf(numNeighbors);

		v.subtractSelf(boid.getVelocity());
		v.divideScalarSelf(4);

		return v;
	}
	
	return new CustomVector(0, 0);	
}

export default ruleThree;
