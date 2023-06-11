<script>
    import { campaignData } from "$lib/stores";
    import {loadCampaign, saveCampaign} from "$lib/persistence/IndexedDB.ts";
    import {onMount} from "svelte";
    import {IDGenerator} from "$lib/entities/IDGenerator.ts";
    import {Campaign} from "$lib/entities/Campaign.ts";

    let campaignDataText = '';
    let campaign = new Campaign();

    $: {
        campaignDataText = $campaignData;
    }

    onMount(async () => {
        console.log("mounted");
        await onLoad();
    });

    async function onLoad() {
        console.log("try to load campaign");
        const serializedCampaign = await loadCampaign();
        if (serializedCampaign) {
            campaign = JSON.parse(serializedCampaign);
            IDGenerator.getInstance().setId(campaign.lastId);
            campaignData.set(serializedCampaign);
            console.log("loaded campaign");
        } else {
            console.log("no campaign found");
        }
    }

    async function onSave() {
        const campaignObject = JSON.parse(campaignDataText);
        const serializedCampaign = JSON.stringify(campaignObject);
        await saveCampaign(serializedCampaign);
        campaignData.set(serializedCampaign);
    }

    function copyToClipboard() {
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = campaignDataText;
        document.body.appendChild(tempTextarea);
        tempTextarea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextarea);
    }
</script>


<div class="campaign-data">
    <textarea class="campaign-textarea" bind:value={campaignDataText}></textarea>
    <button class="save-button" on:click={onSave}>Save</button>
    <button class="copy-button" on:click={copyToClipboard}>Copy</button>
</div>


<style>
    .campaign-textarea {
        width: 100%;
        height: 200px;
        padding: 10px;
        box-sizing: border-box;
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        color: #333;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }
</style>