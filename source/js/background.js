window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);

        scene.clearColor = new BABYLON.Color3(0.0, 0.0, 0.0);

        var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 0, -15), scene);
        camera.setTarget(BABYLON.Vector3.Zero());
        camera.attachControl(canvas, false);

        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 0, -10), scene);
        light.diffuse = new BABYLON.Color3(0, 0, 0);
        light.specular = new BABYLON.Color3(0, 0.3, 0.4);

        var light2 = new BABYLON.HemisphericLight('light2', new BABYLON.Vector3(0, -10, 0), scene);
        light2.diffuse = new BABYLON.Color3(0, 0, 0);
        light2.specular = new BABYLON.Color3(0, 0.3, 0.4);

        var planeMaterial = generateMirrorMaterial(scene);

        planes(scene, planeMaterial);

        return scene;
    }
    var scene = createScene();

    engine.runRenderLoop(function () {
        var deltaTime = engine.getDeltaTime();

        scene.render();
    });

    window.addEventListener('resize', function () {
        engine.resize();
    });
});

// Planes prototype
function planes (scene, material)
{
    var animationDuration = 2000;
    this.mesh = [
        new BABYLON.Mesh.CreateBox("box01", 20.0, scene),
        new BABYLON.Mesh.CreateBox("box02", 20.0, scene),
        new BABYLON.Mesh.CreateBox("box03", 20.0, scene)
    ];

    mesh[0].position.x -= 15;
    mesh[2].position.x += 15;

    mesh[1].rotation.x += 42;

    this.animation = [
        new BABYLON.Animation("planeAni01", "rotation.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE),
        new BABYLON.Animation("planeAni01", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE),
        new BABYLON.Animation("planeAni01", "rotation.y", -30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE)
    ];

    this.upAniKeys = [];
    upAniKeys.push({
        frame: 0,
        value: 1
    });

    upAniKeys.push({
        frame: animationDuration,
        value: 3
    });

    this.downAniKeys = [];
    downAniKeys.push({
        frame: 0,
        value: 0
    });

    downAniKeys.push({
        frame: animationDuration,
        value: -Math.PI
    });

    animation[0].setKeys(upAniKeys);
    animation[1].setKeys(upAniKeys);
    animation[2].setKeys(upAniKeys);

    mesh[0].animations.push(animation[0]);
    mesh[1].animations.push(animation[1]);
    mesh[2].animations.push(animation[2]);

    
    scene.beginAnimation(mesh[0], 0, animationDuration, true);
    scene.beginAnimation(mesh[1], 0, animationDuration, true);
    scene.beginAnimation(mesh[2], 0, animationDuration, true);
    /* */
    mesh[0].material = material;
    mesh[1].material = material;
    mesh[2].material = material;

    // move the middle out
    mesh[1].position.z = 10;
}

function generateMirrorMaterial (scene)
{
    var mirrorMat = new BABYLON.StandardMaterial('mirror material', scene);
    mirrorMat.alpha = 0.5;
    mirrorMat.backFaceCulling = true;
    mirrorMat.specularPower = 32;

    return mirrorMat;
}