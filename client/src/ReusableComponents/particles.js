import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = (props) => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);  
        }).then(() => {
            setInit(true);
            console.log("Particles engine initialized.");
        });
    }, []);

   
    const options = useMemo(() => ({
        background: {
            color: {
                value: "transparent"  
            },
            image: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)", 
            position: "50% 50%",  
            repeat: "no-repeat", 
            size: "cover" 
        },
        fpsLimit: 90,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push"
                },
                onHover: {
                    enable: true,
                    mode: "grab"
                }
            },
            modes: {
                push: {
                    distance: 200,
                    duration: 0.4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: "#FFFFF" 
            },
            links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1
            },
            move: {
                direction: "none",
                enable: true,
                outModes: {
                    default: "bounce"
                },
                random: true,
                speed: 3,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    area: 400  
                },
                value: 40  
            },
            opacity: {
                value: 0.8
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 1, max: 5 }
            }
        },
        detectRetina: true,
    }), []);

    return (
        <Particles id="tsparticles" options={options} style={{ position: 'fixed', width: '100%', height: '100%', zIndex: 0 }} />
    );
};

export default ParticlesComponent;
