<template>
    <div class="input-container">
        <input
            v-model="inputValue"
            @input="validateRFC"
            placeholder="Ingresa RFC"
        />
        <p class="invalid" v-if="!isValid">RFC no válido</p>
        <p class="valid" v-else-if="inputValue.length > 0">RFC válido</p>
    </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';

const props = defineProps({
    RFC: String
});

const inputValue = ref(props.RFC || '');
const isValid = ref(true);

function validateRFC() {
    const rfcPatternFisica = /^[A-ZÑ&]{4}\d{6}[A-Z\d]{3}$/i; // Solo homoclave completa
    const rfcPatternMoral = /^[A-ZÑ&]{3}\d{6}[A-Z\d]{3}$/i;
    const rfc = inputValue.value.trim().toUpperCase();

    if (rfcPatternFisica.test(rfc) || rfcPatternMoral.test(rfc)) {
        isValid.value = true;
    } else {
        isValid.value = false;
    }
}

watch(() => props.RFC, (newValue) => {
    inputValue.value = newValue;
    validateRFC();
});

watch(inputValue, validateRFC);
</script>

<style scoped>
.input-container {
    background-color: #F3E5F5; /* Pastel Purple */
    border: 2px solid #E1BEE7; /* Lighter Pastel Purple */
    border-radius: 12px;
    padding: 16px;
    max-width: 400px;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

input {
    border: 2px solid #F8BBD0; /* Pastel Pink */
    padding: 8px;
    font-size: 16px;
    width: calc(100% - 20px);
    margin-bottom: 12px;
    border-radius: 8px;
    outline: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.invalid {
    color: #E57373; /* Pastel Red */
    margin-top: 0;
}

.valid {
    color: #BA68C8; /* Pastel Purple */
    margin-top: 0;
}
</style>