"""Editable visual reconstruction, NOT manufacturer CAD.

Run in Blender / Higgsfield 3D Jutsu. All coordinates in metres.
References and uncertainty: docs/3d/d5/README.md.
Set WHEELED=False for the D5 reference pose. No inferred locomotion.
"""
import bpy
import math
from mathutils import Vector

WHEELED = globals().get('WHEELED', True)
VARIANT = 'D5-W' if WHEELED else 'D5'
for obj in list(bpy.data.objects):
    bpy.data.objects.remove(obj, do_unlink=True)
scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 1000
scene.render.resolution_y = 800
scene.render.resolution_percentage = 100
scene.render.image_settings.media_type = 'IMAGE'
scene.render.image_settings.file_format = 'PNG'
scene.render.fps = 24
scene.frame_start = 1
scene.frame_end = 1
scene.world = bpy.data.worlds.new('Studio ambient')
scene.world.use_nodes = True
scene.world.node_tree.nodes['Background'].inputs['Color'].default_value = (.76,.80,.88,1)
scene.world.node_tree.nodes['Background'].inputs['Strength'].default_value = .45

def mat(name, color, metal=0, rough=.35):
    m=bpy.data.materials.new(name); m.use_nodes=True
    p=m.node_tree.nodes.get('Principled BSDF')
    p.inputs['Base Color'].default_value=(*color,1)
    p.inputs['Metallic'].default_value=metal
    p.inputs['Roughness'].default_value=rough
    m.diffuse_color=(*color,1)
    return m
alloy=mat('Silver satin shell',(.58,.61,.63),.65,.29)
bright=mat('Machined aluminium',(.71,.73,.74),.8,.25)
dark=mat('Graphite recesses',(.045,.052,.057),.4,.36)
rubber=mat('Black rubber',(.026,.029,.032),.02,.65)
glass=mat('Optical sensor glass',(.012,.020,.024),.55,.12)
red=mat('Red stop button',(.6,.023,.015),.05,.36)
cyan=mat('Status strip',(.01,.65,.75),.15,.24)
floor_mat=mat('Studio floor',(.78,.8,.84),0,.65)
root=bpy.data.objects.new(VARIANT+'_visual_reconstruction',None)
scene.collection.objects.link(root)
root['provenance']='Reconstructed from official Pudu imagery; not CAD or an engineering model'
root['uncertain']='Hidden rear, underside and internal geometry simplified; visible geometry approximate'

def finish(o,name,m,parent=True):
    o.name=name
    if m: o.data.materials.append(m)
    if parent: o.parent=root
    if o.type=='MESH':
        for p in o.data.polygons:p.use_smooth=True
    return o
def box(name,loc,size,m,bevel=.005,parent=True):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc)
    o=bpy.context.object; o.dimensions=size
    bpy.ops.object.transform_apply(location=False,rotation=False,scale=True)
    finish(o,name,m,parent)
    if bevel:
        b=o.modifiers.new('Rounded manufactured edges','BEVEL'); b.width=bevel;b.segments=3
        o.modifiers.new('Surface normals','WEIGHTED_NORMAL')
    return o
def cyl(name,loc,radius,depth,m,axis='Y',vertices=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices,radius=radius,depth=depth,location=loc)
    o=bpy.context.object
    if axis=='Y':o.rotation_euler[0]=math.pi/2
    elif axis=='X':o.rotation_euler[1]=math.pi/2
    finish(o,name,m)
    b=o.modifiers.new('Edge fillet','BEVEL');b.width=min(.003,depth/5);b.segments=2
    o.modifiers.new('Surface normals','WEIGHTED_NORMAL')
    return o
def sphere(name,loc,scale,m):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32,ring_count=16,location=loc)
    o=bpy.context.object;o.scale=scale
    return finish(o,name,m)
def rod(name,a,b,r1,r2,m):
    a,b=Vector(a),Vector(b);d=b-a
    bpy.ops.mesh.primitive_cone_add(vertices=24,radius1=r1,radius2=r2,depth=d.length,location=(a+b)/2)
    o=bpy.context.object;o.rotation_euler=d.to_track_quat('Z','Y').to_euler()
    return finish(o,name,m)
def beam(name,a,b,width,depth,m):
    a,b=Vector(a),Vector(b);d=b-a
    o=box(name,(a+b)/2,(width,depth,d.length),m,min(width/3,.012))
    o.rotation_euler=d.to_track_quat('Z','Y').to_euler()
    return o
def ring(name,loc,radius,tube,m):
    bpy.ops.mesh.primitive_torus_add(major_segments=48,minor_segments=10,location=loc,major_radius=radius,minor_radius=tube)
    o=bpy.context.object;o.rotation_euler[0]=math.pi/2
    return finish(o,name,m)

