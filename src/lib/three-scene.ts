import * as THREE from 'three';

const PARTICLE_COUNT = 800;
const GOLD_COLOR = new THREE.Color(0xd4be8a);

export class ThreeScene {
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private particles: THREE.Points | null = null;
  private animFrameId: number | null = null;
  private startTime = 0;

  public init(canvas: HTMLCanvasElement): void {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height, false);

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
    this.camera.position.z = 50;

    // Particles
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      color: GOLD_COLOR,
      size: 0.6,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    this.startTime = performance.now();
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);

    this.animate();
  }

  private handleResize(): void {
    if (!this.renderer || !this.camera || !this.particles) return;
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  public animate(): void {
    this.animFrameId = requestAnimationFrame(() => this.animate());
    if (!this.renderer || !this.scene || !this.camera || !this.particles) return;

    const elapsed = (performance.now() - this.startTime) * 0.0004;
    this.particles.rotation.y = elapsed * 0.06;
    this.particles.rotation.x = elapsed * 0.03;

    // Gentle float
    const positions = this.particles.geometry.attributes['position'] as THREE.BufferAttribute;
    const arr = positions.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 1]! += Math.sin(elapsed + i * 0.1) * 0.003;
    }
    positions.needsUpdate = true;

    this.renderer.render(this.scene, this.camera);
  }

  public destroy(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    window.removeEventListener('resize', this.handleResize);
    if (this.particles) {
      this.particles.geometry.dispose();
      (this.particles.material as THREE.PointsMaterial).dispose();
    }
    this.renderer?.dispose();
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.particles = null;
  }
}
