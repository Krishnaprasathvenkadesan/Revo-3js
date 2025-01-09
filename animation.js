let scene, camera, renderer;
let geometries = [];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('background-animation'),
        antialias: true,
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;

    // Create multiple geometric shapes
    for(let i = 0; i < 15; i++) {
        let geometry;
        const random = Math.random();
        
        if(random < 0.33) {
            geometry = new THREE.IcosahedronGeometry(Math.random() * 0.5 + 0.1);
        } else if(random < 0.66) {
            geometry = new THREE.OctahedronGeometry(Math.random() * 0.5 + 0.1);
        } else {
            geometry = new THREE.TetrahedronGeometry(Math.random() * 0.5 + 0.1);
        }

        const material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(`hsl(${Math.random() * 360}, 50%, 50%)`),
            wireframe: true
        });

        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );

        geometries.push({
            mesh: mesh,
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            }
        });
        
        scene.add(mesh);
    }

    // Add lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
}

function animate() {
    requestAnimationFrame(animate);

    geometries.forEach(item => {
        item.mesh.rotation.x += item.rotationSpeed.x;
        item.mesh.rotation.y += item.rotationSpeed.y;
        item.mesh.rotation.z += item.rotationSpeed.z;
    });

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
animate(); 