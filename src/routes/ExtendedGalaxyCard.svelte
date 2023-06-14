<script>
    export let galaxy = {};
</script>

<link href='https://fonts.googleapis.com/css?family=Orbitron' rel='stylesheet' type='text/css'>

<div class="spaceship">
    <div class="image-container">
        <img class="galaxy-image" src={galaxy.imagePath} alt="Random Galaxy">
        <div class="color-overlay" style="background: {galaxy.color};"></div>
    </div>
    <div class="galaxy-details">
        <h3>Details for Galaxy with ID: {galaxy.id}</h3>
        <table>
            <tr>
                <td>Name:</td>
                <td><strong>{galaxy.name}</strong></td>
            </tr>
            <tr>
                <td>Type:</td>
                <td>{galaxy.type}</td>
            </tr>
        </table>
        <div class="solar-systems">
            <h3>Solar Systems:</h3>
            <button class="scan-btn">Scan for System</button>
        </div>
        <p>No Solar Systems available</p>
    </div>
</div>

<style>
    .spaceship {
        padding: 10px;
        font-family: 'Orbitron', sans-serif;
        color: lawngreen;
        background-color: black;
        display: flex;
        justify-content: space-between;
        cursor: crosshair;
    }
    .image-container {
        position: relative;
        height: 400px;
        width: 350px;
    }
    .galaxy-details {
        width: 350px;
        border: 2px solid lawngreen;
        border-radius: 10px;
        padding: 10px;
        margin-left: 20px;
        background-color: rgba(0,0,0,0.7);
    }
    .galaxy-details table {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .galaxy-details td {
        padding: 5px;
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
    .solar-systems {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .scan-btn {
        background-color: rgba(0,0,0,0.7);
        border: 2px solid lawngreen;
        color: lawngreen;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 2px 2px;
        cursor: crosshair;
        border-radius: 5px;
        transition: all 0.3s ease;
    }
    .scan-btn:hover {
        background-color: lawngreen;
        color: black;
    }
</style>
