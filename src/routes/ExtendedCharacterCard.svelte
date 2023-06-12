<script>
    export let character = {};
</script>

<div>
    <h3>Details for ID: {character.id}</h3>
    <p>Name: <strong>{character.name}</strong></p>
    <p>Gender: {character.gender}</p>
    <p>Culture: {character.culture.name}</p>
</div>