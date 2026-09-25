"""Refine visible link silhouettes after visual comparison with Pudu references."""
import bpy, math
from mathutils import Vector
root=next(o for o in bpy.data.objects if o.name.endswith('_visual_reconstruction'))
wheeled=root.name.startswith('D5-W')
alloy=bpy.data.materials['Silver satin shell']
bright=bpy.data.materials['Machined aluminium']

def loft(name,a,b,widths,thickness,curve,m):
    a,b=Vector(a),Vector(b)
    axis=(b-a).normalized();u=Vector((axis.z,0,-axis.x)).normalized();v=Vector((0,1,0))
    verts=[];sides=24;steps=len(widths)
    for i,w in enumerate(widths):
        t=i/(steps-1);p=a.lerp(b,t)+u*(curve*math.sin(math.pi*t))
        for j in range(sides):
            ang=j*math.tau/sides
            verts.append(p+u*(math.cos(ang)*w)+v*(math.sin(ang)*thickness))
    faces=[tuple(reversed(range(sides))),tuple(range((steps-1)*sides,steps*sides))]
    for i in range(steps-1):
        for j in range(sides):
            k=(j+1)%sides;faces.append((i*sides+j,i*sides+k,(i+1)*sides+k,(i+1)*sides+j))
    mesh=bpy.data.meshes.new(name+'_surface');mesh.from_pydata(verts,[],faces);mesh.update()
    ob=bpy.data.objects.new(name,mesh);bpy.context.scene.collection.objects.link(ob);ob.parent=root
    mesh.materials.append(m)
    for p in mesh.polygons:p.use_smooth=True
    mod=ob.modifiers.new('Continuous link surface','SUBSURF');mod.levels=2;mod.render_levels=2
    return ob

for end,x in [('front',-.245),('rear',.245)]:
    for side,s in [('left',-1),('right',1)]:
        prefix=end+'_'+side
        for suffix in ['_upper_link','_lower_link','_upper_link_shoulder']:
            ob=bpy.data.objects.get(prefix+suffix)
            if ob:bpy.data.objects.remove(ob,do_unlink=True)
        hip=(x,s*.232,.492);knee=(x+.102,s*.232,.302)
        foot=(x-.024,s*.236,.086 if wheeled else .025)
        loft(prefix+'_upper_link',hip,knee,[.040,.047,.045,.037,.028,.021,.018],.021,.006,alloy)
        loft(prefix+'_lower_link',foot,knee,[.018,.019,.015,.014,.015,.016,.016],.016,-.007,bright)

scene=bpy.context.scene
scene.camera.location=(-1.15,-1.05,.68)
scene.camera.rotation_euler=(Vector((0,0,.30))-scene.camera.location).to_track_quat('-Z','Y').to_euler()
scene.camera.data.ortho_scale=1.32
scene.render.resolution_x=1000;scene.render.resolution_y=800
scene.render.image_settings.media_type='IMAGE';scene.render.image_settings.file_format='PNG'
preview=artifacts.file(name=('d5-w' if wheeled else 'd5')+'-reconstruction.png',media_type='image/png')
scene.render.filepath=str(preview.path);bpy.ops.render.render(write_still=True);preview.publish()
# The wide shadow-catching floor is render-only; omit it from the delivered GLB.
floor=bpy.data.objects.get('STUDIO_floor')
if floor:bpy.data.objects.remove(floor,do_unlink=True)
result={'variant':'D5-W' if wheeled else 'D5','refinement':'curved tapered limb shells, lower reference camera','fidelity':'Approximate visual reconstruction, not engineering CAD'}
