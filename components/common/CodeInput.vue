<template>
    <label ref="codeInputContainer" class="field code">
        <SingleNumberInput name="singleInput1" />
        <SingleNumberInput name="singleInput2" />
        <SingleNumberInput name="singleInput3" />
        <SingleNumberInput name="singleInput4" />
    </label>
</template>

<script>
import SingleNumberInput from "@/components/common/SingleNumberInput";

export default {
    name: "CodeInput",
    components: {
        SingleNumberInput
    },
    data() {
        return {
            allowedChars: [
                8, 37, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100,
                101, 102, 103, 104, 105
            ] // 0-9
        };
    },
    methods: {
        handlePaste(event) {
            let targetValue = event.target.value;
            if (!targetValue || !Number.isInteger(parseInt(targetValue))) {
                event.target.value = "";
                return;
            }
            if (targetValue.length === 1) return;
            this.pasteValueIn(event.target, targetValue);
        },
        pasteValueIn(target, value) {
            target.value = value[0];
            value = value.substring(1);
            if (target.nextElementSibling && value.length) {
                this.pasteValueIn(target.nextElementSibling, value);
            }
        },
        initListeners() {
            const children = [...this.$refs.codeInputContainer.children],
                firstChild = children[0];
            firstChild.addEventListener("input", this.handlePaste);

            children.forEach((child) => {
                child.addEventListener("keyup", (e) => {
                    let element = e.target;

                    if (!this.allowedChars.includes(e.keyCode)) {
                        return;
                    }

                    if (
                        // backspace and left arrow
                        (e.keyCode === 8 || e.keyCode === 37) &&
                        element.previousElementSibling
                    ) {
                        element.previousElementSibling.select();
                    } else if (
                        // backspace and left arrow
                        e.keyCode !== 8 &&
                        element.nextElementSibling
                    ) {
                        element.nextElementSibling.select();
                    }

                    if (element.value.length > 1) {
                        this.handlePaste(e);
                    }
                });
                child.addEventListener("focus", (e) => {
                    const target = e.target;

                    if (target === firstChild) return;
                    if (firstChild.value === "") firstChild.focus();
                    if (
                        target.previousElementSibling &&
                        target.previousElementSibling.value === ""
                    ) {
                        target.previousElementSibling.focus();
                    }
                });
            });
        }
    },
    mounted() {
        this.initListeners();
    }
};
</script>

<style lang="scss">
.code {
    flex-direction: row;
    justify-content: space-around;
}
</style>