# Compact octagonal body: silhouette follows the top-view official render.
outline=[(-.35,-.055),(-.29,-.095),(-.20,-.145),(.19,-.145),(.29,-.095),(.35,-.055),(.35,.055),(.29,.095),(.19,.145),(-.20,.145),(-.29,.095),(-.35,.055)]
verts=[(x,y,z) for z in (.420,.564) for x,y in outline]
n=len(outline);faces=[tuple(reversed(range(n))),tuple(range(n,2*n))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
mesh=bpy.data.meshes.new('Upper shell mesh');mesh.from_pydata(verts,[],faces);mesh.update()
o=bpy.data.objects.new('01_body_shell',mesh);scene.collection.objects.link(o);finish(o,o.name,alloy)
b=o.modifiers.new('Shell edge radius','BEVEL');b.width=.024;b.segments=5;o.modifiers.new('Shell normals','WEIGHTED_NORMAL')
box('02_belly_panel',(0,0,.420),(.51,.25,.024),dark,.012)
box('03_top_service_panel',(-.012,0,.566),(.36,.235,.007),bright,.018)
for i in range(13):
    box('top_cooling_slot_%02d'%i,(-.105+i*.016,0,.571),(.002,.156,.002),dark,.001)
for y in [-.102,.102]:
    for x in [-.165,.145]:cyl('top_fastener',(x,y,.572),.003,.002,dark,'Z',12)
# Top carry recesses and status details that are visible in official references.
for x in [-.265,.263]:
    box('carry_recess', (x,0,.551),(.065,.12,.019),dark,.01)
    box('carry_bridge',(x,0,.565),(.025,.122,.014),alloy,.006)
cyl('stop_button_mount',(.083,-.144,.537),.017,.007,dark,'Y')
cyl('stop_button',(.083,-.151,.537),.011,.010,red,'Y')
for sign in [-1,1]:
    y=sign*.146
    box('side_recess_'+str(sign),(.014,y,.485),(.13,.003,.035),dark,.006)
    box('side_status_'+str(sign),(.096,y*1.008,.49),(.020,.002,.003),cyan,.001)
    for x in [.126,.14,.154,.168]:
        box('side_cooling_slot',(x,y,.48),(.004,.002,.047),dark,.002)
# The front sensor stack is observed. Back face remains intentionally plain.
box('front_optical_surround',(-.35,0,.49),(.018,.107,.137),bright,.024)
box('front_optical_dark_insert',(-.360,0,.492),(.009,.083,.111),dark,.025)
cyl('front_lidar_bezel',(-.368,0,.514),.036,.01,bright,'X')
sphere('front_lidar_glass',(-.379,0,.514),(.015,.032,.032),glass)
for a in [math.pi/4,-math.pi/4]:
    o=box('visible_sensor_diagonal',(-.391,0,.514),(.002,.05,.005),dark,.001);o.rotation_euler[0]=a
cyl('front_camera_bezel',(-.367,0,.451),.011,.008,bright,'X')
cyl('front_camera_lens',(-.373,0,.451),.007,.004,glass,'X')
box('rear_plain_unverified_panel',(.35,0,.488),(.012,.09,.095),alloy,.016)

# Four motor pods, upper links, knees, lower links. Presentation pose only.
for end,x in [('front',-.245),('rear',.245)]:
    for side,s in [('left',-1),('right',1)]:
        prefix=end+'_'+side
        hip=(x,s*.230,.492);knee=(x+.102,s*.232,.302)
        foot=(x-.024,s*.236,.086 if WHEELED else .025)
        for index,(yc,r,depth,m) in enumerate([(.165,.060,.060,alloy),(.187,.055,.010,dark),(.199,.059,.015,bright),(.21,.061,.008,alloy)]):
            cyl(prefix+'_motor_'+str(index),(x,s*yc,.492),r,depth,m)
        # Narrow grooves around motor housings, using shared circular appearance.
        for yy in [.15,.166,.179]:ring(prefix+'_motor_groove',(x,s*yy,.492),.06,.0015,dark)
        for angle in [-.8,0,.8]:
            box(prefix+'_motor_vent',(x+.042*math.sin(angle),s*.181,.535),(.010,.027,.006),dark,.002)
        cyl(prefix+'_shoulder_cover',hip,.064,.035,alloy)
        cyl(prefix+'_shoulder_inset',(x,s*.250,.492),.048,.002,bright)
        # Sculpted tapered broad upper arm between shoulder and knee.
        beam(prefix+'_upper_link',hip,knee,.071,.032,alloy)
        sphere(prefix+'_upper_link_shoulder',hip,(.062,.020,.062),alloy)
        cyl(prefix+'_knee',knee,.025,.042,bright)
        cyl(prefix+'_knee_fastener',(knee[0],s*.255,knee[2]),.009,.004,dark,vertices=12)
        # Visible inside rail and external lower link; no simulated joints or gait.
        beam(prefix+'_inner_upper_rail',(x+.012,s*.210,.445),(knee[0]-.012,s*.210,.315),.022,.013,dark)
        rod(prefix+'_lower_link',foot,knee,.019,.015,bright)
        for t in [.26,.48,.70]:
            q=Vector(foot).lerp(Vector(knee),t)
            cyl(prefix+'_link_fastener',(q.x,s*.255,q.z),.003,.003,dark,vertices=12)
        if WHEELED:
            wheel=(foot[0],s*.25,foot[2])
            cyl(prefix+'_tire',wheel,.086,.043,rubber,vertices=64)
            ring(prefix+'_sidewall',(wheel[0],s*.273,wheel[2]),.073,.009,rubber)
            cyl(prefix+'_wheel_inner_disc',(wheel[0],s*.249,wheel[2]),.058,.045,dark)
            ring(prefix+'_alloy_rim',(wheel[0],s*.274,wheel[2]),.067,.003,bright)
            cyl(prefix+'_wheel_hub',(wheel[0],s*.279,wheel[2]),.022,.008,alloy)
            for k in range(12):
                a=k*math.tau/12
                start=(wheel[0]+.021*math.cos(a),s*.276,wheel[2]+.021*math.sin(a))
                stop=(wheel[0]+.063*math.cos(a+.21),s*.276,wheel[2]+.063*math.sin(a+.21))
                rod(prefix+'_spoke_'+str(k),start,stop,.003,.0025,bright)
            # Tire tread is an approximate visual treatment, not an exact mold.
            for k in range(56):
                a=k*math.tau/56
                ob=box(prefix+'_tread_'+str(k),(wheel[0]+.0845*math.sin(a),wheel[1],wheel[2]+.0845*math.cos(a)),(.002,.045,.002),dark,.0005)
                ob.rotation_euler[1]=a
            cyl(prefix+'_inner_motor_cap',(wheel[0],s*.216,wheel[2]),.045,.016,alloy)
        else:
            sphere(prefix+'_rubber_foot',foot,(.021,.022,.025),rubber)

# Match stated overall envelope. Proportions within it are visually estimated.
bpy.context.view_layer.update()
points=[o.matrix_world @ Vector(c) for o in root.children if o.type=='MESH' for c in o.bound_box]
mins=Vector([min(p[i] for p in points) for i in range(3)])
maxs=Vector([max(p[i] for p in points) for i in range(3)])
envelope=maxs-mins
root.scale=(.900/envelope.x,.543/envelope.y,.572/envelope.z)
root.location.z=-mins.z*root.scale.z
root['stated_envelope_m']=[.900,.543,.572]
root['not_for']='manufacturing, engineering, clearance or spare-part compatibility decisions'
# A neutral studio setup for renders; the web viewer selects only the robot root.
box('STUDIO_floor',(0,0,-.016),(200,200,.03),floor_mat,.002,False)
def light(name,loc,power,color,size):
    data=bpy.data.lights.new(name,'POINT');data.energy=power;data.color=color;data.shadow_soft_size=size
    o=bpy.data.objects.new(name,data);scene.collection.objects.link(o);o.location=loc
light('STUDIO_key',(-1.2,-1.4,2),210,(1,.97,.92),.7)
light('STUDIO_fill',(-.3,1,1.3),110,(.84,.90,1),.7)
light('STUDIO_rim',(1.2,.5,1.5),180,(1,1,1),.55)
camdata=bpy.data.cameras.new('Delivery camera');cam=bpy.data.objects.new('STUDIO_camera',camdata);scene.collection.objects.link(cam)
cam.location=(-1.15,-1.05,.82);target=Vector((0,0,.30));cam.rotation_euler=(target-cam.location).to_track_quat('-Z','Y').to_euler();camdata.type='ORTHO';camdata.ortho_scale=1.36;scene.camera=cam
scene.view_settings.view_transform='AgX'
bpy.context.view_layer.update()
if 'artifacts' in globals():
    preview=artifacts.file(name=VARIANT.lower()+'-reconstruction.png',media_type='image/png')
    scene.render.filepath=str(preview.path);bpy.ops.render.render(write_still=True);preview.publish()
result={'variant':VARIANT,'object_count':len(root.children),'envelope_m':[.900,.543,.572],'fidelity':'visual approximation; not manufacturer CAD','animation':'none; orbit is presentation only'}
