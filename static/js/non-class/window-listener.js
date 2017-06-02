window.addEventListener('resize', () => {
  main.camera.aspect = document.documentElement.clientWidth / document.documentElement.clientHeight;
  main.camera.updateProjectionMatrix();
  main.renderer.setSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
}, false)