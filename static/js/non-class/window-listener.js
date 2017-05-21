window.addEventListener('resize', () => {
  main.camera.aspect = window.innerWidth / window.innerHeight;
  main.camera.updateProjectionMatrix();
  main.renderer.setSize(window.innerWidth, window.innerHeight);
}, false)