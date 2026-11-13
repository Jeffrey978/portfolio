# Blender 3D Model Directory

Place your exported 3D files in this folder for seamless rendering on your portfolio.

### Supported formats:
- `.glb` (glTF Binary - **Recommended**)
- `.gltf` (JSON + Bin)

### Recommended Blender Export Settings:
1. **Format**: glTF Binary (`.glb`)
2. **Transform**: +Y Up
3. **Geometry**:
   - Apply Modifiers: Checked
   - UVs, Normals, Tangents: Checked
4. **Animation**: Included if animated (idle loops, rotations)
5. **Compression**: Draco mesh compression (optional for smaller payloads)

Save as `public/models/portfolio-scene.glb` or your chosen model name to view it directly in the interactive 3D studio viewport.
