<script>
    export let galaxy = {};
</script>

<div>
    <h3>Details for ID: {galaxy.id}</h3>
    <p>Name: <strong>{galaxy.name}</strong></p>
    <p>Type: {galaxy.type}</p>
    <div class="image-container">
        <img class="galaxy-image" src={galaxy.imagePath} alt="Random Galaxy">
        <div class="color-overlay" style="background: {galaxy.color};"></div>
    </div>
</div>

 <style>
     .image-container {
         position: relative;
         height: 400px;
         width: 350px;
     }
     .galaxy-image, .color-overlay {
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
     }

     .color-overlay {
         mix-blend-mode: multiply;
     }
 </style>