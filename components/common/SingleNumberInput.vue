<template>
    <input
        :ref="name"
        type="number"
        :name="name"
        :required="required"
        class="field__number"
    />
</template>

<script>
export default {
    name: "SingleNumberInput",
    props: {
        name: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            required: false,
            default: true
        }
    }
};
</script>

<style scoped lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>
