import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import NavDrawer from "../../components/NavDrawer";
import PageTitle from "../../components/PageTitle";
import ProjectsDrawer from "../../components/ProjectsDrawer";
import { BoidFieldBounds } from "../../types";
import { Boid, CustomVector, drawBoids, initBoids, moveBoids } from "../../utils/boids";

let boids: Boid[] = [];
let mousePosition = new CustomVector(0, 0);

const Boids = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fieldRef = useRef<HTMLDivElement>(null);
    const [bounds, setBounds] = useState<BoidFieldBounds | null>(null);
    const [params, setParams] = useState({
        NUM_BOIDS: 50,
        VELOCITY_LIMIT: 6,
        VISUAL_RANGE: 75,
        AVOID_MOUSE: false
    });

    useEffect(() => {
        const updateBounds = () => {
            if (fieldRef.current) {
                setBounds({
                    x: fieldRef.current.offsetWidth - 10,
                    y: fieldRef.current.offsetHeight - 10
                });
            }
        }

        const updateMousePosition = (e: MouseEvent) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        }

        updateBounds();
        window.addEventListener('resize', updateBounds);
        window.addEventListener('mousemove', updateMousePosition)

        return () => {
            window.removeEventListener('resize', updateBounds);
            window.removeEventListener('mousemove', updateMousePosition);
        }
    }, [])

    useEffect(() => {
        if (bounds) {
            if (boids.length !== params.NUM_BOIDS) boids = initBoids(params.NUM_BOIDS, bounds);

            const timer = setInterval(() => {
                moveBoids(boids, bounds, params.VELOCITY_LIMIT, params.VISUAL_RANGE, mousePosition, params.AVOID_MOUSE);
                drawBoids(boids, 10, canvasRef.current);
            }, 30);

            return () => clearInterval(timer);
        }
    }, [bounds, params]);

    return (
        <ProjectsDrawer>
            <NavDrawer>
                <PageTitle title="Boids" />
                <NavBar />
                <div className="h-14 px-4 bg-transparent flex justify-center items-center gap-x-2">
                    <label htmlFor="boids-modal" className="btn btn-sm text-xl">?</label>
                    <label className="text-center">Avoid Mouse:</label>
                    <input type="checkbox" className="toggle" checked={params.AVOID_MOUSE} onChange={() => setParams({ ...params, AVOID_MOUSE: !params.AVOID_MOUSE })} />
                    <label className="text-center">{params.NUM_BOIDS} boids:</label>
                    <input type="range" min="50" max="250" value={params.NUM_BOIDS} className="range w-40" step="50" onChange={e => setParams({ ...params, NUM_BOIDS: parseInt(e.target.value) })} />
                </div>
                <div ref={fieldRef} className="h-full w-full">
                    <canvas ref={canvasRef} height={bounds?.y} width={bounds?.x} />
                </div>
                <Footer />
                <input type="checkbox" id="boids-modal" className="modal-toggle" />
                <label htmlFor="boids-modal" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                        <h3 className="text-lg font-bold">What is this?</h3>
                        <p className="py-4">
                            This is an implementation of the <a className="link" href="https://en.wikipedia.org/wiki/Boids" target="_blank">boids</a> algorithm using the pseudocode found <a className="link" href="https://vergenet.net/~conrad/boids/pseudocode.html" target="_blank">here</a>.
                        </p>
                        <p className="mb-2">The boids (NYC speak for "birds") will move based on the following three rules:</p>
                        <ul className="list-disc list-inside mb-2">
                            <li>Don't crowd nearby boids</li>
                            <li>Go in the same direction of nearby boids</li>
                            <li>Go towards the center of mass of nearby boids</li>
                        </ul>
                        <p className="mb-2">These three rules result in a simulation of flocking behavior in birds. Increase the number of boids to see bigger flocks!</p>
                        <p className="mb-6">Boids will move back into view on window / screen resize.</p>
                        <div className="divider" />
                        <small>I originally implmented the algorithm in <a className="link" href="https://github.com/Walrussuit101/boids" target="_blank">this repository</a>, which I ported to this page.</small>
                    </label>
                </label>
            </NavDrawer>
        </ProjectsDrawer>
    )
}

export default Boids;