<template>
   <div id="control-panel">
        <div id="format-actions">
            <button className="format-action" type="button"><b>B</b></button>
            <button className="format-action" type="button"><i>I</i></button>
            <button className="format-action" type="button"><u>U</u></button>
        </div>
    </div>
</template>

<script>
export default {
  name: "ControlPanel"
};
</script>
<style scoped>
    #control-panel {
        background-color: #fff;
        height: 25px;
        display: flex;
        align-items: center;
        flex-direction: column;
        padding-top: 5px;
    }
    #format-actions {
        width: 200px;
        margin-right: 400px;
    }
</style>
