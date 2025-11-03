    <script>
        // Set up scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('3DModel').appendChild(renderer.domElement);

        // Add ambient light and directional light
        const light = new THREE.AmbientLight(0x404040);
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0x00ff00, 1);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        // Set up OBJ loader
        const objLoader = new THREE.OBJLoader();

        objLoader.load('head1.obj', function (head) {
            // Apply a default material (you can change the color or texture)
            head.traverse(function (child) {
                if (child.isMesh) {
                    child.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color for the head
                }
            });

            scene.add(head);
            head.position.set(0, 0, 0);  // Center the head
            head.scale.set(1, 1, 1);     // Adjust the scale
            animate();
        }, undefined, function (error) {
            console.error(error);
        });

        // Camera position
        camera.position.z = 5;

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        // Speech synthesis functionality
        document.getElementById('playButton').addEventListener('click', function () {
            const speech = new SpeechSynthesisUtterance("Hello, I am your AI robot's head. How can I assist you?");
            window.speechSynthesis.speak(speech);
        });

        // Emotion-based changes (simple color change for demonstration)
        document.getElementById('emotion').addEventListener('change', function () {
            const emotion = this.value;
            const head = scene.children[1]; // Assuming the head is the second object in the scene
            switch (emotion) {
                case 'happy':
                    head.material.color.set(0x00ff00); // Green for happy
                    break;
                case 'sad':
                    head.material.color.set(0x0000ff); // Blue for sad
                    break;
                case 'angry':
                    head.material.color.set(0xff0000); // Red for angry
                    break;
            }
        });
        // The robot model's mouth and eyes mesh
    let mouth = robotMesh.getObjectByName("mouth");
    let leftEye = robotMesh.getObjectByName("leftEye");
    let rightEye = robotMesh.getObjectByName("rightEye");
    </script>