var example = (function () {
	'use strict';

	var scene = new THREE.Scene(),
		renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
		light = new THREE.AmbientLight(0xffffff),
		camera,
		monkey;

	function initScene() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('webGL-container').appendChild(renderer.domElement);

		scene.add(light);

		camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			1,
			1000
		);
		camera.position.z = 5;
		scene.add(camera);

		var loader = new THREE.JSONLoader();
		loader.load("./src/monkey.json", function (geometry, materials) {

			materials = new THREE.MeshBasicMaterial({
				color: 0xFF0000,
				wireframe: true
			});

			monkey = new THREE.Mesh(geometry, materials);
			scene.add(monkey);
			render();
		});
	}

	function render() {
		monkey.rotation.y +=0.01;

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	window.onload = initScene;

	return {
		scene: scene
	}
}());