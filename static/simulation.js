
var scene;
var camera;
var cube;
var sphere;
var renderer;
var objects = [];
var controls;
var conbineGeo = new THREE.Geometry();
var combineMesh;
var mouse = new THREE.Vector2(), INTERSECTED;
var raycaster;
var precolor;
var theaxis;
var angle = 1;
var whetherchange = false;
var whetherclick = false;
var zoomin = false;
var zoomout = false
var inicamera;
var curTxt=document.createElement('div');
document.body.appendChild(curTxt);

var datanum = 1285;

$.getJSON('/static/emoji_json_withname.json',function(data){
   init();

   renderer.setSize( window.innerWidth, window.innerHeight );
   document.getElementById("container").appendChild( renderer.domElement );
   //scene.add( cube );
   //scene.add( sphere );
   //scene.add( conbineMesh );
   //combineMesh.setColor(0x00ddaa);
   camera.position.z = 7;
   camera.position.x = 7
    camera.position.y = 7

   renderer.setClearColor( 0xffffff );
  var stats = new Stats();
  //container.appendChild( stats.dom );
  //  var newbutton = document.createElement('div');
  //  document.body.appendChild(newbutton);
  // newbutton.innerHTML="sdkusdhgfkusbfkusbfsbfdsbf,sdbfsfjksbfhlaijl";



   render();
 



   function init(){


   scene = new THREE.Scene();
   camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
   //camera.position.z = 1000;
   var axes = new THREE.AxisHelper(1);
   scene.add(axes);
   inicamera = camera;

    renderer = new THREE.WebGLRenderer();
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ddaa } );

    // add the control
   controls = new THREE.TrackballControls( camera );
   controls.rotateSpeed = 1.5;
   controls.zoomSpeed = 1.2;
   controls.panSpeed = 0.8;
   controls.noZoom = false;
   controls.noPan = false;

   controls.minDistance = 0.1;

   controls.staticMoving = true;
   controls.dynamicDampingFactor = 0.3;
   scene.add( new THREE.AmbientLight( 0x555555 ) );
   var pointLight = new THREE.PointLight(0XFFFFFF);

    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z = 150;

    // controls.enabled = false;


    scene.add( pointLight );

   //var geo = new THREE.SphereGeometry(1, 1, 1);

   //circle = new THREE.Mesh( geo, material);
   var radius = 0.04, segemnt = 10, rings = 10;

    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
    var material = new THREE.MeshBasicMaterial({ color: 0x0030ff, opacity: 0.5, transparent: true} );



    var matrix = new THREE.Matrix4();
   // sphere = new THREE.Mesh(
    //         new THREE.SphereGeometry(radius,segemnt,rings),
    //          defaultMaterial
    //      );

    var sphereGeo = new THREE.SphereGeometry(radius,segemnt,rings);
    let xbar=0;
    let ybar=0;
    let zbar=0;

    for (let i = 1; i <= datanum; i++){
      xbar+=parseFloat(data[i].x);
      ybar+=parseFloat(data[i].y);
      zbar+=parseFloat(data[i].z);
  
      
    }
  

    xbar/=datanum; 
    ybar/=datanum;
    zbar/=datanum;

    

    for (var i = 1; i <= datanum ; i++){
      // var object;
      // if (i == 193 || i == 180){
      //   object = new THREE.Mesh( sphereGeo,  new THREE.MeshBasicMaterial({ color: 0xff0030, opacity: 0.5, transparent: true} ) )
      // }
      // else{
      //   object = new THREE.Mesh( sphereGeo,  new THREE.MeshBasicMaterial({ color: 0x0030ff, opacity: 0.5, transparent: true} ) )
      // }


      // var position = new THREE.Vector3();

      // position.x = (data[i].x-xbar)/2    //Math.random() * 10 - 5;
      // position.y = (data[i].y-ybar)/2   //Math.random() * 6 - 3;
      // position.z = (data[i].z-zbar)/2    //Math.random() * 8 - 4;

      // object.position.set( position.x, position.y, position.z );
      
      // object.num = i;
      // scene.add(object);

      // try 2d image;
      if (data[i].order <=1028 && data[i].order>=1024) continue;

      str = "/static/imgs/"+ data[i].order +".png"
      // var map
      // var textureLoader = new THREE.TextureLoader();
      // textureLoader.load(str);

      //   // Add the event listener
      var material;
      var map = new THREE.TextureLoader().load( str , function(tex){
         // TweenMax.to(sprite.material, 1, { opacity: 1 });
         //var material = new THREE.SpriteMaterial( { map: tex, color: 0xffffff, fog: true } 
        TweenMax.to( objects[tex.id-2].material , 1, { opacity: 1 });
      });
      var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
      var sprite = new THREE.Sprite( material );

      var position = new THREE.Vector3();



      position.x = (data[i].x-xbar)/2    //Math.random() * 10 - 5;
      position.y = (data[i].y-ybar)/2   //Math.random() * 6 - 3;
      position.z = (data[i].z-zbar)/2    //Math.random() * 8 - 4;


      sprite.scale.set(0.2,0.2,0.2)
      sprite.position.set(position.x, position.y, position.z);

      sprite.num = i;
      sprite.material.opacity = 0;
      
      objects.push(sprite);
      scene.add( sprite );


    }
    // document.getElementById("container").addEventListener('click',function(){
    //     whetherclick = true;
        
    // })

    window.addEventListener('resize' , onWindowResize , false);
       function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
   }
    // },false);

    //conbineMesh = new THREE.Mesh(conbineGeo, material);

    cube = new THREE.Mesh( geometry, material );
    raycaster = new THREE.Raycaster();
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener('keydown',function(){
      var delta = 200;
      event = event || window.event;
      var keycode = event.keyCode;
      switch(keycode){
        case 38 : // up arrow 向上箭头
        zoomout = false;
        zoomin = true;
        break;
        case 40 : //down arrow向下箭头
        zoomin = false;
        zoomout = true;
        break;
      }
    },false);
     document.addEventListener('keyup',function(){
      var delta = 200;
      event = event || window.event;
      var keycode = event.keyCode;
      switch(keycode){
        case 38 : // up arrow 向上箭头
        zoomin = false;
        break;
        case 40 : //down arrow向下箭头
        zoomout = false;
        break;
      }
    },false);
   }

   
   function onDocumentMouseMove(){
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
   }

   $("#container").mousedown(function(){
      whetherclick = true;
  });
   $("#rotate").mousedown(function(){
      if (whetherclick == true){
        whetherclick = false;
      }
      else{
        whetherclick = true;
      }
      
   })

   function getdistance(camera){
      return Math.sqrt(camera.position.x*camera.position.x+camera.position.y*camera.position.y+camera.position.z*camera.position.z)
   }

   function render() {
    

    requestAnimationFrame( render );
    if (zoomin && getdistance(camera)>=0.1){
        var dis = getdistance(camera);
        camera.position.x -= dis*0.007 * camera.position.x / dis;
        camera.position.y -= dis*0.007 * camera.position.y / dis;
        camera.position.z -= dis*0.007 * camera.position.z / dis;

        camera.updateProjectionMatrix();
    }
    if (zoomout){
         var dis = getdistance(camera);
        camera.position.x += dis*0.007 * camera.position.x / dis;
        camera.position.y += dis*0.007 * camera.position.y / dis;
        camera.position.z += dis*0.007 * camera.position.z / dis;

        camera.updateProjectionMatrix();
    }
    if (!whetherclick){
      camera.position.x = Math.sqrt((camera.position.x * camera.position.x +camera.position.z*camera.position.z ) )* Math.cos( angle );
      camera.position.z =  Math.sqrt((camera.position.x * camera.position.x +camera.position.z*camera.position.z ) ) * Math.sin( angle );
      angle += 0.002;
    }

   //console.log(camera.position);
    controls.update();
    raycaster.setFromCamera( mouse, camera );
    //curTxt.innerHTML="";

    document.body.onmousemove=moveCursor;
    curTxt.id="cursorText";
    
    var curTxtLen=[curTxt.offsetWidth,curTxt.offsetHeight];
    function moveCursor(e){
        if(!e){e=window.event;}
        curTxt.style.left=e.clientX-curTxtLen[0]+'px';
        curTxt.style.top=e.clientY-curTxtLen[1]+'px';
    }


   var intersects = raycaster.intersectObjects( scene.children );

   if ( intersects.length > 0 ) {

    if ( INTERSECTED != intersects[ 0 ].object ) {

      if ( INTERSECTED ){
        curTxt.innerHTML=""
        INTERSECTED.material.color.set( precolor  );
      }
      INTERSECTED = intersects[ 0 ].object;
      precolor = INTERSECTED.material.color.getHex();
      INTERSECTED.material.color.set( 0xff0000 );
      if (intersects[ 0 ].object.hasOwnProperty("num")   ){
         curTxt.innerHTML=data[ intersects[ 0 ].object.num].name;
      }
    }

   } else {

    if ( INTERSECTED ){
      INTERSECTED.material.color.set( precolor );
      curTxt.innerHTML=""
    }
    
    INTERSECTED = null;

   }
   stats.update();
    renderer.render( scene, camera );
   }




   $("#submitb").click(function(){


     //console.log("get")
    // console.log($(":input").val)
      let i = 0;
      for (i = 1; i <= datanum; i++){
        if (data[i].order <=1028 && data[i].order>=1024) continue;
        console.log(data[i].name, i, data[i].order);
        if (data[i].name.indexOf($(':input').val()) != -1){
          var tmp = i-1
          if (data[i].order >= 1029) tmp = tmp-5;
          TweenMax.to(objects[tmp].material, 1, { opacity: 1 });
        }
        else{
          var tmp = i-1
          if (data[i].order >= 1029) tmp = tmp-5;
          if (objects[tmp].material.opacity != 1 && whetherchange || !whetherchange)
          TweenMax.to(objects[tmp].material, 1, { opacity: 0.1 });
        }
      }


      whetherchange = true;
      console.log($(':input').val())
      $(':input').val("");
   })
    $("#back").click(function(){

     console.log("get")
    // console.log($(":input").val)
      let i = 0;
      for (i = 0; i < objects.length; i++){
        TweenMax.to(objects[i].material, 1, { opacity: 1 });
      }
      whetherchange = false;
      $(':input').val("");
    })





   function trackOriginalOpacities(mesh) {
    
    var opacities = [], 
        materials = mesh.material.materials ? mesh.material.materials : [mesh.material];
    for (var i = 0; i < materials.length; i++) {        
         materials[i].transparent = true;
         opacities.push(materials[i].opacity);
    }
    mesh.userData.originalOpacities = opacities;
  }




    function fadeMesh(mesh, direction, options) {
        options = options || {};
        // set and check 
        var current = { percentage : direction == "in" ? 1 : 0 },
        // this check is used to work with normal and multi materials.
        mats = mesh.material.materials ? 
                 mesh.material.materials : [mesh.material],
     
         originals = mesh.userData.originalOpacities,
         easing = options.easing || TWEEN.Easing.Linear.None,
         duration = options.duration || 2000;
        // check to make sure originals exist
        if( !originals ) {
             console.error("Fade error: originalOpacities not defined, use trackOriginalOpacities");
              return;
        }
        // tween opacity back to originals
        var tweenOpacity = new TWEEN.Tween(current)
            .to({ percentage: direction == "in" ? 0 : 1 }, duration)
            .easing(easing)
            .onUpdate(function() {
                 for (var i = 0; i < mats.length; i++) {
                    mats[i].opacity = originals[i] * current.percentage;
                 }
             })
             .onComplete(function(){
                  if(options.callback){
                       options.callback();
                  }
             });
        tweenOpacity.start();
        return tweenOpacity;
    }

})
window.fadeIn = function(obj) {
    $(obj).fadeIn(1000);
}
